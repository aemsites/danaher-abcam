export default async function decorate(block) {
  console.log('Block: ', block);

  // Function to get query parameters
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('apiUrl');
  }

  async function fetchApi() {
    const apiUrl = getQueryParams();
    if (apiUrl) {
      console.log('API URL:', apiUrl);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      console.error('No API URL provided');
    }
  }

  fetchApi(); // Call fetchApi and wait for it to resolve
}
