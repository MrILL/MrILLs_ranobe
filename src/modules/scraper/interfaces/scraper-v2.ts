import { WebDriver } from 'selenium-webdriver'

export type ScraperOptions = { driver: WebDriver }

export interface ScraperV2 {
  setOptions(options: ScraperOptions): this

  getHostname()

  ///

  isInfo(url: string): boolean
  scrapeInfo(url: string): Promise<any>

  isChapterList(url: string): boolean
  scrapeChapterList(url: string): Promise<any>

  isChapter(url: string): boolean
  scrapeChapter(url: string): Promise<any>
}
