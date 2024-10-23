export default function decorate(block) {

  const apiKey = '';
  const videoId = '0EtzSC_1ROI';

  fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`)
      .then(response => response.json())
      .then(data => {
          const description = data.items[0].snippet.description;
          //console.log(description);
          const chapters = extractChapters(description);
          console.log(chapters);
      })
      .catch(error => console.error('Error fetching video data:', error));

  function extractChapters(description) {
			const chapterRegex = /(\d{1,2}:\d{2})(.*)/g;
      let chapters = [];
      let match;

      while ((match = chapterRegex.exec(description)) !== null) {
				chapters.push({
					time: match[1].trim(),
					title: match[2].trim(),
				});
			}
      return chapters;
  }


	// fetch(`https://www.youtube.com/watch?v=0EtzSC_1ROI`, {
	// 	mode: 'no-cors',
	// })
  // .then(response => response.text())
  // .then(html => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(html, 'text/html');
  //   const chapters = [...doc.querySelectorAll('.ytp-chapter-title-content')];
  //   chapters.forEach(chapter => {
  //     console.log(chapter.innerText);
  //   });
  // })
  // .catch(error => {
  //   console.error('Error fetching YouTube page:', error);
  // });

	// fetch('https://www.youtube.com/watch?v=0EtzSC_1ROI', {
	// 	mode: 'no-cors',
	// })
	// 	.then(response => {
	// 		console.log(response); // The response is opaque
	// 	})
}