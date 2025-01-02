import { applyClasses } from '../../scripts/scripts.js';
import { span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  const notification = block.querySelector('div:nth-of-type(1)');
  if (block && block.classList.contains('knowledge')) {
    applyClasses(notification, 'flex pt-0.5 px-1 bg-gray-300');
    const icon = span({ class: 'icon icon-knowledge p-2.5 ' });
    notification.prepend(icon);
  } else if (block && block.classList.contains('warning')) {
    applyClasses(notification, 'flex pt-0.5 px-1 bg-orange-50');
    const icon = span({ class: 'icon icon-warning p-2.5 ' });
    notification.prepend(icon);
  } else if (block && block.classList.contains('help')) {
    applyClasses(notification, 'flex pt-0.5 px-1 bg-green-200');
    const icon = span({ class: 'icon icon-help p-2.5 ' });
    notification.prepend(icon);
  }
  decorateIcons(notification);
}
