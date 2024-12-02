window.onload = function () {
    cart();
}

function currency(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function cart()
{
    document.getElementById("cart").style.display = "block";
    document.getElementById("bill").style.display = "none";
    if(localStorage.getItem("cart") == null||localStorage.getItem("cart") == "[]")
    {
        var s='<tr><th>Giỏ hàng trống</th></tr>';
        document.getElementById("cart-items").innerHTML = s;
        document.getElementById("cart-items").style.borderBottom = "solid black 1px";
        document.getElementById("totalprice").innerHTML = "";
    }
    else
    {
        var cart = JSON.parse(localStorage.getItem("cart"));
		var s='<tr><th></th><th>Sản phẩm</th><th>Giá</th><th>Số lượng</th><th>Tổng</th><th></th></tr>';
		var totalprice=0;
		for (var i = 0; i < cart.length; i++){
			s+=  '<tr>'+
					'<td><img src="'+cart[i].img+'" width="100px"></td>'+
					'<td><div>'+cart[i].name+'</div>'+
					'</td>'+
					'<td>'+currency(cart[i].price)+'</td>'+
					'<td>'+
						'<button onclick="decrement2('+cart[i].productId+')">-</button>'+
						'<input id="quantity" type="text" disabled value="'+cart[i].quantity+'" onchange="updateCart(this.value,'+cart[i].productId+')">'+
						'<button onclick="increment2('+cart[i].productId+')">+</button>'+
					'</td>'+
					'<td>'+currency(cart[i].price*cart[i].quantity)+'</td>'+
					'<td><button onclick="deletecartitem('+cart[i].productId+')">&times;</button></td>'+
				'</tr>';
			totalprice+=cart[i].price*cart[i].quantity;
		}
        document.getElementById("cart-items").innerHTML = s;
        document.getElementById("cart-items").style.borderBottom = "solid black 1px";
    }
    document.getElementById("totalprice").innerHTML = currency(totalprice);
}

function deletecartitem(productid)
{
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    for(var i = 0;i<cartArray.length;i++){
        if(cartArray[i].productId == productid){
            cartArray.splice(i,1);
        }
    }
    localStorage.setItem("cart",JSON.stringify(cartArray));
    cart();
}

function updateCart(quantity,productid){
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    for(var i = 0;i<cartArray.length;i++){
        if(cartArray[i].productId == productid){
            cartArray[i].quantity = quantity;
            cartArray[i].totalprice = cartArray[i].price * cartArray[i].quantity;
        }
    }
    localStorage.setItem("cart",JSON.stringify(cartArray));
    cart();
}

function increment2(productid)
{
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    for(var i = 0;i<cartArray.length;i++){
        if(cartArray[i].productId == productid){
            cartArray[i].quantity++;
        }
    }
    localStorage.setItem("cart",JSON.stringify(cartArray));
    cart();
}

function decrement2(productid)
{
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    for(var i = 0;i<cartArray.length;i++){
        if(cartArray[i].productId == productid){
            if(cartArray[i].quantity > 1){
                cartArray[i].quantity--;
            }
        }
    }
    localStorage.setItem("cart",JSON.stringify(cartArray));
    cart();
}

function pay()
{
    if(document.getElementById("card").checked)
    {
        var s="";
        s+='<label for="cardnumber">Số thẻ:</label>'+
        '<input type="text" id="cardnumber" placeholder="0000 0000 0000 0000" maxlength="19">'+
        '<label for="expireddate">Ngày hết hạn:</label>'+
        '<input type="text" id="expireddate" placeholder="MM/YY">'+
        '<label for="cvv">CVV:</label>'+
        '<input type="text" id="cvv" placeholder="CVV" maxlength="3">';
    }
    else if(document.getElementById("cash").checked)
    {
        var s="";
    }
    document.getElementsByClassName("paymentinfo")[0].innerHTML = s;
}

function checkboxaddress()
{
    var user = JSON.parse(localStorage.getItem("userlogin"));
    var diachi = {};
    diachi.address = user.address.address;
    diachi.city = user.address.city;
    diachi.district = user.address.district;

    if(document.getElementById("checkbox").checked)
    {
        document.getElementById("address").value = diachi.address;
        document.getElementById("city").value = diachi.city;
        document.getElementById("district").value = diachi.district;
    }
}



function tieptuc()
{
    var user = JSON.parse(localStorage.getItem("userlogin"));
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    if(user==null)
    {
        alert("Bạn chưa đăng nhập");
        return false;
    }
    
    if(cartArray==null||cartArray.length==0)
    {
        alert("Bạn chưa chọn sản phẩm");
        return false;
    }

    checkout();
}

function checkout(event)
{
    if(event)
    {
        event.preventDefault();
    }
    document.getElementsByClassName("container_payment")[0].style.display = "block";
    
    if(document.getElementById("address").value==""||document.getElementById("city").value=="city"||document.getElementById("district").value=="district")
    {
        document.getElementsByClassName("select-error")[0].style.display = "block";
        return;
    }
    else if(document.getElementById("card").checked==false&&document.getElementById("cash").checked==false)
    {
        document.getElementsByClassName("select-error")[0].style.display = "block";
        return;
    }

    if(document.getElementById("card").checked)
    {
        var pay ={};
        pay.method = "card";
        pay.cardnumber = document.getElementById("cardnumber").value;
        pay.expireddate = document.getElementById("expireddate").value;
        pay.cvv = document.getElementById("cvv").value;
        if(pay.cardnumber==""||pay.expireddate==""||pay.cvv=="")
        {
            document.getElementsByClassName("select-error")[0].style.display = "block";
            return;
        }
    }
    else if(document.getElementById("cash").checked)
    {
        var pay ={};
        pay.method = "cash";
    }

    var address ={};
    address.address = document.getElementById("address").value;
    address.city = document.getElementById("city").value;
    address.district = document.getElementById("district").value;


    var cartArray = JSON.parse(localStorage.getItem("cart"));
    var info ='';
    var totalprice = 0;
    var user = JSON.parse(localStorage.getItem("userlogin"));

    for(let i = 0;i<cartArray.length;i++)
    {
        info+=cartArray[i].quantity+' x '+cartArray[i].name+'<br><br>';
        totalprice+=cartArray[i].quantity*cartArray[i].price;
    }

    var user = JSON.parse(localStorage.getItem("userlogin"));

    var date = new Date();
    const month = date.getMonth() +1;
    var d = date.getDate()+'-'+month+'-'+date.getFullYear();

    if(localStorage.getItem("ArrayBill")==null)
    {
        var ArrayBill = [];
        var bill = {id:0, username: user.username, info: info, totalprice:totalprice, date:d, pay:pay, address:address ,status:"Chưa xử lý"};
        ArrayBill.unshift(bill);
        localStorage.setItem("ArrayBill",JSON.stringify(ArrayBill));
    }
    else
    {
        var ArrayBill = JSON.parse(localStorage.getItem("ArrayBill"));
        var bill = {id:ArrayBill.length, username: user.username, info: info, totalprice:totalprice, date:d, pay:pay, address:address ,status:"Chưa xử lý"};
        ArrayBill.unshift(bill);
        localStorage.setItem("ArrayBill",JSON.stringify(ArrayBill));
    }
    document.getElementsByClassName("container_payment")[0].style.display = "none";
    localStorage.removeItem("cart");
    cart();

}


function showbill()
{
    document.getElementById("bill").style.display = "block";
    document.getElementById("cart").style.display = "none";
    var bill = JSON.parse(localStorage.getItem("ArrayBill"));
    let count = 0;

    if(bill == null)
    {
        var s='<tr><th>Bạn vẫn chưa mua hàng.</th></tr>';
        document.getElementById("bill-items").innerHTML = s;      
    }
    else
    {    
        var s='<tr><th>Sản phẩm</th><th>Tổng tiền</th><th>Ngày đặt</th><th>Địa chỉ</th><th>Tình trạng</th></tr>';

        for(let i=0;i<bill.length;i++)
            {
                if(bill[i].username == JSON.parse(localStorage.getItem("userlogin")).username) {
                  s+='<tr>'+
                    '<td><div>'+bill[i].info+'</div></td>'+
                    '<td>'+currency(bill[i].totalprice)+'</td>'+
                    '<td>'+bill[i].date+'</td>'+
                    '<td>'+bill[i].address.address+', '+bill[i].address.city+', '+bill[i].address.district+'</td>'+
                    '<td>'+bill[i].status+'</td>'+
                    '</tr>';
                    count++;
                }
            }
        if(count == 0)
        {
            s='<tr><th>Bạn vẫn chưa mua hàng.</th></tr>';
        }
        document.getElementById("bill-items").innerHTML = s;
    }
}

function closepayment()
{
    document.getElementsByClassName("container_payment")[0].style.display = "none";
}

