initProduct();
checkLogin2();

function currency(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

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


//UserArray


const userArray = JSON.parse(localStorage.getItem("users"));
//Login
const profile_icon = document.getElementsByClassName("icon");
const container_login = document.getElementsByClassName("container_login");
const button_close = document.querySelectorAll("button[value='close']");

profile_icon[0].onclick = showLogin;
function showLogin()
{

    container_login[0].style.display = "block";
    container_signup[0].style.display = "none";
    container_address[0].style.display = "none";
    document.body.style.opacity = "0.8";
}

function closeLogin()
{
    container_login[0].style.display = "none";
    document.body.style.opacity = "1";
}

button_close[0].onclick = closeLogin;

//Login
const username = document.getElementById("ten_login");
const password = document.getElementById("pass_login");
const username_error = document.querySelector(".username-error");
const password_error = document.querySelector(".password-error");
const submit_button = document.getElementById("submit_login");

submit_button.addEventListener("click", checkLogin);
function checkLogin(event) {
    event.preventDefault();
  
    if (username.value == "" || password.value == "") {
      username_error.style.display = "block";
      password_error.style.display = "block";
      return;
    }
  
    if (username.value != "") {
      username_error.style.display = "none";
    }
  
    if (password.value != "") {
      password_error.style.display = "none";
    }
    
    if(userArray!=null&&userArray!=[])
    {
        for (let i = 0; i < userArray.length; i++) {
        if (username.value == userArray[i].username) {
            if (password.value == userArray[i].password) {
            closeLogin();
            localStorage.setItem("userlogin", JSON.stringify(userArray[i]));
            window.location.reload();
            alert("Đăng nhập thành công!");
            return true;
            }
        }
        }
        username_error.innerText = "Sai thông tin đăng nhập.";
        username_error.style.display = "block";
    }
}

function logout(url){
	localStorage.removeItem('userlogin');
	localStorage.removeItem('cart');
	location.href=url;
}

function checkLogin2()
{
    const isLoggedIn = localStorage.getItem('userlogin');
    var s="";
    if (isLoggedIn||isLoggedIn==[]) {
        s='<li><button onclick="logout(\'index.html\');">Đăng xuất</button></li>'+
            '<li>'+JSON.parse(isLoggedIn).fullname+'</li>'+
            '<li><a href="cart.html"><img src="images/icons/cart-shopping-solid.svg" alt="" class="icon"></a></li>';
    }
    else{
        s='<li><a href="#"><img src="images/icons/user-solid.svg" alt="" class="icon"></a></li>'+
            '<li><a href="cart.html"><img src="images/icons/cart-shopping-solid.svg" alt="" class="icon"></a></li>';
    }
    document.getElementsByClassName("topright")[0].innerHTML = s;    
}


//Signup
const button_signup = document.querySelector(".toSignup a");
const container_signup = document.getElementsByClassName("container_signup");
const button_next = document.getElementById("next");
const container_address = document.getElementsByClassName("container_address");

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
button_next.onclick = function showAddress()
{
    container_signup[0].style.display = "none";
    container_address[0].style.display = "block";
    document.body.style.opacity = "0.8";
}

const button_prev = document.getElementById("prev");

function closeAddress()
{
    container_address[0].style.display = "none";
    document.body.style.opacity = "1";
}
button_prev.addEventListener("click" , function toSignup()
{
    container_signup[0].style.display = "block";
    container_login[0].style.display = "none";
    document.body.style.opacity = "0.8";
    closeAddress();
});

const button_login = document.querySelector(".toLogin a");

button_login.addEventListener("click" , function toLogin()
{
    container_signup[0].style.display = "none";
    container_login[0].style.display = "block";
    document.body.style.opacity = "0.8";
});
//Signup-Error
const hovaten = document.getElementById("hovaten");
const email = document.getElementById("email");
const sodienthoai = document.getElementById("sodienthoai");
const ten_signup = document.getElementById("ten_signup");
const pass_signup = document.getElementById("pass_signup");
const repass_signup = document.getElementById("repass_signup");
const hovaten_error = document.querySelector(".hovaten-error");
const email_error = document.querySelector(".email-error");
const sodienthoai_error = document.querySelector(".sodienthoai-error");
const username_signup_error = document.querySelector(".username-signup-error");
const pass_signup_error = document.querySelector(".pass-signup-error");
const repass_signup_error = document.querySelector(".repass-error");
const submit_signup = document.getElementById("submit_signup");
const address = document.getElementById("address");
const address_error = document.querySelector(".address-error");
const city = document.getElementById("city");
const district = document.getElementById("district");
const select_error = document.querySelector(".select-error");
var flag = true;
function checkSignup()
{
    if(hovaten.value==""||email.value==""||sodienthoai.value==""||ten_signup.value==""||pass_signup.value==""||repass_signup.value==""||address.value==""||city.value=="city"||district.value=="district")
    {
        event.preventDefault();
    }
    else if((sodienthoai.value.length!=10||sodienthoai.pattern!="0[0-9]{9}")||repass_signup.value!=pass_signup.value)
    {
        event.preventDefault();
    }
    if(hovaten.value=="")
    {
        hovaten_error.style.display = "block";
        flag = false;
    }

    if(hovaten.value!="")
    {
        hovaten_error.style.display = "none";
    }
    
    if(email.value=="")
    {
        email_error.style.display = "block";
        flag = false;
    }

    if(email.value!="")
    {
        email_error.style.display = "none";
    }

    if(sodienthoai.value=="")
    {
        sodienthoai_error.innerHTML="Bạn chưa nhập số điện thoại";
        sodienthoai_error.style.display = "block";
        flag = false;
    }

    if(address.value=="")
    {
        address_error.style.display = "block";
        flag = false;
    }

    if(address.value!="")
    {
        address_error.style.display = "none";
    }

    if(city.value=="city"||district.value=="district")
    {
        select_error.style.display = "block";
        flag = false;
    }

    if(city.value!="city"&&district.value!="district")
    {
        select_error.style.display = "none";
    }

    if(sodienthoai.value!="")
    {
        if(sodienthoai.value.length!=10&&sodienthoai.pattern!="0[0-9]{9}")
        {
            sodienthoai_error.innerText="Số điện thoại không đúng";
            sodienthoai_error.style.display = "block";
            flag = false;
        }
        else
        {
            sodienthoai_error.style.display = "none";
            flag = true;
        }
    }

    if(ten_signup.value=="")
    {
        username_signup_error.style.display = "block";
        flag= false;
    }

    if(ten_signup.value!="")
    {
        username_signup_error.style.display = "none";
    }

    if(pass_signup.value=="")
    {
        pass_signup_error.innerText="Bạn chưa nhập mật khẩu";
        pass_signup_error.style.display = "block";
        flag = false;
    }
    if(repass_signup.value==""||repass_signup.value!=pass_signup.value)
    {
        repass_signup_error.style.display = "block";
        flag = false;
    }
    
    if(pass_signup.value!="")
    {
        if(pass_signup.value.length<6)
        {
            pass_signup_error.innerText ="Mật khẩu ít nhất có 6 ky tự";
            pass_signup_error.style.display = "block";
            flag = false;
        }
        else{
            pass_signup_error.style.display = "none";
        }
    }

    if(repass_signup.value!=""&&pass_signup.value.length>6&&repass_signup.value==pass_signup.value)
    {
        repass_signup_error.style.display = "none";
        flag = true;
    }

    if(flag==false)
    {
        event.preventDefault();
    }
    else
    {
        var today = new Date();
        var datesignup = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var address_signup = {};
        address_signup.address = address.value;
        address_signup.city = city.value;
        address_signup.district = district.value;
        var user = {username: ten_signup.value, password: pass_signup.value, fullname: hovaten.value, address: address_signup, email: email.value, phone: sodienthoai.value , datesignup: datesignup};
        if(userArray!=null&&userArray!=[]){
            for(let i = 0 ; i<userArray.length;i++)
            {
                if(ten_signup.value==userArray[i].username)
                {
                    username_signup_error.innerText = "Tài khoản đã có người đăng kí";
                    username_signup_error.style.display = "block";
                    return false;
                }
            }
            var userArray2 = userArray;
            userArray2.push(user);
            localStorage.setItem('users', JSON.stringify(userArray2));
            alert("Đăng ký thành công!");
            showLogin();
        }
        else
        {
            var userArray2 = [user];
            localStorage.setItem('users', JSON.stringify(userArray2));
            alert("Đăng ký thành công!");
            showLogin();
        }
    }
}
submit_signup.addEventListener("click", checkSignup);

//Products

function initProduct()
{
    const productData = localStorage.getItem('productData'); 
    if(!productData)
    {
        const initProductData =[
    {productId:10000, brandid:'casio', img:'images/products/1.jpg', name:'Casio - Nam MTP-1374L-1AVDF', price:1129000}
    ,{productId:10001, brandid:'casio', img:'images/products/2.jpg', name:'Casio - Nam AE-1200WHD-1AVDF', price:1702000}
    ,{productId:10002, brandid:'casio', img:'images/products/3.jpg', name:'Casio - Nam MTP-1172L-1AVDF', price:1361000}
    ,{productId:10003, brandid:'casio', img:'images/products/2.jpg', name:'Casio - Nam AE-1208WHD-1AVDF', price:1908000}
    ,{productId:10004, brandid:'casio', img:'images/products/3.jpg', name:'Casio - Nam MTP-1272L-1AVDF', price:1165000}
    ,{productId:10005, brandid:'citizen', img:'images/products/4.jpg', name:'Đồng Hồ Citizen - Nữ EU6060-55D', price:3391000}
    ,{productId:10006, brandid:'citizen', img:'images/products/5.jpg', name:'Đồng Hồ Citizen - Nữ EM0589-88X', price:7293000}
    ];
    
    localStorage.setItem('productData', JSON.stringify(initProductData));
    }
}

var brand = [
    { brandid: 'casio', brandname: "Casio" },
    { brandid: 'citizen', brandname: "Citizen" },
    { brandid: 'rolex', brandname: "Rolex" },
    { brandid: 'timex', brandname: "Timex" },
  ]

function getProductData() {
    const productData = localStorage.getItem('productData');
    return JSON.parse(productData);
  }
const sp1trang = 12;
var productArray = getProductData();
let tongsotrang = Math.ceil(productArray.length/sp1trang);

function hienthisanpham() {
  
    var s = "";
    for (i = 0; i < brand.length; i++) {
      var a = '<a href="#"><li id="' + brand[i].brandid + '" onclick="hienthisanphamtheotheloai(this);">' + brand[i].brandname + '</li></a>';
      s += a;
    }
  
    s = '<ul>' + s + '</ul>';
    document.getElementsByClassName("botright")[0].innerHTML = s;
}

hienthisanpham();

//Phan trang
function trangphanloai(tranghientai, obj) {
    var productsByBrand = productArray.filter(product => product.brandid == obj.id);
    var s = "";
    for (let i = (tranghientai - 1) * sp1trang; i < tranghientai * sp1trang && i < productsByBrand.length; i++) {
      s += `
        <div class="item">
          <img id="myimg" src="${productsByBrand[i].img}" width="30%">
          <div>${productsByBrand[i].name}</div>
          <div>${currency(productsByBrand[i].price)}</div>
          <button type="button" class="btn" onclick="showProductInfo(${productsByBrand[i].productId});">Chi tiết</button>
        </div>`;
    }
    document.getElementsByClassName("miditem")[0].innerHTML = s;
  }

  function hienthisanphamtheotheloai(obj) {
    var tongsosp = 0;
    for (i = 0; i < productArray.length; i++) {
      if (productArray[i].brandid == obj.id) {
        tongsosp++;
      }
    }
    let tongsotrang = Math.ceil(tongsosp / sp1trang);
    var temp="";
    for(let i=1;i<=tongsotrang;i++)
    {
        temp+=`<div class="currentPage" onclick="trangphanloai(`+i+`,${obj.id})">`+i+`</div>`
    }
    document.getElementsByClassName("midbottom")[0].innerHTML = temp;
    trangphanloai(1,obj);
}

function phantrang(tongsotrang)
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
            <img id="myimg" src="${productArray[i].img}"  width="30%">
            <div>${productArray[i].name}</div>
            <div>${currency(productArray[i].price)}</div>
            <button type="button" class="btn" onclick="showProductInfo(${productArray[i].productId});">Chi tiết</button>
            </div>`;
            
    }
    document.getElementsByClassName("miditem")[0].innerHTML = s;
}

phantrang(tongsotrang);
trang(1);


//products detail
const quantityup= document.getElementById("quanup");
const quantitydown= document.getElementById("quandown");
const quantity = document.getElementById("quan");

let increment = function()
{
    quantity.value = parseInt(quantity.value)+1;
};

let decrement = function()
{
    if(quantity.value>1){
        quantity.value = parseInt(quantity.value)-1;
    }
};

function showProductInfo(productid) {
    quantityup.addEventListener("click",increment);
    quantitydown.addEventListener("click",decrement);
    
    const buttontoCart = document.querySelector("button[value='addtocart']");
    document.getElementsByClassName("product-container")[0].style.display = "block";
    document.body.style.opacity = "0.8";
    for(let i = 0;i<productArray.length;i++)
    {
        if(productArray[i].productId == productid)
        {
            document.getElementById("productimg").src = productArray[i].img;
            document.getElementById("productname").innerHTML = productArray[i].name;
            document.getElementById("productprice").innerHTML = currency(productArray[i].price);
            document.getElementById("quan").value = 1;
        }
    }

    document.querySelector("button[value='closeproduct']").onclick = function closeProductInfo()
    {
        document.getElementsByClassName("product-container")[0].style.display = "none";
        document.body.style.opacity = "1";
        quantityup.removeEventListener("click",increment);
        quantitydown.removeEventListener("click",decrement);
        return;
    }

    buttontoCart.setAttribute("onclick" , "addtocart("+productid+")");
}

function closeProductInfo() {
    document.getElementsByClassName("product-container")[0].style.display = "none";
    quantityup.removeEventListener("click",increment);
    quantitydown.removeEventListener("click",decrement);
    document.body.style.opacity = "1";
}
function addtocart(productid)
{
    var product;
    var quantity = document.getElementById("quan");
    for(let i = 0;i<productArray.length;i++)
    {
        if(productArray[i].productId == productid)
        {
            product = productArray[i];
        }
    }

    if(localStorage.getItem("cart") == null)
    {
        var cart = [];
        product.quantity = quantity.value;
        product.totalprice = product.price * product.quantity;
        cart.push(product);
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    else
    {
        var cart = JSON.parse(localStorage.getItem("cart"));
        product.quantity = quantity.value;
        product.totalprice = product.price * product.quantity;
        var check = false;
        for(var i = 0;i<cart.length;i++)
        {
            if(product.productId == cart[i].productId)
            {
                cart[i].quantity = parseInt(cart[i].quantity) + parseInt(product.quantity);
                cart[i].totalprice = cart[i].price * cart[i].quantity;
                check = true;
                break;
            }
        }
        if(check == false)
        {
            cart.push(product);
        }
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    closeProductInfo();
}


//search
const searchInput = document.getElementById("search-input");
let resultSearchArray = [];

const search = function() {
  const searchResult = searchInput.value.toLowerCase();
  resultSearchArray = productArray.filter(product => product.name.toLowerCase().includes(searchResult));
  const tongsotrang = Math.ceil(resultSearchArray.length / sp1trang);
  let temp ="";
  
  for (let i = 1; i <= tongsotrang; i++) {
    temp+=`<div class="currentPage" onclick="trangSearch(${i})">${i}</div>`;
  }
  trangSearch(1);
  document.getElementsByClassName("midbottom")[0].innerHTML = temp;
};

searchInput.addEventListener("input", search);

//Trang tim kiem
function trangSearch(tranghientai) {
  const start = (tranghientai - 1) * sp1trang;
  const end = start + sp1trang;
  const productsToRender = resultSearchArray.slice(start, end);
  let s = "";
  for (let i = 0; i < productsToRender.length; i++) {
    s += `<div class="item">
            <img id="myimg" src="${productsToRender[i].img}" width="30%">
            <div>${productsToRender[i].name}</div>
            <div>${currency(productsToRender[i].price)}</div>
            <button type="button" class="btn" onclick="showProductInfo(${productsToRender[i].productId});">Chi tiết</button>
          </div>`;
  }
  document.getElementsByClassName("miditem")[0].innerHTML = s;
}

