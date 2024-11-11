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

function showLogin()
{

    container_login[0].style.display = "block";
    document.body.style.opacity = "0.8";
}

profile_icon[0].onclick = showLogin;


function closeLogin()
{
    container_login[0].style.display = "none";
    document.body.style.opacity = "1";
}

button_close[0].onclick = closeLogin;

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
const repass_signup_error = document.querySelector(".repass-error");
const submit_signup = document.getElementById("submit_signup");
const button_login = document.querySelector(".toLogin a");

function checkSignup()
{
    if(hovaten.value==""||diachi.value==""||sodienthoai.value==""||ten_signup.value==""||pass_signup.value==""||repass_signup.value=="")
    {
        event.preventDefault();
    }
    else if((sodienthoai.value.length!=10&&sodienthoai.pattern!="0[0-9]{9}")&&repass_signup.value!=pass_signup.value)
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

    if(repass_signup.value!=pass_signup.value)
    {
        repass_signup_error.style.display = "block";
    }
}

submit_signup.addEventListener("click" , checkSignup);


button_login.addEventListener("click" , function toLogin()
{
    container_signup[0].style.display = "none";
    container_login[0].style.display = "block";
    document.body.style.opacity = "0.8";
});


//Products

var productArray = [
    {productId:10000, brandid:'casio', img:'images/products/1.jpg', name:'Casio - Nam MTP-1374L-1AVDF', price:1129000}
    ,{productId:10001, brandid:'casio', img:'images/products/2.jpg', name:'Casio - Nam AE-1200WHD-1AVDF', price:1702000}
    ,{productId:10002, brandid:'casio', img:'images/products/3.jpg', name:'Casio - Nam MTP-1172L-1AVDF', price:1361000},
    {productId:10003, brandid:'casio', img:'images/products/2.jpg', name:'Casio - Nam AE-1208WHD-1AVDF', price:1908000}
    ,{productId:10004, brandid:'casio', img:'images/products/3.jpg', name:'Casio - Nam MTP-1272L-1AVDF', price:1165000},

]

var brand = [
    { brandid: 'casio', brandname: "Casio" },
    { brandid: 'citizen', brandname: "Citizen" },
    { brandid: 'rolex', brandname: "Rolex" },
    { brandid: 'timex', brandname: "Timex" },
  ]

function hienthisanpham() {
  
    var s = "";
    for (i = 0; i < brand.length; i++) {
      var a = '<a href="#"><li id="' + brand[i].brandid + '" onclick="hienthisanphamtheotheloai(this);">' + brand[i].brandname + '</li></a>';
      s += a;
    }
  
    s = '<ul>' + s + '</ul>';
    document.getElementsByClassName("botright")[0].innerHTML = s;
  }
  
  function hienthisanphamtheotheloai(obj) {
    var s = "";
    document.getElementsByClassName("miditem")[0].innerHTML = ""; 
    for (i = 0; i < productArray.length; i++) {
      if (productArray[i].brandid == obj.id) {
        s += `<div class="item">
            <img id="myimg" src="${productArray[i].img}"  width="100%">
            <div>Tên SP: "${productArray[i].name}"</div>
            <div>Giá SP: "${productArray[i].price}"</div>
            <div>
              <span>Mua</span>
              <span>Chi tiết</span>
              <span onclick="change();">Thực hiện</span>
            </div>
          </div>`;
      }
    }
  
    document.getElementsByClassName("miditem")[0].innerHTML = s;
}

document.addEventListener("DOMContentLoaded", function() {
    hienthisanpham();
});

//Phan Trang
const sp1trang = 4;
let tongsotrang = Math.ceil(productArray.length/sp1trang);

function phantrang()
{
    var s = "";
    for(i=1;i<=tongsotrang;i++)
    {
        s+='<div class="currentPage" onclick="trang('+i+')">'+i+'</div>';
    }
    document.getElementsByClassName("midbottom")[0].innerHTML = s;
}

function trang(tranghientai)
{
    var s="";
    for(i=(tranghientai-1)*sp1trang;i<tranghientai*sp1trang&&i<productArray.length;i++)
    {
        s+=`<div class="item">
        <img id="myimg" src="${productArray[i].img}"  width="100%">
        <div>Tên SP: "${productArray[i].name}"</div>
        <div>Giá SP: "${productArray[i].price}"</div>
        <div>
          <span>Mua</span>
          <span>Chi tiết</span>
          <span onclick="change();">Thực hiện</span>
        </div>
      </div>`;
    }
    document.getElementsByClassName("miditem")[0].innerHTML = s;
}

document.addEventListener("DOMContentLoaded", function() {
    phantrang();
});
