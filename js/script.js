document.getElementById("homebtn").addEventListener("click", function() {
    location.href = "index.html"
});

document.getElementById("hmbtn").addEventListener("click", function() {
    location.href = "index.html"
});

document.getElementById("insta").addEventListener("click", function() {
    location.href = "https://www.instagram.com/ushaqlarimizaoyredek/"
});

document.getElementById("tiktok").addEventListener("click", function() {
    location.href = "https://www.tiktok.com/@ushaqlarimizaoyredek?_t=8h5APnACVo9&_r=1"
});

document.getElementById("linkedin").addEventListener("click", function() {
    location.href = "https://www.linkedin.com/in/ushaqlarimiza-oyredek-2b9051296/"
});

document.getElementById("prtbtn").addEventListener("click", function() {
    location.href = "partners.html"
});

document.getElementById("partner").addEventListener("click", function() {
    location.href = "partners.html"
});

document.getElementById("hstevntbtn").addEventListener("click", function() {
    location.href = "hosted.html"
});

document.getElementById("ourstorybtn").addEventListener("click", function() {
    location.href = "story.html"
});
document.getElementById("ourteambtn").addEventListener("click", function() {
    location.href = "team.html"
});

document.getElementById("facebook").addEventListener("click", function() {
    location.href = "https://www.facebook.com/profile.php?id=61552572833316"
});

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const dropdowns = document.querySelectorAll('.dropdownmob');
    const header = document.getElementById('headerBar')
    const titlediv = document.getElementById('titlediv')
    const headerimg = document.getElementById('headerimg')

    menuBtn.addEventListener("click", function () {
        menuBtn.classList.toggle('open');
        header.classList.toggle('open');
        titlediv.classList.toggle('open');
        if (headerimg != null){
            headerimg.classList.toggle('open');
        }
        dropdowns.forEach(function (dropdown) {
            dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
        });
    });
});
