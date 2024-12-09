import { p } from "../../scripts/dom-builder";

export default function decorate(block) {
  const para = p('Hello');
  block.appendChild(para);
}