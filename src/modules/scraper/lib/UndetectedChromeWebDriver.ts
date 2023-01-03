import { Builder, Capabilities, WebDriver } from 'selenium-webdriver'
import { Options, ServiceBuilder } from 'selenium-webdriver/chrome'
import * as logging from 'selenium-webdriver/lib/logging'

type CdpConnection = {
  execute(method?, params?, callback?): any
}

function wrapGetForHeadless(webDriver: WebDriver) {
  const originalGet = webDriver.get
  async function newGet(url: string) {
    const pageCdpConnection: CdpConnection = await (
      this as WebDriver
    ).createCDPConnection('page')

    if ((this as WebDriver).executeScript('return navigator.webdriver')) {
      console.info('patch navigator.webdriver') //TODO move to nestjs logger
      pageCdpConnection.execute('Page.addScriptToEvaluateOnNewDocument', {
        source: `
            Object.defineProperty(window, 'navigator', {
              value: new Proxy(navigator, {
                has: (target, key) => (key === 'webdriver' ? false : key in target),
                get: (target, key) =>
                  key === 'webdriver' ?
                  false :
                  typeof target[key] === 'function' ?
                  target[key].bind(target) :
                  target[key]
                })
            });
            
            Object.defineProperty(navigator, 'plugins', {
              get: function() { return {"0":{"0":{}},"1":{"0":{}},"2":{"0":{},"1":{}}}; }
            });
            Object.defineProperty(navigator, 'languages', {
              get: () => ["en-US", "en"]
            });
            Object.defineProperty(navigator, 'mimeTypes', {
              get: function() { return {"0":{},"1":{},"2":{},"3":{}}; }
            });
          `,
      })

      console.info('patch user-agent string') //TODO move to nestjs logger
      const userAgent: string = await (this as WebDriver).executeScript(
        'return navigator.userAgent'
      )
      pageCdpConnection.execute('Network.setUserAgentOverride', {
        // userAgent: userAgent.replace('Headless', ''),
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      })
      pageCdpConnection.execute('Page.addScriptToEvaluateOnNewDocument', {
        source: `
            Object.defineProperty(navigator, 'maxTouchPoints', {get: () => 1});
            Object.defineProperty(navigator.connection, 'rtt', {get: () => 100});

            // https://github.com/microlinkhq/browserless/blob/master/packages/goto/src/evasions/chrome-runtime.js
            window.chrome = {
                app: {
                    isInstalled: false,
                    InstallState: {
                        DISABLED: 'disabled',
                        INSTALLED: 'installed',
                        NOT_INSTALLED: 'not_installed'
                    },
                    RunningState: {
                        CANNOT_RUN: 'cannot_run',
                        READY_TO_RUN: 'ready_to_run',
                        RUNNING: 'running'
                    }
                },
                runtime: {
                    OnInstalledReason: {
                        CHROME_UPDATE: 'chrome_update',
                        INSTALL: 'install',
                        SHARED_MODULE_UPDATE: 'shared_module_update',
                        UPDATE: 'update'
                    },
                    OnRestartRequiredReason: {
                        APP_UPDATE: 'app_update',
                        OS_UPDATE: 'os_update',
                        PERIODIC: 'periodic'
                    },
                    PlatformArch: {
                        ARM: 'arm',
                        ARM64: 'arm64',
                        MIPS: 'mips',
                        MIPS64: 'mips64',
                        X86_32: 'x86-32',
                        X86_64: 'x86-64'
                    },
                    PlatformNaclArch: {
                        ARM: 'arm',
                        MIPS: 'mips',
                        MIPS64: 'mips64',
                        X86_32: 'x86-32',
                        X86_64: 'x86-64'
                    },
                    PlatformOs: {
                        ANDROID: 'android',
                        CROS: 'cros',
                        LINUX: 'linux',
                        MAC: 'mac',
                        OPENBSD: 'openbsd',
                        WIN: 'win'
                    },
                    RequestUpdateCheckStatus: {
                        NO_UPDATE: 'no_update',
                        THROTTLED: 'throttled',
                        UPDATE_AVAILABLE: 'update_available'
                    }
                }
            }

            // https://github.com/microlinkhq/browserless/blob/master/packages/goto/src/evasions/navigator-permissions.js
            if (!window.Notification) {
                window.Notification = {
                    permission: 'denied'
                }
            }

            const originalQuery = window.navigator.permissions.query
            window.navigator.permissions.__proto__.query = parameters =>
                parameters.name === 'notifications'
                    ? Promise.resolve({ state: window.Notification.permission })
                    : originalQuery(parameters)

            const oldCall = Function.prototype.call
            function call() {
                return oldCall.apply(this, arguments)
            }
            Function.prototype.call = call

            const nativeToStringFunctionString = Error.toString().replace(/Error/g, 'toString')
            const oldToString = Function.prototype.toString

            function functionToString() {
                if (this === window.navigator.permissions.query) {
                    return 'function query() { [native code] }'
                }
                if (this === functionToString) {
                    return nativeToStringFunctionString
                }
                return oldCall.call(oldToString, this)
            }
            // eslint-disable-next-line
            Function.prototype.toString = functionToString
            `,
      })
    }

    return await originalGet.bind(this)(url)
  }

  webDriver.get = newGet
}

