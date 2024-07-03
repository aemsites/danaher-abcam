import {
  div,
  form,
  p,
  section,
} from '../../scripts/dom-builder.js';
import {
  loadScript,
} from '../../scripts/aem.js';

// eslint-disable no-console
async function loadMarketo(block) {
  const tmpFormName = block?.firstElementChild;
  const formName = tmpFormName?.firstElementChild?.nextElementSibling?.textContent;
  const tmpThankYou = tmpFormName?.nextElementSibling;
  const thankYou = tmpThankYou?.firstElementChild?.nextElementSibling?.textContent;
  const formId = formName.split('_')[1];

  const p1El = block?.querySelector('h2');
  const p2El = block?.querySelector('strong');
  const formEl = div(
    { class: 'mt-0 mb-0 md:mb-16 ml-0 mr-4' },
    form({
      id: `${formName}`,
      class: 'relative',
    }),
    section(
      div(
        { class: 'form-container mb-8' },
        div(
          { class: 'relative z-[9]' },
          div(
            { class: 'mktoForm' },
            form(
              { id: `${thankYou}` },
            ),
            div(
              {
                class: 'max-w-7xl mx-auto flex flex-col items-center justify-center h-80 bg-white',
                style: 'display:none',
                id: 'thankyou',
              },
              p(
                { class: 'font-bold text-3xl text-gray-700 mb-4' },
                `${p1El?.textContent}`,
              ),
              p(
                { class: 'font-normal text-lg text-gray-700' },
                `${p2El?.textContent}`,
              ),
            ),
          ),
        ),
      ),
    ),
  );
  await loadScript('//439-KNJ-322.mktoweb.com/js/forms2/js/forms2.min.js');
  block.innerHTML = '';
  block.append(formEl);
  window.MktoForms2.loadForm('//439-KNJ-322.mktoweb.com', '439-KNJ-322', `${formId}`, (mktoform) => {
    const formElement = mktoform.getFormElem();
    block.append(formElement[0]);

    mktoform.onSubmit(() => {
      const currentDate = new Date();
      const year = currentDate.getUTCFullYear();
      const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getUTCDate()).padStart(2, '0');
      const hour = String(currentDate.getUTCHours()).padStart(2, '0');
      const min = String(currentDate.getUTCMinutes()).padStart(2, '0');
      const sec = String(currentDate.getUTCSeconds()).padStart(2, '0');
      const milli = String(currentDate.getUTCMilliseconds()).padStart(3, '0');
      const inquiry = year + month + day + hour + min + sec + milli;
      mktoform.vals({
        inquiryDatetimestamp: inquiry,
      });
    });

    mktoform.onSuccess(() => {
      mktoform.getFormElem().hide();
      document.getElementById('thankyou').style.display = 'block';
      return false;
    });
  });

  window.MktoForms2.whenRendered((mktoform) => {
    function getgacid() {
      try {
        const tracker = window.ga.getAll()[0];
        return tracker.get('clientId');
      } catch (e) {
        return 'n/a';
      }
    }
    mktoform.vals({
      gacid: getgacid(),
    });
  });
}

export default function decorate(block) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      loadMarketo(block);
    }
  });
  observer.observe(block);
}
