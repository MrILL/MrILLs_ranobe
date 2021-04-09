import fetch from 'node-fetch';

const getFromStaticSrc = (src, resp) => {
  fetch(src).then(res => res.text()).then((html) => {
    resp(html);
  });
};

export default getFromStaticSrc;