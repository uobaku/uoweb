
// document.getElementById("homebtn").addEventListener("click", function() {
//     location.href = "index.html"
// });

// if (document.getElementById("hmbtn")!=null){
//     document.getElementById("hmbtn").addEventListener("click", function() {
//         location.href = "index.html"
//     });
// }

// document.getElementById("insta").addEventListener("click", function() {
//     location.href = "https://www.instagram.com/ushaqlarimizaoyredek/"
// });

// document.getElementById("tiktok").addEventListener("click", function() {
//     location.href = "https://www.tiktok.com/@ushaqlarimizaoyredek?_t=8h5APnACVo9&_r=1"
// });

// document.getElementById("linkedin").addEventListener("click", function() {
//     location.href = "https://www.linkedin.com/in/ushaqlarimiza-oyredek-2b9051296/"
// });

// if (document.getElementById("prtbtn")!=null){
//     document.getElementById("prtbtn").addEventListener("click", function() {
//         location.href = "partners.html"
//     });
// }

// document.getElementById("partner").addEventListener("click", function() {
//     location.href = "partners.html"
// });

    
// document.getElementById("hstevntbtn").addEventListener("click", function() {
//     location.href = "hosted.html"
// });

// document.getElementById("ourstorybtn").addEventListener("click", function() {
//     location.href = "story.html"
// });
// document.getElementById("ourteambtn").addEventListener("click", function() {
//     location.href = "team.html"
// });

// document.getElementById("facebook").addEventListener("click", function() {
//     location.href = "https://www.facebook.com/profile.php?id=61552572833316"
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const menuBtn = document.getElementById("menuBtn");
//     const dropdowns = document.querySelectorAll('.dropdownmob');
//     const header = document.getElementById('headerBar')
//     const titlediv = document.getElementById('titlediv')
//     const headerimg = document.getElementById('headerimg')

//     menuBtn.addEventListener("click", function () {
//         menuBtn.classList.toggle('open');
//         header.classList.toggle('open');
//         titlediv.classList.toggle('open');
//         if (headerimg != null){
//             headerimg.classList.toggle('open');
//         }
//         dropdowns.forEach(function (dropdown) {
//             dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
//         });
//     });
// });


// Smooth scroll to Actions section
// Counter animation function
// Number counting animation
const countUp = (el, target) => {
    let count = 0;
    const speed = target / 30;

    const updateCounter = () => {
        count += speed;
        if (count >= target) {
            el.innerText = target;
            el.nextElementSibling.style.opacity = 1;  // Show the plus sign
        } else {
            el.innerText = Math.floor(count);
            requestAnimationFrame(updateCounter);
        }
    };
    updateCounter();
};

// Function to trigger animations for each section
const triggerAnimations = (section) => {
    if (section.id === 'action-section') {
        // Trigger number animation for the action section
        section.querySelectorAll('.action-number').forEach(num => {
            const target = +num.getAttribute('data-target');
            countUp(num, target);
        });

        section.querySelectorAll('.action-text').forEach(text => {
            text.classList.add('visible');  // Trigger text fade-in animation
        });
    }

    if (section.id === 'our-goals') {
        // Trigger animations for the "Our Goals" section
        const goalCircles = section.querySelectorAll('.goal-circle');
        goalCircles.forEach((circle, index) => {
            setTimeout(() => {
                circle.classList.add('show-goal');
            }, index * 500); // Staggered delay for each circle
        });

        const goals = section.querySelectorAll('.count');
        goals.forEach((goal, index) => {
            setTimeout(() => {
                goal.classList.add('visible');
            }, index * 300);  // Delay to stagger the animation
        });
    }
};

// Intersection Observer for triggering animation on scroll for action section
const actionSections = document.querySelectorAll('.action-section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger animations only if they haven't been triggered before
            triggerAnimations(entry.target);
        }
    });
}, { threshold: 0.5 });

actionSections.forEach(section => {
    observer.observe(section);
});

// Scroll behavior to restrict scrolling to sections
const sections = document.querySelectorAll('section');
let currentSectionIndex = 0;

// Function to smoothly scroll to the target section
const scrollToSection = index => {
    sections[index].scrollIntoView({ behavior: 'smooth' });
};

document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
    } else if (e.deltaY < 0 && currentSectionIndex > 0) {
        currentSectionIndex--;
    }
    scrollToSection(currentSectionIndex);
    // Run the animation on each swipe/scroll
    triggerAnimations(sections[currentSectionIndex]);
});



// Initial page load animations (for first section to trigger animation)
window.addEventListener('DOMContentLoaded', () => {
    triggerAnimations(sections[currentSectionIndex]);
});

// Trigger animations on page load and after every swipe/scroll
const goalSection = document.querySelector('#our-goals');
const goalObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            triggerAnimations(entry.target);  // Re-trigger animations on first in-view detection
        }
    });
}, { threshold: 0.5 });

goalObserver.observe(goalSection);

// Intersection Observer to trigger animation when in view for Our Goals section
const goalObserver2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const goals = document.querySelectorAll('.count');
            goals.forEach((goal, index) => {
                setTimeout(() => {
                    goal.classList.add('visible');
                }, index * 300);  // Delay to stagger the animation
            });
            goalObserver2.disconnect(); // Disconnect after triggering
        }
    });
}, { threshold: 0.5 });

goalObserver2.observe(goalSection);
document.addEventListener('DOMContentLoaded', () => {
    // Select the call icon button
    const callIcon = document.getElementById('goal-circle');

    // Add event listener to scroll to footer
    callIcon.addEventListener('click', () => {
        const footer = document.getElementById('footer');
        footer.scrollIntoView({ behavior: 'smooth' });
    });
});


// Intersection Observer for detecting footer visibility
const footerSection = document.querySelector('#footer-section');

observer.observe(footerSection);


