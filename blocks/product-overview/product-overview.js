import { getProductResponse } from "../../scripts/search.js";

export default async function decorate(block) {
    const response = await getProductResponse();
    block.classList.add(...'h-full w-[60%] bg-slate-300 col-span-7'.split(' '));
    block.textContent = 'Product Overview Placeholder';
}