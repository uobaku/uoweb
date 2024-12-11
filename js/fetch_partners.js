document.addEventListener("DOMContentLoaded", function () {
    const partnersContainer = document.querySelector(".partners .container");

    fetch("../json/partners.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load partners.json");
            }
            return response.json();
        })
        .then((data) => {
            partnersContainer.innerHTML = ""; // Clear existing content
            data.partners.forEach((section) => {
                // Create section title
                const sectionTitle = document.createElement("h2");
                sectionTitle.className = "partnerstitle mt-5";
                sectionTitle.textContent = section.title;
                partnersContainer.appendChild(sectionTitle);

                // Create groups
                section.groups.forEach((group) => {
                    const groupDiv = document.createElement("div");
                    groupDiv.className = "partners-spec mt-4";

                    const rowDiv = document.createElement("div");
                    rowDiv.className = "row";

                    group.partners.forEach((partner) => {
                        const colDiv = document.createElement("div");
                        colDiv.className = "col-md-3";

                        const img = document.createElement("img");
                        img.src = "placeholder.jpg"; // Placeholder image
                        img.dataset.src = partner.img; // Actual image source for lazy loading
                        img.alt = partner.alt;
                        img.className = "img-fluid partner-img lazy";

                        colDiv.appendChild(img);
                        rowDiv.appendChild(colDiv);
                    });

                    groupDiv.appendChild(rowDiv);
                    partnersContainer.appendChild(groupDiv);
                });
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
                const lazyLoadFallback = function () {
                    lazyImages.forEach(function (lazyImage) {
                        if (
                            lazyImage.getBoundingClientRect().top < window.innerHeight &&
                            lazyImage.getBoundingClientRect().bottom > 0 &&
                            getComputedStyle(lazyImage).display !== "none"
                        ) {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");

                            lazyImages = lazyImages.filter(function (image) {
                                return image !== lazyImage;
                            });

                            if (lazyImages.length === 0) {
                                document.removeEventListener("scroll", lazyLoadFallback);
                                window.removeEventListener("resize", lazyLoadFallback);
                                window.removeEventListener("orientationchange", lazyLoadFallback);
                            }
                        }
                    });
                };

                document.addEventListener("scroll", lazyLoadFallback);
                window.addEventListener("resize", lazyLoadFallback);
                window.addEventListener("orientationchange", lazyLoadFallback);
            }
        })
        .catch((error) => {
            console.error("Error loading partners:", error);
            partnersContainer.innerHTML = "<p>Error loading partners. Please try again later.</p>";
        });
});
