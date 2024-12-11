
document.addEventListener('DOMContentLoaded', function () {
    fetch('../json/news.json') // Fetches the news.json from the same folder as the HTML file
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
                                    <img src="placeholder.jpg" data-src="${newsItem.thumbnail}" class="news-img lazy" alt="${newsItem.short_desc}">
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

            // Lazy loading images
            let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

            if ("IntersectionObserver" in window) {
                let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            let lazyImage = entry.target;
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                });

                lazyImages.forEach(function (lazyImage) {
                    lazyImageObserver.observe(lazyImage);
                });
            } else {
                // Fallback for browsers that don't support IntersectionObserver
                let lazyLoad = function () {
                    lazyImages.forEach(function (lazyImage) {
                        if (lazyImage.getBoundingClientRect().top < window.innerHeight && lazyImage.getBoundingClientRect().bottom > 0 && getComputedStyle(lazyImage).display !== "none") {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");

                            lazyImages = lazyImages.filter(function (image) {
                                return image !== lazyImage;
                            });

                            if (lazyImages.length === 0) {
                                document.removeEventListener("scroll", lazyLoad);
                                window.removeEventListener("resize", lazyLoad);
                                window.removeEventListener("orientationchange", lazyLoad);
                            }
                        }
                    });
                };

                document.addEventListener("scroll", lazyLoad);
                window.addEventListener("resize", lazyLoad);
                window.addEventListener("orientationchange", lazyLoad);
            }
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

