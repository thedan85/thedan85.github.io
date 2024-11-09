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

//Signup
const button_signup = document.querySelector(".toSignup a");
const container_signup = document.getElementsByClassName("container_signup");

button_signup.onclick =function showSignup()
{
    container_login[0].style.display = "none";
    container_signup[0].style.display = "block";
    document.body.style.opacity = "0.8";
}
button_close[1].onclick = function closeSignup()
{
    container_signup[0].style.display = "none";
    document.body.style.opacity = "1";
}

//Signup-Error
const hovaten = document.getElementById("hovaten");
const diachi = document.getElementById("diachi");
const sodienthoai = document.getElementById("sodienthoai");
const ten_signup = document.getElementById("ten_signup");
const pass_signup = document.getElementById("pass_signup");
const repass_signup = document.getElementById("repass_signup");
const hovaten_error = document.querySelector(".hovaten-error");
const diachi_error = document.querySelector(".diachi-error");
const sodienthoai_error = document.querySelector(".sodienthoai-error");
const username_signup_error = document.querySelector(".username-signup-error");
const pass_signup_error = document.querySelector(".pass-signup-error");
const repass_signup_error = document.querySelector(".repass-signup-error");
const submit_signup = document.getElementById("submit_signup");

function checkSignup()
{
    if(hovaten.value==""||diachi.value==""||sodienthoai.value==""||ten_signup.value==""||pass_signup.value==""||repass_signup.value=="")
    {
        event.preventDefault();
    }
    if(hovaten.value=="")
    {
        hovaten_error.style.display = "block";
    }

    if(hovaten.value!="")
    {
        hovaten_error.style.display = "none";
    }
    
    if(diachi.value=="")
    {
        diachi_error.style.display = "block";
    }

    if(diachi.value!="")
    {
        diachi_error.style.display = "none";
    }

    if(sodienthoai.value=="")
    {
        sodienthoai_error.innerHTML="Bạn chưa nhập số điện thoại";
        sodienthoai_error.style.display = "block";
    }

    if(sodienthoai.value!="")
    {
        if(sodienthoai.value.length!=10&&sodienthoai.pattern!="0[0-9]{9}")
        {
            sodienthoai_error.innerText="Số điện thoại không đúng";
            sodienthoai_error.style.display = "block";
        }
        else
        {
            sodienthoai_error.style.display = "none";
        }
    }

    if(ten_signup.value=="")
    {
        username_signup_error.style.display = "block";
    }

    if(ten_signup.value!="")
    {
        username_signup_error.style.display = "none";
    }

    if(pass_signup.value=="")
    {
        pass_signup_error.innerText="Bạn chưa nhập mật khẩu";
        pass_signup_error.style.display = "block";
    }

    if(pass_signup.value!="")
    {
        if(pass_signup.value.length<6)
        {
            pass_signup_error.innerText ="Mật khẩu ít nhất có 6 ky tự";
            pass_signup_error.style.display = "block";
        }
        else{
            pass_signup_error.style.display = "none";
        }
    }
    if(repass_signup.value=="")
    {
        repass_signup_error.style.display = "block";
    }

    if(repass_signup_error.value!=""&&pass_signup.value!=repass_signup_error.value)
    {
        repass_signup_error.style.display = "block";
    }
}

submit_signup.addEventListener("click" , checkSignup);