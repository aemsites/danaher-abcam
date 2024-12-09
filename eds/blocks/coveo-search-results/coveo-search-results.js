export default function decorate(block) {
    const para = document.createElement('p');
    
    para.textContent = "Hello";
    
    block.appendChild(para);
}