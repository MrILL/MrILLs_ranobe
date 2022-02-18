import fetch from 'node-fetch'

export async function getFromStaticSrc(src: string, resp) {
  let result
  await fetch(src)
    .then((res) => res.text())
    .then((html) => {
      result = resp(html)
    })
  return result
}

export async function cheerioCleanClass(data) {
  if (!data) {
    throw 'no data provided'
  }
  data.attribs = Object.create(null)
}

export async function cheerioCleanEachClass(data) {
  data.each((i, el) => {
    cheerioCleanClass(el)
  })
}
