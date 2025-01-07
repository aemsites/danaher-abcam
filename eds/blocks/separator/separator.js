export default function decorate(block) {
  block.innerText = '';
  const separator = document.createElement('hr');
  block.appendChild(separator);
}
