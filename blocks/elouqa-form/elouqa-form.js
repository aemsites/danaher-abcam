import {
  form, input, label, div,
  select, option, span,
} from '../../scripts/dom-builder.js';

function handleValidations(validations, element) {
  // console.log('Handle Validations', validations);
  let isError = false;
  let message = '';
  const allValidations = validations.split('|');
  if (allValidations.includes('required')) {
    console.log(element, element.parentElement);
    if (element.value.trim() === '') {
      isError = true;
      message = 'Field is required';
    } else {
      isError = false;
      message = '';
    }
  }
  if (isError !== '') {
    element.classList.add('border-red-400');
    element.parentElement.insertBefore(
      span({ class: 'text-sm text-red-600' }, message),
      element.nextElementSibling,
    );
  }
}

function detectFormElementType(
  formInputElType, formInputElName, formInputElLabel,
  formInputElValue = "", formInputElOptions = "",
) {
  let typeOfFormElement;
  switch (formInputElType) {
    case "options":
      const allOptions = formInputElOptions.trim() !== ''
        ? formInputElOptions.split('|').map((opt) => {
          const newOption = opt.split('->');
          return option({ value: newOption[0] }, newOption[1]);
        })
        : '';
      typeOfFormElement = select(
        {
          class: 'p-1 border rounded',
          id: formInputElName ? formInputElName : formInputElLabel,
          name: formInputElName ? formInputElName : formInputElLabel,
          type: formInputElType,
          value: formInputElValue,
        },
        ...allOptions
      );
      break;
    default:
      typeOfFormElement = input({
        class: 'p-1 border rounded',
        id: formInputElName ? formInputElName : formInputElLabel,
        name: formInputElName ? formInputElName : formInputElLabel,
        type: formInputElType,
        // value: formInputElValue,
      });
      break;
  }
  return typeOfFormElement;
}

export default function decorate(block) {
  // console.log(block);
  const formEl = form();
  [...block.children].forEach((child, childIndex) => {
    const firstElementChildren = child.children[0].children;
    if (childIndex === 0) {
      formEl.method = firstElementChildren[0]?.innerText;
      formEl.id = firstElementChildren[1]?.innerText;
      formEl.name = firstElementChildren[2]?.innerText;
      formEl.action = firstElementChildren[3]?.innerText;
      child.outerHTML = '';
    } else if (child.children.length > 0) {
      const formInputElLabel = firstElementChildren[0]?.innerText;
      const formInputElType = firstElementChildren[1]?.innerText;
      const formInputElName = firstElementChildren[2]?.innerText;
      const formInputElValidations = firstElementChildren[3]?.innerText;
      const formInputElValue = firstElementChildren[4]?.innerText;
      const formInputElOptions = firstElementChildren[5]?.innerText;
      if (formInputElLabel && formInputElType && formInputElName) {
        const typeOfFormElement = detectFormElementType(
          formInputElType, formInputElName, formInputElLabel,
          formInputElValue, formInputElOptions,
        );
        if (formInputElValidations !== '' && typeOfFormElement) {
          typeOfFormElement.addEventListener(
            'blur',
            () => handleValidations(formInputElValidations, typeOfFormElement),
          );
        }
        const formInputEl = formInputElType !== 'hidden' ? div(
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
        // child.outerHTML = '';
        formEl.append(formInputEl);
      }
    }
  });
  if (formEl && formEl.children.length > 0) {
    block.append(formEl);
  }
}
