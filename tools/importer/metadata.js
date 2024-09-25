  // eslint-disable-next-line no-unused-vars
  const metadata = (main, document, html, params, urlStr) => {
    const meta = {};
  
    const pagetags = document.querySelector('[name="pagetags"]');
    console.log('pagetags', pagetags);
   
    return meta;
  };
  
  export default metadata;