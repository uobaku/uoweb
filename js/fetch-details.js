document.addEventListener('DOMContentLoaded', function () {
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
                    contentHtml += `
                        <div class="news-thumbnail-container">
                            <img src="${newsDetails.thumbnail}" class="news-details-img" alt="${newsDetails.short_desc}" onclick="openLightbox(this)">
                        </div>`;
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
                        </div>`;
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
                        imgElement.onclick = () => openLightbox(imgElement); // Add lightbox on click

                        // Wrap each image in a container for styling if needed
                        const imgWrapper = document.createElement('div');
                        imgWrapper.classList.add('image-wrapper');
                        imgWrapper.appendChild(imgElement);

                        imgContainer.appendChild(imgWrapper);
                    });

                    newsDetailsSection.appendChild(imgContainer);
                }

                // Convert links in the text into hyperlinks
                const paragraphs = newsDetailsSection.querySelectorAll('p');
                paragraphs.forEach(paragraph => {
                    let updatedText = paragraph.innerHTML;
                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                    updatedText = updatedText.replace(urlRegex, function(url) {
                        return `<a href="${url}" target="_blank">${url}</a>`;
                    });
                    paragraph.innerHTML = updatedText;
                });
            } else {
                newsDetailsSection.innerHTML = '<p>News item not found.</p>';
            }
        })
        .catch(error => console.error('Error fetching news details:', error));
});

// Lightbox functionality
function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    lightbox.style.display = 'flex';
    lightboxImg.src = imgElement.src; // Set the lightbox image to the clicked image
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}
