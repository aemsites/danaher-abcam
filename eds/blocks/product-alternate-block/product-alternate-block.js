export default function decorate(block) {
  block.innerHTML = `<div>
        <div class="product-alternate-block ">
            <h3>Consider this alternative</h3>
            <ul>
               <li>
                  <a>
                     <p></p>
                     <p></p>
                     <p>Anti-Histone H3 antibody [EPR16987] - Nuclear Marker and ChIP Grade</p>
                  </a>
               </li>
            </ul>
        </div>
      </div> `;

      console.log(block.parentElement);
      block.classList.add(...'bg-[#f2f2f2] p-12'.split(' '));
      
}
