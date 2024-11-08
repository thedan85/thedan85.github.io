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


//Login
const profile_icon = document.getElementsByClassName("icon");
const container_login = document.getElementsByClassName("container_login");
const button_close = document.querySelectorAll("button[value='close']");

profile_icon[0].onclick =function showLogin()
{
    container_login[0].style.display = "block";
    document.body.style.opacity = "0.8";
}

button_close[0].onclick = function closeLogin()
{
    container_login[0].style.display = "none";
    document.body.style.opacity = "1";
}

//Login-Error
const username = document.getElementById("ten_login");
const password = document.getElementById("pass_login");
const username_error = document.querySelector(".username-error");
const password_error = document.querySelector(".password-error");
const submit_button = document.getElementById("submit_login");

function checkLogin()
{
    if(username.value==""||password.value=="")
    {
        event.preventDefault();
    }
    if(username.value=="")
    {
        username_error.style.display = "block";
    }

    if(username.value!="")
    {
        username_error.style.display = "none";
    }
    
    if(password.value=="")
    {
        password_error.style.display = "block";
    }

    if(password.value!="")
    {
        password_error.style.display = "none";
    }
}

submit_button.addEventListener("click" , checkLogin);

