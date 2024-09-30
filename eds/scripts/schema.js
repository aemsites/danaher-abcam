import { getMetadata } from './aem.js';
import { makePublicUrl, setJsonLd } from '../scripts/scripts.js';

// eslint-disable-next-line import/prefer-default-export
export function buildArticleSchema() {
  const data = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    '@id': `https://www.abcam.com${makePublicUrl(window.location.pathname)}`,
    headline: getMetadata('og:title'),
    image: getMetadata('og:image'),
    datePublished: getMetadata('publishdate'),
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
      '@id': `https://www.abcam.com${makePublicUrl(window.location.pathname)}`,
    },
  };

  if (getMetadata('creationdate')) data.datePublished = getMetadata('creationdate');
  if (getMetadata('updatedate')) data.dateModified = getMetadata('updatedate');
  if (getMetadata('authorname')) {
    data.author = {
      '@type': 'Person',
      name: getMetadata('authorname'),
    };
  }

  setJsonLd(data, 'article');
}

// eslint-disable-next-line import/prefer-default-export
export function buildVideoSchema(embedURL) {
  const data = {
    '@context': 'http://schema.org',
    '@type': 'VideoObject',
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

  setJsonLd(data, 'video');
}

// eslint-disable-next-line import/prefer-default-export
export function buildPodcastEpisodeSchema(mediaURL, episodeNum, seriesName, seriesURL, mode) {
  const data = {
    '@context': 'http://schema.org',
    '@type': 'PodcastEpisode',
    url: `https://www.abcam.com${makePublicUrl(window.location.pathname)}`,
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
