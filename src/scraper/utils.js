import fetch from 'node-fetch';

class Ranobe {
  constructor(title, firstChapterSrc) {
    this.title = title;
    this.firstChapterSrc = firstChapterSrc;
  }
}

class Chapter {
  constructor(title, htmlBody, nomer) {
    this.title = title;
    this.body = htmlBody;
    this.nomer = nomer;
  }

  isCorrect() {
    return this.title && this.body && this.nomer;
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
  if (!data) {
    console.error('no data provided');
    return;
  }
  data.attribs = Object.create(null);
};

const cheerioCleanEachClass = (data) => {
  data.each((i, el) => {
    cheerioCleanClass(el);
  });
};

export {
  Ranobe as RanobeInfo,
  Chapter,
  getFromStaticSrc,
  cheerioCleanClass,
  cheerioCleanEachClass,
};