function wrapGet(webDriver: WebDriver) {
  const originalGet = webDriver.get
  async function newGet(url: string) {
    const cdcProps = await (this as WebDriver).executeScript(
      `
        let objectToInspect = window,
            result = [];
        while(objectToInspect !== null)
        { result = result.concat(Object.getOwnPropertyNames(objectToInspect));
          objectToInspect = Object.getPrototypeOf(objectToInspect); }
        return result.filter(i => i.match(/.+_.+_(Array|Promise|Symbol)/ig))      
      `
    )

    if (cdcProps) {
      const pageCdpConnection: CdpConnection = await (
        this as WebDriver
      ).createCDPConnection('page')

      pageCdpConnection.execute('Page.addScriptToEvaluateOnNewDocument', {
        source: `
          let objectToInspect = window,
              result = [];
          while(objectToInspect !== null)
          { result = result.concat(Object.getOwnPropertyNames(objectToInspect));
            objectToInspect = Object.getPrototypeOf(objectToInspect); }
          result.forEach(p => p.match(/.+_.+_(Array|Promise|Symbol)/ig)
                              &&delete window[p]&&console.log('removed',p))          
        `,
      })
    }

    return originalGet.bind(this)(url)
  }

  webDriver.get = newGet
}

export class UndetectedChromeWebDriver {
  static async getWebDriver({
    webDriverPath,
    isHeadless = true,
  }: {
    webDriverPath: string
    isHeadless?: boolean
  }): Promise<WebDriver> {
    const language = 'en-US,en;q=0.9'
    const options = [
      `--lang=${language}`,
      '--no-default-browser-check',
      '--no-sandbox',
      '--test-type',
      // '--remote-debugging-port=8000',
      '--disable-blink-features=AutomationControlled',
    ]
    if (isHeadless) {
      options.push(
        '--window-size=1920,1080',
        '--start-maximized',
        '--no-sandbox'
      )
    }

    // options.headless = False
    // options.add_experimental_option('useAutomationExtension', False)
    // options.add_argument(
    //   'user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    // )

    /// Chrome options

    const chromeOptions = new Options()
      .addArguments(...options)
      .excludeSwitches('enable-automation')

    if (isHeadless) {
      chromeOptions.headless()
    }

    /// logging

    const loggingPrefs = new logging.Preferences()
    loggingPrefs.setLevel(logging.Type.BROWSER, logging.Level.ALL)
    loggingPrefs.setLevel(logging.Type.CLIENT, logging.Level.ALL)
    loggingPrefs.setLevel(logging.Type.DRIVER, logging.Level.ALL)
    loggingPrefs.setLevel(logging.Type.PERFORMANCE, logging.Level.ALL)
    loggingPrefs.setLevel(logging.Type.SERVER, logging.Level.ALL)

    const caps = Capabilities.chrome()
    caps.setLoggingPrefs(loggingPrefs)
    caps.set('goog:chromeOptions', {
      useAutomationExtension: false,
    })

    const webDriver = await new Builder()
      .disableEnvironmentOverrides()
      .forBrowser('chrome')
      .setChromeService(new ServiceBuilder(webDriverPath))
      .withCapabilities(caps)
      .setLoggingPrefs(loggingPrefs)
      .setChromeOptions(chromeOptions)
      .build()

    webDriver.createCDPConnection
    ///

    if (isHeadless) {
      wrapGetForHeadless(webDriver)
    }

    /// Configure get

    wrapGet(webDriver)

    ///

    return webDriver
  }
}
