export default function decorate() {
  const ctawrapper = document.querySelector('.cta-wrapper');
  ctawrapper.classList.add(...'mx-auto px-8'.split(' '));
  const wrapper = document.querySelector('.cta');
  wrapper.classList.add('text-center');
  if (wrapper) {
    const innerDiv = wrapper.querySelector('div');
    if (innerDiv) {
      innerDiv.classList.add(...'first-box py-20'.split(' '));
    }
    const innerofdiv = innerDiv.querySelector('div');
    if (innerofdiv) {
      innerofdiv.classList.add('second-box');
    }
    const specificPTag = wrapper.querySelector('.second-box > p');
    if (specificPTag) {
      specificPTag.classList.add(...'ptag lg:text-2xl font-light lg:mb-16 mb-10 lg:mx-0 mx-6 text-xl text-slate-600'.split(' '));
    }
  }
  const heading = document.getElementById('immune-cell-markers-poster');
  heading.classList.add(...'lg:text-5xl text-2xl mb-5 lg:mx-0 mx-6'.split(' '));
  const btn = document.querySelector('.button-container');
  btn.classList.add(...'font-blod text-xl font-bold border-black border-2 lg:w-2/12 lg:m-auto mx-6 w-auto rounded-3xl p-2 transform hover:scale-103'.split(' '));
}
