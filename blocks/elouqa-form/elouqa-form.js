import {
  form, input, label, div,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  // console.log(block);
  const formEl = form();
  [...block.children].forEach((child, childIndex) => {
    if (childIndex === 0) {
      formEl.method = child?.children[0]?.children[0]?.innerText;
      formEl.id = child?.children[0]?.children[1]?.innerText;
      formEl.name = child?.children[0]?.children[2]?.innerText;
      formEl.action = child?.children[0]?.children[3]?.innerText;
      child.innerHTML = '';
    } else if (child.children.length > 0) {
      const formInputElLabel = child.children[0].children[0]?.innerText;
      const formInputElType = child.children[0].children[1]?.innerText;
      const formInputElName = child.children[0].children[2]?.innerText;
      const formInputEl = div(
        { class: 'form-group flex flex-col gap-1' },
        label(
          {
            class: 'font-sans tracking-wide font-semibold',
            for: formInputElName ? formInputElName : formInputElLabel,
          },
          formInputElLabel ? formInputElLabel : formInputElName,
        ),
        input({
          class: 'p-1 border rounded',
          id: formInputElName ? formInputElName : formInputElLabel,
          name: formInputElName ? formInputElName : formInputElLabel,
          type: formInputElType,
        }),
      );
      if (formInputElLabel && formInputElType && formInputElName) {
        child.innerHTML = '';
        formEl.append(formInputEl);
      }
    }
  });
  // console.log(block, formEl, childrens, block.children.length, formEl.children.length, block.children.length === formEl.children.length);
  if (
    formEl && formEl.children.length > 0
  ) {
    // block.innerHTML = '';
    block.append(formEl);
  }
}
