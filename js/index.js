//Slideshow
const slideshow = document.querySelector(".slideshow");
const images = slideshow.querySelectorAll("img");
let current = 0;

function nextImage()
{
    images[current].classList.remove("active");
    current = (current + 1) % images.length;
    images[current].classList.add("active");
}

function prevImage()
{
    images[current].classList.remove("active");
    current = (current - 1 + images.length) % images.length;
    images[current].classList.add("active");
}

setInterval(nextImage, 3000);


