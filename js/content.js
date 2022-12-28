// ++++ 9gag feed +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// configuration of the observer
const config = {
  attributes: true,
  childList: true,
  characterData: true,
};
const logPrefix = '9GAG_Controls';

const infoLog = (message, data) => console.log(`${logPrefix}: ${message}`, data ?? '');
const errorLog = (message, error) => console.error(`${logPrefix} - error: ${message}`, error ?? '');

const getArray = (dataToParse) => {
  const data = dataToParse || {};
  return Object.keys(data).map((key) => data[key]);
};

// pass in the target node, as well as the observer options
setTimeout(() => {
  try {
    // select the target node
    const className = '#main section';
    const target = document.querySelector(className);

    // create an observer instance
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        let articles = target.getElementsByTagName('article');
        getArray(articles).forEach((article) => {
          let videos = article.getElementsByTagName('video');
          getArray(videos).forEach((video) => {
            video.setAttribute('controls', '');
            video.setAttribute('class', '');
            video.classList.add('alwaysOn');
          });
        });
      });
    });

    if (!!target) {
      observer.observe(target, config);

      // single post
      const posts = target.getElementsByClassName('post-view video-post');
      getArray(posts).forEach((post) => {
        const videos = post.getElementsByTagName('video');
        getArray(videos).forEach((video) => {
          video?.setAttribute('controls', '');
        });
      });

      infoLog('Loaded');
    } else {
      infoLog(`Target DIV not found (${className})`);
    }
  } catch (error) {
    errorLog('', error);
  }
}, 2000);
