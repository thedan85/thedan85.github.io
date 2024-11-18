cart();
function currency(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
function cart()
{
    if(localStorage.getItem("cart") == null||localStorage.getItem("cart") == "[]")
    {
        var s='<tr><th>Giỏ hàng trống</th></tr>';
        document.getElementById("cart-items").innerHTML = s;
        document.getElementById("cart-items").style.borderBottom = "solid black 1px";
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
						'<button onClick="decrement2('+cart[i].productId+')">-</button>'+
						'<input id="quantity" type="text" disabled value="'+cart[i].quantity+'" onchange="updateCart(this.value,'+cart[i].productId+')">'+
						'<button onClick="increment2('+cart[i].productId+')">+</button>'+
					'</td>'+
					'<td>'+currency(cart[i].price*cart[i].quantity)+'</td>'+
					'<td><button onClick="deletecartitem('+cart[i].productId+')">&times;</button></td>'+
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

function checkout()
{
    if(localStorage.getItem("userlogin")==null)
    {
        alert("Bạn chưa đăng nhập");
        return false;
    }

    if(localStorage.getItem("cart") == null||localStorage.getItem("cart") == "[]")
    {
        return false;
    }

    var cartArray = JSON.parse(localStorage.getItem("cart"));

    let info;
    for(let i = 0;i<cartArray.length;i++)
    {
        info+=cartArray[i];
        totalprice+=cartArray[i].totalprice;
    }

    var user = JSON.parse(localStorage.getItem("userlogin"));

    var date = new Date();
    var d = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();

    if(localStorage.getItem("ArrayBill")==null)
    {
        var ArrayBill = [];
        var bill;
        bill.id = ArrayBill.length;
        bill.username = user.username;
        bill.info = info;
        bill.totalprice = totalprice;
        bill.date = d;
        bill.paid = false;
        ArrayBill.push(bill);
        localStorage.setItem("ArrayBill",JSON.stringify(ArrayBill));
    }
    else
    {
        var ArrayBill = JSON.parse(localStorage.getItem("ArrayBill"));
        var bill;
        bill.id = ArrayBill.length;
        bill.username = user.username;
        bill.info = info;
        bill.totalprice = totalprice;
        bill.date = d;
        bill.paid = false;
        ArrayBill.push(bill);
        localStorage.setItem("ArrayBill",JSON.stringify(ArrayBill));
    }
    localStorage.removeItem("cart");
    cart();
    showbill();

}

function showbill()
{
    var ArrayBill = JSON.parse("ArrayBill",JSON.stringify(ArrayBill));
    
    if(localStorage.getItem("ArrayBill") == null)
    {
        document.getElementById("bill").style.display = "none";
    }
    else
    {
        var s="";
        var info ="";
        for(let i=0;i<ArrayBill.length;i++)
        {
            info = ArrayBill[i].info.quantity+' x '+ArrayBill[i].info.name;
            s+='<div class="bill-container">'+
            '<div class="bill-product">'+info+'</div>'+
            '<div class="bill-price">'+currency(ArrayBill[i].totalprice)+'</div>'+
            '<div class="status">'+ArrayBill[i].paid+'</div>'+
            '</div>'
        }
        document.getElementById("bill").innerHTML = s;
    }
}