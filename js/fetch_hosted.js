document.addEventListener("DOMContentLoaded", () => {
    fetch("../json/hosted_events.json") // Fetches the hosted_events.json from the same folder
        .then(response => response.json())
        .then(data => {
            const eventsContainer = document.querySelector("section.hosted");

            // Clear existing content inside the section (if needed)
            eventsContainer.innerHTML = "";

            // Iterate over events and create HTML structure
            data.events.forEach(event => {
                const eventDiv = document.createElement("div");
                eventDiv.className = "event";

                // Create lazy-loading image container
                const eventImgContainer = document.createElement("div");
                eventImgContainer.className = "event-img-container";

                const eventImg = document.createElement("img");
                eventImg.src = "placeholder.jpg"; // Placeholder image
                eventImg.dataset.src = event.img; // Actual image to load lazily
                eventImg.className = "eventimg lazy";
                eventImg.alt = event.alt;

                eventImgContainer.appendChild(eventImg);

                // Create description container
                const eventDesc = document.createElement("div");
                eventDesc.className = "eventdesc";

                // Create title
                const eventTitle = document.createElement("h2");
                eventTitle.className = "eventtitle";
                eventTitle.textContent = event.title;

                // Create description paragraph
                const eventP = document.createElement("p");
                eventP.className = "eventp";
                eventP.textContent = event.description;

                eventDesc.appendChild(eventTitle);
                eventDesc.appendChild(eventP);

                // Append elements together
                eventDiv.appendChild(eventImgContainer);
                eventDiv.appendChild(eventDesc);

                eventsContainer.appendChild(eventDiv);
            });

            // Lazy loading images
            let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

            if ("IntersectionObserver" in window) {
                let lazyImageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const lazyImage = entry.target;
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                });

                lazyImages.forEach(lazyImage => {
                    lazyImageObserver.observe(lazyImage);
                });
            } else {
                // Fallback for browsers that don't support IntersectionObserver
                const lazyLoad = () => {
                    lazyImages.forEach(lazyImage => {
                        if (
                            lazyImage.getBoundingClientRect().top < window.innerHeight &&
                            lazyImage.getBoundingClientRect().bottom > 0 &&
                            getComputedStyle(lazyImage).display !== "none"
                        ) {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");
                            lazyImages = lazyImages.filter(image => image !== lazyImage);

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
        .catch(error => console.error("Error fetching events:", error));
});
