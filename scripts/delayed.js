// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// google tag manager -start
function loadGTM() {
    const scriptTag = document.createElement('script');
    scriptTag.innerHTML = `
          let gtmId = 'GTM-PDRV95V’';
          // googleTagManager
          (function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({
                  'gtm.start':
                      new Date().getTime(), event: 'gtm.js'
              });
              var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src =
                  'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', gtmId);
          `;
    document.head.prepend(scriptTag);
    const noScriptTag = document.createElement('noscript');
    noScriptTag.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PDRV95V"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.prepend(noScriptTag);
  }
  // google tag manager -end
  
  if (
    !window.location.hostname.includes('localhost')
      && !window.location.hostname.includes('.hlx')
  ) {
    loadGTM();
  }
