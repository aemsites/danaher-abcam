// This function is used to create image element from div element with background image
const createImage = (main, document) => {
  const imageTextEL = main.querySelectorAll('div.full-image-div1');
  const imageDiv = document.createElement('div');
  if (imageTextEL.length > 0) {
    [...imageTextEL].forEach((imgText) => {
      const imgEL = imgText?.querySelector('div.full-image-div1') ? imgText?.querySelector('div.full-image-div1') : imgText;
      const image = document.createElement('img');
      image.setAttribute('src', imgEL?.style.backgroundImage.replace('url("', '').replace('")', ''));
      image.setAttribute('alt', imgEL?.getAttribute('imageAlt') ? imgEL?.getAttribute('imageAlt') : 'alt');
      imageDiv.append(image);
      imgText.parentElement.append(imageDiv);
      imgText.remove();
    });
  }
};
export default createImage;
