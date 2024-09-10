import {
  form, input, label, div,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  console.log(block);
  const formEl = form();
  [...block.children].forEach((child, childIndex) => {
    if (childIndex === 0) {
      formEl.method = child?.children[0]?.children[0]?.innerText;
      formEl.id = child?.children[0]?.children[1]?.innerText;
      formEl.name = child?.children[0]?.children[2]?.innerText;
      formEl.action = child?.children[0]?.children[3]?.innerText;
      block.innerHTML = '';
    } else {
      formEl.append(
        div(
          { class: 'form-group flex flex-col gap-1' },
          label(
            {
              class: '',
              for: child?.children[0]?.children[2]?.innerText,
            },
            child?.children[0]?.children[0]?.innerText,
          ),
          input({
            class: 'p-1 border rounded',
            id: child?.children[0]?.children[2]?.innerText,
            name: child?.children[0]?.children[2]?.innerText,
            type: child?.children[0]?.children[1]?.innerText,
          }),
        ),
      );
    }
    block.append(formEl);
  });
}
