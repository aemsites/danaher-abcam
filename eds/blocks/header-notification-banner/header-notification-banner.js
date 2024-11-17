export default function decorate(block) {
    block.classList.add(...'bg-black text-white p-8'.split(' '));
}