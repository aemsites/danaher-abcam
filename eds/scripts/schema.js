import { getMetadata } from './aem.js';
// eslint-disable-next-line import/no-cycle
import { setJsonLd } from './scripts.js';

// eslint-disable-next-line import/prefer-default-export
export function buildArticleSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://www.abcam.com${window.location.pathname}`,
    headline: document.querySelector('h1') ? document.querySelector('h1').textContent : getMetadata('og:title'),
    image: getMetadata('og:image'),
    datePublished: getMetadata('publishdate') ? new Date(getMetadata('publishdate')) : new Date(getMetadata('published-time')),
    publisher: {
      '@type': 'Organization',
      name: 'Abcam',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.abcam.com/eds/icons/logo.svg',
      },
    },
    description: getMetadata('description'),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.abcam.com${window.location.pathname}`,
    },
  };

  if (getMetadata('creationdate')) data.datePublished = getMetadata('creationdate');
  if (getMetadata('updatedate')) data.dateModified = getMetadata('updatedate');
  if (getMetadata('authorname')) {
    data.author = {
      '@type': 'Person',
      name: getMetadata('authorname'),
      url: `https://abcam.com/en-us/profile/${getMetadata('authorname')}`,
    };
  }

  setJsonLd(data, 'article');
}

// eslint-disable-next-line import/prefer-default-export
export function buildVideoSchema(publishDate, posterImage, embedURL) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: getMetadata('media_hrefText') ? getMetadata('media_hrefText') : getMetadata('og:title'),
    thumbnailUrl: posterImage,
    embedUrl: embedURL,
    publisher: {
      '@type': 'Organization',
      name: 'Abcam',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.abcam.com/eds/icons/logo.svg',
      },
    },
    hasPart: [
      {
        '@type': 'Clip',
        startOffset: 30,
        name: 'Introduction',
      },
      {
        '@type': 'Clip',
        startOffset: 120,
        name: 'Main Topic',
      },
    ],
  };
  if (publishDate) data.uploadDate = publishDate;

  setJsonLd(data, 'video');
}

// eslint-disable-next-line import/prefer-default-export
export function buildPodcastEpisodeSchema(mediaURL, episodeNum, seriesName, seriesURL, mode) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    url: `https://www.abcam.com${window.location.pathname}`,
    name: getMetadata('og:title'),
    datePublished: getMetadata('publishdate'),
    timeRequired: getMetadata('readingtime'),
    description: getMetadata('description'),
    associatedMedia: {
      '@type': 'MediaObject',
      contentUrl: mediaURL,
    },
    episodeNumber: episodeNum,
    image: getMetadata('og:image'),
    accessMode: mode,
    inLanguage: 'en',
  };

  if (getMetadata('creationdate')) data.datePublished = getMetadata('creationdate');
  if (getMetadata('updatedate')) data.dateModified = getMetadata('updatedate');
  if (seriesName && seriesURL) {
    data.partOfSeries = {
      '@type': 'PodcastSeries',
      name: seriesName,
      url: seriesURL,
    };
  }
  if (getMetadata('authorname')) {
    data.creator = {
      '@type': 'Person',
      name: getMetadata('authorname'),
    };
  }

  setJsonLd(data, 'podcastepisode');
}

// eslint-disable-next-line import/prefer-default-export
export function buildPodcastSeriesSchema(mode) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: getMetadata('og:title'),
    description: getMetadata('description'),
    url: `https://www.abcam.com${window.location.pathname}`,
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: 'Abcam',
      url: 'https://www.abcam.com/en-us',
    },
    image: getMetadata('og:image'),
    accessMode: mode,
    genre: 'Science, Research, Life Sciences',
  };

  if (getMetadata('authorname')) {
    data.author = {
      '@type': 'Person',
      name: getMetadata('authorname'),
    };
  }

  setJsonLd(data, 'podcastepisode');
}

function generateItemListElement(type, position, url, name) {
  return {
    '@type': type,
    position,
    item: {
      '@id': url,
      name,
    },
  };
}

