cart();

function currency(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
function cart()
{
    document.getElementById("bill").style.display = "none";
    document.getElementById("cart").style.display = "block";

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
    var info ='';
    var totalprice;
    for(let i = 0;i<cartArray.length;i++)
    {
        info+=cartArray[i].quantity+' x '+cartArray[i].name+'<br><br>';
        totalprice=cartArray[i].quantity*cartArray[i].price;
    }

    var user = JSON.parse(localStorage.getItem("userlogin"));

    var date = new Date();
    var d = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();

    if(localStorage.getItem("ArrayBill")==null)
    {
        var ArrayBill = [];
        var bill = {};
        bill.id = 0;
        bill.username = user.username;
        bill.info = info;
        bill.totalprice = totalprice
        bill.date = d;
        bill.status = 'Chưa';
        ArrayBill.unshift(bill);
        localStorage.setItem("ArrayBill",JSON.stringify(ArrayBill));
    }
    else
    {
        var ArrayBill = JSON.parse(localStorage.getItem("ArrayBill"));
        var bill = {};
        bill.id = ArrayBill.length;
        bill.username = user.username;
        bill.info = info;
        bill.totalprice = totalprice;
        bill.date = d;
        bill.status = 'Chưa';
        ArrayBill.unshift(bill);
        localStorage.setItem("ArrayBill",JSON.stringify(ArrayBill));
    }
    localStorage.removeItem("cart");
    cart();

}

function showbill()
{
    document.getElementById("bill").style.display = "block";
    document.getElementById("cart").style.display = "none";

    var ArrayBill = JSON.parse(localStorage.getItem("ArrayBill"));
    
    if(localStorage.getItem("ArrayBill") == null)
    {
        var s='<tr><th>Không có đơn hàng nào được đặt.</th></tr>';
        document.getElementById("bill-items").innerHTML = s;      
    }
    else
    {
        var s='<tr><th>Sản phẩm</th><th>Tổng tiền</th><th>Ngày đặt</th><th>Tình trạng</th></tr>';
        for(let i=0;i<ArrayBill.length;i++)
        {
            s+='<tr>'+
				'<td><div>'+ArrayBill[i].info+'</div></td>'+
				'<td>'+currency(ArrayBill[i].totalprice)+'</td>'+
                '<td>'+ArrayBill[i].date+'</td>'+
                '<td>'+ArrayBill[i].status+'</td>'+
				'</tr>';
		}
        }
        document.getElementById("bill-items").innerHTML = s;
    }
