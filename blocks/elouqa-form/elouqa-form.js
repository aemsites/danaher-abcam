import {
  form, input, label, div,
  select,
} from '../../scripts/dom-builder.js';

function detectFormElementType(formInputElType, formInputElName, formInputElLabel, formInputElValue = "") {
  let typeOfFormElement;
  switch (formInputElType) {
    case "options":
      // typeOfFormElement = select({
      //   class: 'p-1 border rounded',
      //   id: formInputElName ? formInputElName : formInputElLabel,
      //   name: formInputElName ? formInputElName : formInputElLabel,
      //   type: formInputElType,
      // });
      break;
    default:
      typeOfFormElement = input({
        class: 'p-1 border rounded',
        id: formInputElName ? formInputElName : formInputElLabel,
        name: formInputElName ? formInputElName : formInputElLabel,
        type: formInputElType,
        value: formInputElValue,
      });
      break;
  }
  return typeOfFormElement;
}

export default function decorate(block) {
  // console.log(block);
  const formEl = form();
  [...block.children].forEach((child, childIndex) => {
    if (childIndex === 0) {
      formEl.method = child?.children[0]?.children[0]?.innerText;
      formEl.id = child?.children[0]?.children[1]?.innerText;
      formEl.name = child?.children[0]?.children[2]?.innerText;
      formEl.action = child?.children[0]?.children[3]?.innerText;
    } else if (child.children.length > 0) {
      const formInputElLabel = child.children[0].children[0]?.innerText;
      const formInputElType = child.children[0].children[1]?.innerText;
      const formInputElName = child.children[0].children[2]?.innerText;
      const formInputElValue = child.children[0].children[3]?.innerText;
      const typeOfFormElement = detectFormElementType(formInputElType, formInputElName, formInputElLabel, formInputElValue);
      const formInputEl = formInputElType !== "hidden" ? div(
        { class: 'form-group flex flex-col gap-1' },
        label(
          {
            class: 'font-sans tracking-wide font-semibold',
            for: formInputElName ? formInputElName : formInputElLabel,
          },
          formInputElLabel ? formInputElLabel : formInputElName,
        ),
        typeOfFormElement,
      ) : typeOfFormElement;
      if (formInputElLabel && formInputElType && formInputElName) {
        formEl.append(formInputEl);
      }
    }
    child.outerHTML = '';
  });
  if (formEl && formEl.children.length > 0) {
    block.append(formEl);
  }
}
