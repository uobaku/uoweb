document.addEventListener('DOMContentLoaded', function() {
    fetch('news.json') // Fetches the news.json from the same folder as the HTML file
        .then(response => response.json())
        .then(data => {
            const newsSection = document.getElementById('news-section');

            data.forEach(newsItem => {
                const newsElement = document.createElement('div');
                newsElement.className = 'news-item';

                // Format the date to display only the date part
                const date = new Date(newsItem.timestamp).toLocaleDateString();

                newsElement.innerHTML = `
                    <div class="news-img-container">
                        <a href="#lightbox-${newsItem.timestamp}">
                            <img src="${newsItem.thumbnail}" class="news-img" alt="${newsItem.short_desc}">
                        </a>
                    </div>
                    <div class="news-desc">
                        <div class="news-date">${date}</div>
                        <h2 class="news-title">${newsItem.short_desc}</h2>
                        <p class="news-p">${newsItem.long_desc.split(' ').slice(0, 20).join(' ')}... <a href="news-details.html?id=${newsItem.timestamp}">Read more</a></p>
                    </div>

                    <div id="lightbox-${newsItem.timestamp}" class="lightbox">
                        <a href="#" class="close">X</a>
                        <img src="${newsItem.thumbnail}" alt="${newsItem.short_desc}">
                        <div class="zoom-buttons">
                            <button onclick="zoomIn(event)">+</button>
                            <button onclick="zoomOut(event)">-</button>
                        </div>
                    </div>
                `;

                newsSection.appendChild(newsElement);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
});

// Zoom functions
function zoomIn(event) {
    const img = event.target.closest('.lightbox').querySelector('img');
    const currentWidth = img.clientWidth;
    img.style.width = (currentWidth * 1.2) + 'px'; // Increase image size by 20%
}

function zoomOut(event) {
    const img = event.target.closest('.lightbox').querySelector('img');
    const currentWidth = img.clientWidth;
    img.style.width = (currentWidth / 1.2) + 'px'; // Decrease image size by 20%
}
