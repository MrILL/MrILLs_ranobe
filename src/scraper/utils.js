import fetch from 'node-fetch';

class Page {
  constructor(title, HTMLbody) {
    this.title = title;
    this.body = HTMLbody;
  }
};

const getFromStaticSrc = async (src, resp) => {
  let result;
  await fetch(src).then(res => res.text()).then((html) => {
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
  Page,
  getFromStaticSrc,
  cheerioCleanClass,
  cheerioCleanEachClass,
};