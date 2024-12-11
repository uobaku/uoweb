document.addEventListener("DOMContentLoaded", function () {
    const sectionsContainer = document.querySelector(".section-container"); // Make sure this container exists in HTML

    fetch("../json/team.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load team.json");
            }
            return response.json();
        })
        .then((data) => {
            sectionsContainer.innerHTML = ""; // Clear existing content

            data.sections.forEach((section) => {
                // Create section title
                const sectionTitle = document.createElement("h1");
                sectionTitle.className = "text-center text-primary mt-5 mb-4";
                sectionTitle.textContent = section.title;
                sectionsContainer.appendChild(sectionTitle);

                // Create a row for the section
                const sectionRow = document.createElement("div");
                sectionRow.className = "row justify-content-center";

                // Create members
                section.members.forEach((member) => {
                    const memberDiv = document.createElement("div");
                    memberDiv.className = "col-4 d-flex justify-content-center mb-4"; // Added margin-bottom for spacing

                    const cardDiv = document.createElement("div");
                    cardDiv.className = "card";

                    // Member image
                    const img = document.createElement("img");
                    img.src = "placeholder.jpg"; // Placeholder image
                    img.dataset.src = member.image; // Actual image source for lazy loading
                    img.alt = member.alt;
                    img.className = "card-img-top img-fluid lazy";

                    // Member name
                    const name = document.createElement("h5");
                    name.className = "card-title text-center";
                    name.textContent = member.name;

                    // Member role (if any, use a space if not specified)
                    const role = document.createElement("p");
                    role.className = "text-center";
                    role.textContent = member.role || " "; // If no role, display a space

                    // Append everything to the card
                    cardDiv.appendChild(img);
                    cardDiv.appendChild(name);
                    cardDiv.appendChild(role);

                    memberDiv.appendChild(cardDiv);
                    sectionRow.appendChild(memberDiv);
                });

                sectionsContainer.appendChild(sectionRow);
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
            console.error("Error loading team:", error);
            sectionsContainer.innerHTML = "<p>Error loading team. Please try again later.</p>";
        });
});