export function buildStoryHubSchema(srcObj) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `https://www.abcam.com${window.location.pathname}`,
    itemListElement: [],
  };

  srcObj.forEach((obj, index) => {
    data.itemListElement.push(generateItemListElement(
      'ListItem',
      index + 1,
      obj.path,
      obj.title,
    ));
  });

  setJsonLd(data, 'storyhub');
}

function generateCollectionElement(type, url, name) {
  return {
    '@type': type,
    url,
    name,
  };
}

function generateCrossSellCollectionElement(type, url, name, image, description) {
  return {
    '@type': type,
    url,
    name,
    image,
    description,
  };
}

function addPerformerstoWebinar(type, name, jobTitle, image, description) {
  return {
    '@type': type,
    name,
    jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: 'Abcam',
    },
    image,
    description,
  };
}

function addVideotoWebinar(type, name, description, contentUrl, thumbnailUrl, uploadDate) {
  return {
    '@type': type,
    name,
    description,
    contentUrl,
    thumbnailUrl,
    uploadDate,
  };
}

export function buildCollectionSchema(srcObj) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: document.querySelector('h1') ? document.querySelector('h1').textContent : getMetadata('og:title'),
    description: getMetadata('description'),
    url: `https://www.abcam.com${window.location.pathname}`,
    hasPart: [],
  };

  srcObj.forEach((obj) => {
    data.hasPart.push(generateCollectionElement(
      'WebPage',
      obj.path,
      obj.title.replace(/\s*\|\s*abcam$/i, ''),
    ));
  });

  setJsonLd(data, 'Collection');
}

export function buildCrossSellCollectionSchema() {
  const featuredProducts = document.querySelectorAll('.recommended-products.featured-products');
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: document.querySelector('h1') ? document.querySelector('h1').textContent : getMetadata('og:title'),
    description: getMetadata('description'),
    url: `https://www.abcam.com${window.location.pathname}`,
    mainEntity: [],
  };
  if (featuredProducts.length > 0) {
    featuredProducts.forEach((obj) => {
      [...obj.children].forEach((objItem) => {
        let desc = objItem.querySelector('div:nth-child(3) > ul > li') ? objItem.querySelector('div:nth-child(3) > ul')?.innerText.trim() : '';
        if (desc !== '') desc = desc.replaceAll('\n', '.');
        data.mainEntity.push(generateCrossSellCollectionElement(
          'Product',
          objItem.querySelector('a')?.href,
          objItem.querySelector('div:nth-child(3) > p') ? objItem.querySelector('div:nth-child(3) > p').textContent.replace(/\s*\|\s*abcam$/i, '') : '',
          objItem.querySelector('div:nth-last-child(2)').querySelector('picture img') ? objItem.querySelector('div:nth-last-child(2)').querySelector('picture img').src : '',
          desc,
        ));
      });
    });
  }
  setJsonLd(data, 'Collection');
}

export function buildOndemandWebinarSchema({ srcObj, custom = {} }) {
  if (typeof custom === 'object' && Object.keys(custom).length > 0) {
    const schemaObj = JSON.parse(document.querySelector('[data-name="Collection"]')?.textContent);
    custom.videoArr.forEach((obj) => {
      schemaObj.recordedIn.push(addVideotoWebinar(
        'VideoObject',
        obj.title,
        '',
        obj.href,
        '',
        getMetadata('publishdate') ? new Date(getMetadata('publishdate')) : new Date(getMetadata('published-time')),
      ));
    });
    setJsonLd(schemaObj, 'Collection');
  } else {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      name: document.querySelector('h1') ? document.querySelector('h1').textContent : getMetadata('og:title'),
      description: getMetadata('description'),
      image: getMetadata('og:image'),
      location: {
        '@type': 'VirtualLocation',
        url: `https://www.abcam.com${window.location.pathname}`,
      },
      performer: [],
      organizer: {
        '@type': 'Organization',
        name: 'Abcam',
        url: 'https://www.abcam.com/en-us',
      },
      recordedIn: [],
    };
    srcObj.forEach(() => {
      data.performer.push(addPerformerstoWebinar(
        'Person',
        '',
        '',
        '',
        '',
      ));
    });
    setJsonLd(data, 'Collection');
  }
}
