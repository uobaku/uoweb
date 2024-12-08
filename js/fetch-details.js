document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');

    fetch('news.json') // Fetches the news.json from the same folder as the HTML file
        .then(response => response.json())
        .then(data => {
            const newsDetails = data.find(newsItem => newsItem.timestamp === newsId);
            if (newsDetails) {
                const newsDetailsSection = document.getElementById('news-details');

                // Start by creating the content HTML with the thumbnail at the top
                let contentHtml = '';

                // Add the thumbnail image at the top if it exists
                if (newsDetails.thumbnail) {
                    contentHtml += `<img src="${newsDetails.thumbnail}"  alt="${newsDetails.short_desc}">`;
                }

                // Add the news title and text
                contentHtml += `<h1>${newsDetails.short_desc}</h1>`;
                contentHtml += `<p>${newsDetails.long_desc}</p>`;

                // Append the HTML content to the section
                newsDetailsSection.innerHTML = contentHtml;

                // Add the video at the end if it exists
                if (newsDetails.video) {
                    newsDetailsSection.innerHTML += `
                        <div class="video-container">
                            <video controls>
                                <source src="${newsDetails.video}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    `;
                }

                // Add other images after the text
                if (newsDetails.imgs && newsDetails.imgs.length > 0) {
                    const imgContainer = document.createElement('div');
                    imgContainer.classList.add('image-gallery');

                    newsDetails.imgs.forEach(imgSrc => {
                        const imgElement = document.createElement('img');
                        imgElement.src = imgSrc;
                        imgElement.classList.add('news-details-img');
                        imgElement.alt = newsDetails.short_desc;
                        imgContainer.appendChild(imgElement);
                    });

                    newsDetailsSection.appendChild(imgContainer);
                }
            } else {
                newsDetailsSection.innerHTML = '<p>News item not found.</p>';
            }
        })
        .catch(error => console.error('Error fetching news details:', error));
});
