export default function decorate(block) {
    const imgText = block.querySelector('p');
    imgText.style.setProperty('color', '#65797C');
    imgText.classList.add('py-2', 'text-sm', 'leading-normal');
}