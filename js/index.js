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

// Login
const profile_icon = document.getElementsByClassName("icon");
const container_login = document.getElementsByClassName("container_login");
const button_close = document.querySelectorAll("button[value='close']");

profile_icon[0].onclick = showLogin;
function showLogin() {
    container_login[0].style.display = "block";
    container_signup[0].style.display = "none";
    container_address[0].style.display = "none";
    document.body.style.opacity = "0.8";
}

function closeLogin() {
    container_login[0].style.display = "none";
    document.body.style.opacity = "1";
}

button_close[0].onclick = closeLogin;

// Login
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

    if (JSON.parse(localStorage.getItem("users")) != null && JSON.parse(localStorage.getItem("users")) != []) {
        for (let i = 0; i < (JSON.parse(localStorage.getItem("users"))).length; i++) {
            if (username.value == (JSON.parse(localStorage.getItem("users")))[i].username) {
                if ((JSON.parse(localStorage.getItem("users")))[i].isBlocked) {
                    username_error.innerText = "Tài khoản của bạn đã bị khóa.";
                    username_error.style.display = "block";
                    return false;
                }
                if (password.value == (JSON.parse(localStorage.getItem("users")))[i].password) {
                    closeLogin();
                    localStorage.setItem("userlogin", JSON.stringify((JSON.parse(localStorage.getItem("users")))[i]));
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

function logout(url) {
    localStorage.removeItem('userlogin');
    localStorage.removeItem('cart');
    location.href = url;
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
    closeAddress();
    document.body.style.opacity = "0.8";
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
sodienthoai.pattern = "0[0-9]{9}";
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
    else if(repass_signup.value!=pass_signup.value)
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
        const pattern = /^0\d{9}$/;
        if(!pattern.test(sodienthoai.value))
        {
            sodienthoai_error.innerText="Số điện thoại không đúng";
            sodienthoai_error.style.display = "block";
            flag = false;
            event.preventDefault();
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
        if(JSON.parse(localStorage.getItem("users"))!=null&&JSON.parse(localStorage.getItem("users"))!=[]){
            for(let i = 0 ; i<(JSON.parse(localStorage.getItem("users"))).length;i++)
            {
                if(ten_signup.value==(JSON.parse(localStorage.getItem("users")))[i].username)
                {
                    username_signup_error.innerText = "Tài khoản đã có người đăng kí";
                    username_signup_error.style.display = "block";
                    return false;
                }
            }
            var userArray2 = JSON.parse(localStorage.getItem("users"));
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

function initProduct() {
    const productData = localStorage.getItem('products'); 
    if (!productData) {
        const initProductData = [
    {productId:10000, brandid:'casio', img:'images/products/1.jpg', name:'Casio - Nam MTP-1374L-1AVDF', price:1129000}
    ,{productId:10001, brandid:'casio', img:'images/products/2.jpg', name:'Casio - Nam AE-1200WHD-1AVDF', price:1702000}
    ,{productId:10002, brandid:'casio', img:'images/products/3.jpg', name:'Casio - Nam MTP-1172L-1AVDF', price:1361000}
    ,{productId:10003, brandid:'citizen', img:'images/products/4.jpg', name:'Đồng Hồ Citizen - Nữ EU6060-55D', price:3391000}
    ,{productId:10004, brandid:'citizen', img:'images/products/5.jpg', name:'Đồng Hồ Citizen - Nữ EM0589-88X', price:7293000}
    ,{productId:10005, brandid:'casio', img:'images/products/6.jpg', name:'Đồng Hồ Casio - Nam MTP-E500D-1AVDF', price:3343000}
    ,{productId:10006, brandid:'casio', img:'images/products/7.jpg', name:'Đồng Hồ Casio - Nữ LQ-139L-4B2DF', price:752000}
    ,{productId:10007, brandid:'casio', img:'images/products/8.jpg', name:'Đồng Hồ Casio - Nam GBA-800UC-5ADR', price:4220000}
    ,{productId:10008, brandid:'casio', img:'images/products/9.jpg', name:'Đồng Hồ Casio - Nam GD-100GB-1DR', price:3997000}
    ,{productId:10009, brandid:'casio', img:'images/products/10.jpg', name:'Đồng Hồ Casio - Unisex AQ-230A-7DMQ', price:1425000}
    ,{productId:10010, brandid:'casio', img:'images/products/11.jpg', name:'Đồng Hồ Casio - Nữ LQ-142-1EDF', price:415000}
    ,{productId:10011, brandid:'casio', img:'images/products/12.jpg', name:'Đồng Hồ Casio - Nam AE-1002L-1BUDF', price:2302000}
    ,{productId:10012, brandid:'casio', img:'images/products/13.jpg', name:'Đồng Hồ Casio - Nam MTP-VT01L-1BUDF', price:1182000}
    ,{productId:10013, brandid:'casio', img:'images/products/14.jpg', name:'Đồng Hồ Casio - Nữ GMA-S2100-4ADR', price:3257000}
    ,{productId:10014, brandid:'rolex', img:'images/products/15.jpg', name:'Đồng Hồ Rolex - Nữ M278275-0010', price:883000000}
    ,{productId:10015, brandid:'rolex', img:'images/products/16.jpg', name:'Đồng Hồ Rolex - Nữ 126231-0016', price:275000000}
    ,{productId:10016, brandid:'rolex', img:'images/products/17.jpg', name:'Đồng Hồ Rolex - Unisex 126233', price:350000000}
    ,{productId:10017, brandid:'rolex', img:'images/products/18.jpg', name:'Đồng Hồ Rolex - Nam M126710BLNR-0003', price:450000000}
    ,{productId:10018, brandid:'rolex', img:'images/products/19.jpg', name:'Đồng Hồ Rolex - Nam 50535-0002', price:1027000000}
    ,{productId:10019, brandid:'rolex', img:'images/products/20.jpg', name:'Đồng Hồ Rolex - Nam M126231-0021', price:550000000}
    ,{productId:10020, brandid:'citizen', img:'images/products/21.jpg', name:'Đồng Hồ Citizen - Nam BM7565-80E', price:11440000}
    ,{productId:10021, brandid:'citizen', img:'images/products/22.jpg', name:'Đồng Hồ Citizen - Nữ EO1222-50P', price:9460000}
    ,{productId:10022, brandid:'citizen', img:'images/products/23.jpg', name:'Đồng Hồ Citizen - Nữ EM0816-88Y', price:7480000}
    ,{productId:10023, brandid:'citizen', img:'images/products/24.jpg', name:'Đồng Hồ Citizen - Nữ EM0813-86Y', price:8140000}
    ,{productId:10024, brandid:'citizen', img:'images/products/25.jpg', name:'Đồng Hồ Citizen - Nam AW1723-02E', price:9020000}
    ,{productId:10025, brandid:'citizen', img:'images/products/26.jpg', name:'Đồng Hồ Citizen - Nam AW1720-51E', price:10340000}
    ,{productId:10026, brandid:'timex', img:'images/products/27.jpg', name:'Đồng hồ Timex T257719J nữ', price:2325000}
    ,{productId:10027, brandid:'timex', img:'images/products/28.jpg', name:'Đồng hồ Timex TW4B017009J nam', price:2250000}
    ,{productId:10028, brandid:'timex', img:'images/products/29.jpg', name:'Đồng hồ Timex T264819J nam', price:2050000}
    ,{productId:10029, brandid:'timex', img:'images/products/30.jpg', name:'Đồng hồ Timex T218549J nữ', price:1975000}
    ,{productId:10030, brandid:'timex', img:'images/products/31.jpg', name:'Đồng hồ Timex T216939J nữ', price:1750000}
    ,{productId:10031, brandid:'timex', img:'images/products/32.jpg', name:'Đồng hồ Timex T2H3819J nữ', price:1980000}
    ,{productId:10032, brandid:'timex', img:'images/products/33.jpg', name:'Đồng hồ Timex T200719J nữ', price:2490000}
    ,{productId:10033, brandid:'timex', img:'images/products/34.jpg', name:'Đồng hồ Timex T2H3719J nữ', price:1570000}
    ,{productId:10034, brandid:'timex', img:'images/products/35.jpg', name:'Đồng hồ Timex T499059J nam', price:3070000}
    ,{productId:10035, brandid:'timex', img:'images/products/36.jpg', name:'Đồng hồ Timex Expedition T40011 nam', price:1600000}
    ];
    
    localStorage.setItem('products', JSON.stringify(initProductData));
    }
}

var brand = [
    { brandid: 'casio', brandname: "Casio" },
    { brandid: 'citizen', brandname: "Citizen" },
    { brandid: 'rolex', brandname: "Rolex" },
    { brandid: 'timex', brandname: "Timex" },
  ]

  function getProductData() {
    const productData = localStorage.getItem('products');
    return productData ? JSON.parse(productData) : [];
}

const sp1trang = 12;
var productArray = getProductData();
let tongsotrang = Math.ceil(productArray.length / sp1trang);

function hienthisanpham() {
    let s = "";
    for (let i = 0; i < brand.length; i++) {
        let a = `<a href="#"><li id="${brand[i].brandid}" onclick="hienthisanphamtheotheloai(this);">${brand[i].brandname}</li></a>`;
        s += a;
    }
    s = `<ul>${s}</ul>`;
    document.getElementsByClassName("botright")[0].innerHTML = s;
}

hienthisanpham();

// Phân trang sản phẩm theo thương hiệu
function trangphanloai(tranghientai, obj) {
    var productsByBrand = productArray.filter(product => product.brandid == obj.id);
    let s = "";
    for (let i = (tranghientai - 1) * sp1trang; i < tranghientai * sp1trang && i < productsByBrand.length; i++) {
        const product = productsByBrand[i];
        const imageSrc = product.img ? product.img : "https://via.placeholder.com/150";


        s += `<div class="item">
            <img id="myimg" src="${imageSrc}" width="30%" alt="Hình ảnh sản phẩm">
            <div>${product.name}</div>
            <div>${currency(product.price)}</div>
            <button type="button" class="btn" onclick="showProductInfo(${product.productId});">Chi tiết</button>
        </div>`;
    }
    document.getElementsByClassName("miditem")[0].innerHTML = s;
}

function hienthisanphamtheotheloai(obj) {
    let productsByBrand = productArray.filter(product => product.brandid == obj.id);
    let tongsotrang = Math.ceil(productsByBrand.length / sp1trang);
    let temp = "";
    for (let i = 1; i <= tongsotrang; i++) {
        temp += `<div class="currentPage" onclick="trangphanloai(${i}, ${obj.id})">${i}</div>`;
    }
    document.getElementsByClassName("midbottom")[0].innerHTML = temp;
    trangphanloai(1, obj);
}

function phantrang(tongsotrang) {
    let s = "";
    for (let i = 1; i <= tongsotrang; i++) {
        s += `<div class="currentPage" onclick="trang(${i})">${i}</div>`;
    }
    document.getElementsByClassName("midbottom")[0].innerHTML = s;
}

function trang(tranghientai) {
    let s = "";
    for (let i = (tranghientai - 1) * sp1trang; i < tranghientai * sp1trang && i < productArray.length; i++) {
        const product = productArray[i];
        const imageSrc = product.img ? product.img : "https://via.placeholder.com/150";

        s += `<div class="item">
            <img id="myimg" src="${imageSrc}" width="30%" alt="Hình ảnh sản phẩm">
            <div>${product.name}</div>
            <div>${currency(product.price)}</div>
            <button type="button" class="btn" onclick="showProductInfo(${product.productId});">Chi tiết</button>
        </div>`;
    }
    document.getElementsByClassName("miditem")[0].innerHTML = s;
}

function showProductInfo(productId) {
    const product = productArray.find(p => p.productId === productId);
    if (product) {
        alert(`Tên sản phẩm: ${product.name}\nGiá: ${currency(product.price)}\nHình ảnh: ${product.img}`);
    }
}

function currency(value) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

// Hàm khởi tạo để hiển thị sản phẩm khi trang được tải
window.onload = function() {
    initProduct();
    phantrang(tongsotrang);
    trang(1);
};

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
const brandFilter = document.getElementById("brandfilter");
const priceFrom = document.getElementById("pricefrom");
const priceTo = document.getElementById("priceto");
const midBottom = document.getElementsByClassName("midbottom")[0];

// Biến toàn cục
let resultSearchArray = [];

// Hàm tìm kiếm sản phẩm
const search = function () {
  // Lấy giá trị tìm kiếm
  const searchResult = searchInput.value.trim().toLowerCase();

  // Lọc sản phẩm theo tên
  resultSearchArray = productArray.filter(product =>
    product.name.toLowerCase().includes(searchResult)
  );

  // Lọc sản phẩm theo thương hiệu
  if (brandFilter.value !== "all") {
    resultSearchArray = resultSearchArray.filter(
      product => product.brandid === brandFilter.value
    );
  }

  // Lọc sản phẩm theo giá
  const minPrice = parseFloat(priceFrom.value) || 0; // Giá tối thiểu
  const maxPrice = parseFloat(priceTo.value) || Infinity; // Giá tối đa

  resultSearchArray = resultSearchArray.filter(
    product => product.price >= minPrice && product.price <= maxPrice
  );

  // Tính tổng số trang
  const totalPages = Math.ceil(resultSearchArray.length / sp1trang);
  let paginationHTML = "";

  // Tạo các nút phân trang
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<div class="currentPage" onclick="trangSearch(${i})">${i}</div>`;
  }

  // Gọi hàm hiển thị trang đầu tiên
  trangSearch(1);

  // Hiển thị phân trang
  midBottom.innerHTML = paginationHTML;
};

// sự kiện tìm kiếm
searchInput.addEventListener("input", search);
brandFilter.addEventListener("change", search);
priceFrom.addEventListener("input", search);
priceTo.addEventListener("input", search);

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

