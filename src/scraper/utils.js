import fetch from 'node-fetch';

class RanobeInfo {
  constructor(title, firstChapterSrc) {
    this.title = title;
    this.firstChapterSrc = firstChapterSrc;
  }
}

class Chapter {
  constructor(title, htmlBody) {
    this.title = title;
    this.body = htmlBody;
  }
}

const getFromStaticSrc = async (src, resp) => {
  let result;
  await fetch(src)
    .then((res) => res.text())
    .then((html) => {
      result = resp(html);
    });
  return result;
};

const cheerioCleanClass = (data) => {
  data.attribs = Object.create(null);
};

const cheerioCleanEachClass = (data) => {
  data.each((i, el) => {
    cheerioCleanClass(el);
  });
};

export {
  RanobeInfo,
  Chapter,
  getFromStaticSrc,
  cheerioCleanClass,
  cheerioCleanEachClass,
};
