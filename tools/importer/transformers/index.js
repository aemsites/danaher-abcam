import header from './header.js';
import footer from './footer.js';
import home from './home.js';
import metadata from './metadata.js';
import postProcessSVGIcons from './postProcessSVGIcons.js';

// eslint-disable-next-line import/prefer-default-export
export const transformers = [
  home,
];

export const asyncTransformers = [

];

export const xfTransformers = [
  footer,
];

export const xfAsyncTransformers = [
  header,
];

export const preTransformers = [

];

export const postTransformers = [
  postProcessSVGIcons,
  metadata,
];