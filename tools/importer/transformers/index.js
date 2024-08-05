import titlecard from './titlecard.js';
import productlist from './productlist.js';
import metadata from './metadata.js';
import postProcessSVGIcons from './postProcessSVGIcons.js';

// eslint-disable-next-line import/prefer-default-export
export const transformers = [
  titlecard,
  productlist,
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