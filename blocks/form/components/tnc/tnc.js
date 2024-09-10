const textIntersectionClass = 'tnc__text-intersect';
const textDecorationClass = 'tnc__text-decoration';

class TermsAndConditions {
  constructor(fieldDiv, fieldJson) {
    this.fieldDiv = fieldDiv;
    this.fieldJson = fieldJson;
    this.formModel = null;
    this.decorate();
  }

  setFormModel(model) {
    this.formModel = model;
  }

  getfieldDiv() {
    return this.fieldDiv;
  }

  decorate() {
    const textWrapper = this.fieldDiv.querySelector('.plain-text-wrapper');
    textWrapper.classList.add(textDecorationClass);
    const intersection = document.createElement('div');
    intersection.classList.add(textIntersectionClass);
    textWrapper.appendChild(intersection);
    this.handleScroll();
  }

  handleScroll() {
    const intersection = this.fieldDiv.querySelector(`.${textIntersectionClass}`);
    if (intersection) {
      const io = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          /*
          * TODO: Enable the checkboxes that are disabled by default via the model.
          *  Currently they are enabled by default
          * */
          io.unobserve(intersection);
        }
      }, {
        threshold: [1],
      });
      io.observe(intersection);
    }
  }
}
export default async function decorate(tncDiv, fieldJson) {
  const tnc = new TermsAndConditions(tncDiv, fieldJson);
  return tnc.getfieldDiv();
}
