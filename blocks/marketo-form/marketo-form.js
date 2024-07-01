import {
  loadScript,
} from '../../scripts/aem.js';

// eslint-disable no-console
async function loadMarketo(block) {
  const tmpFormName = block?.firstElementChild;
  const formName = tmpFormName?.firstElementChild?.nextElementSibling?.textContent;
  const formId = formName.split('_')[1];

  await loadScript('//439-KNJ-322.mktoweb.com/js/forms2/js/forms2.min.js');
  block.innerHTML = '';

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
      block.innerHTML = '<p style="text-align: center; height: 80px; background: white; font-weight: bold;">Thank you for your submission.</p>';
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
