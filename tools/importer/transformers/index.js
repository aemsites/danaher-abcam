import titlecard from './titlecard.js';
import list from './list.js';
import metadata from './metadata.js';
import teasers from './teasers.js';
import learnmore from './learnMore.js';
import postProcessSVGIcons from './postProcessSVGIcons.js';

// eslint-disable-next-line import/prefer-default-export
export const transformers = [
  titlecard,
  list,
  teasers,
  learnmore,
];

export const asyncTransformers = [

];

export const xfTransformers = [

];

export const xfAsyncTransformers = [

];

export const preTransformers = [

];

export const postTransformers = [
  postProcessSVGIcons,
  metadata,
];
