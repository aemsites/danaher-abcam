import {
  div, a, ul, li,
  p,
  span,
} from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';
import { formatDate } from '../../scripts/scripts.js';

export async function fetchPostData() {
  try {
    const response = await fetch('/drafts/query-index.json');
    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    return [];
  }
}

export default async function decorate(block) {
  const postData = await fetchPostData();
  // const hasChildClass = block.classList.contains('child');
  const wrapper = div({ class: 'flex pt-8' });
  const blogsContainer = div({ class: 'text-lg' });
  const sortedResults = getMetadata('type');
  const filteredResults = postData.filter((item) => item.path.includes('/technical-resources/') && sortedResults === item.type);
  if (sortedResults === 'Pathways') {
    filteredResults.forEach((post) => {
      const title = ul(
        { class: 'text-cyan-700' },
        li(
          { class: 'my-6' },
          a(
            { href: post.path },
            span({ class: 'font-medium' }, post.title),
            p({ class: 'my-2 text-sm text-gray-400' }, formatDate(post.lastModified)),
            p({ class: 'text-black text-sm' }, post.description),
          ),
        ),
      );
      blogsContainer.append(title);
    });
  } else {
    filteredResults.forEach((post) => {
      const title = ul(
        { class: 'text-cyan-700' },
        li(
          { class: 'mb-1 text-lg hover:underline' },
          a({ href: post.path }, post.title),
        ),
      );
      blogsContainer.append(title);
    });
  }
  wrapper.append(blogsContainer);
  block.innerText = '';
  block.appendChild(wrapper);
}
