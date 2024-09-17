import {
  form, input, label, div,
  select, option, span,
} from '../../scripts/dom-builder.js';

function handleValidations(validations, element) {
  let isError = false;
  let message = '';
  const allValidations = validations.split('|');
  if (allValidations.includes('required')) {
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

function detectFormElementType(formInputElType, formInputElName, formInputElId, formInputElValue = '', formInputElOptions = '', formInputElDataValue = '') {
  let typeOfFormElement;
  switch (formInputElType) {
    case 'options':
      const allOptions = formInputElOptions.split('|').map((opt) => {
        const newOption = opt.split('->');
        return option({ value: newOption[0] }, newOption[1]);
      });
      typeOfFormElement = select({
        class: 'p-1 border rounded',
        id: formInputElId ?? formInputElName,
        name: formInputElName ?? formInputElId,
        'data-value': formInputElDataValue,
      }, ...allOptions);
      break;
    default:
      typeOfFormElement = input({
        class: `p-1 border rounded-md ${formInputElType === 'submit' ? 'text-white bg-green-400' : ''}`,
        id: formInputElId ?? formInputElName,
        name: formInputElName ?? formInputElId,
        type: formInputElType,
        value: formInputElValue,
        'data-value': formInputElDataValue,
      });
      break;
  }
  return typeOfFormElement;
}

export default function decorate(block) {
  const formEl = form({ class: 'flex flex-col gap-4' });
  [...block.children].forEach((child, childIndex) => {
    const firstElementChildren = child.children[0].children;
    if (childIndex === 0) {
      formEl.method = firstElementChildren[0]?.innerText;
      formEl.id = firstElementChildren[1]?.innerText;
      formEl.name = firstElementChildren[2]?.innerText;
      formEl.action = firstElementChildren[3]?.innerText;
      child.outerHTML = '';
    } else if (firstElementChildren.length === 1) {
      child.classList.add('hidden');
      formEl.append(input({
        class: 'text-white bg-green-400 p-1 border rounded-md',
        value: firstElementChildren[0]?.innerText,
        type: 'submit',
      }));
    } else if (child.children.length > 0) {
      const formInputElLabel = firstElementChildren[0]?.innerText;
      const formInputElType = firstElementChildren[1]?.innerText;
      const formInputElName = firstElementChildren[2]?.innerText;
      const formInputElValidations = firstElementChildren[3]?.innerText;
      const formInputElValue = firstElementChildren[4]?.innerText;
      const formInputElOptions = firstElementChildren[5]?.innerText;
      const formInputElDataValue = firstElementChildren[6]?.innerText;
      const formInputElId = firstElementChildren[7]?.innerText;
      if (formInputElLabel && formInputElType && formInputElName) {
        // eslint-disable max-len
        const typeOfFormElement = detectFormElementType(formInputElType, formInputElName, formInputElId, formInputElValue, formInputElOptions, formInputElDataValue);
        if (formInputElValidations !== '' && typeOfFormElement) {
          typeOfFormElement.addEventListener(
            'blur',
            () => handleValidations(formInputElValidations, typeOfFormElement),
          );
        }
        const formInputEl = !['hidden', 'submit'].includes(formInputElType) ? div(
          { class: 'form-group flex flex-col gap-1' },
          label({
            class: 'font-sans tracking-wide font-semibold',
            for: formInputElName ?? formInputElLabel,
          }, formInputElLabel),
          typeOfFormElement,
        ) : typeOfFormElement;
        // child.outerHTML = '';
        child.classList.add('hidden');
        formEl.append(formInputEl);
      }
    }
  });
  if (formEl && formEl.children.length > 0) {
    block.append(formEl);
  }
}
