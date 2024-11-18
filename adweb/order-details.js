// order-details.js

// Lấy ID đơn hàng từ URL
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('id');

// Giả sử chúng ta có dữ liệu đơn hàng (thực tế sẽ lấy từ database hoặc API)
const orderData = {
    12345: {
        customer: "Nguyễn Văn A",
        status: "Đang xử lý",
        address: "Quận 1, TP.HCM",
        date: "2024-11-18",
        items: [
            { name: "Sản phẩm 1", quantity: 2, price: 200000 },
            { name: "Sản phẩm 2", quantity: 1, price: 150000 }
        ],
        total: 550000
    },
    12346: {
        customer: "Trần Thị B",
        status: "Đã xác nhận",
        address: "Quận 2, TP.HCM",
        date: "2024-11-17",
        items: [
            { name: "Sản phẩm 3", quantity: 1, price: 300000 }
        ],
        total: 300000
    }
};

// Hiển thị thông tin chi tiết đơn hàng
function displayOrderDetails(orderId) {
    const order = orderData[orderId];
    if (order) {
        document.getElementById('order-details').innerHTML = `
            <h2>Thông tin khách hàng</h2>
            <p><strong>Tên khách hàng:</strong> ${order.customer}</p>
            <p><strong>Tình trạng:</strong> ${order.status}</p>
            <p><strong>Địa chỉ giao hàng:</strong> ${order.address}</p>
            <p><strong>Ngày đặt:</strong> ${order.date}</p>

            <h2>Danh sách sản phẩm</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>${item.price.toLocaleString()}</td>
                            <td>${(item.quantity * item.price).toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <h3>Tổng tiền: ${order.total.toLocaleString()}</h3>
        `;
    } else {
        document.getElementById('order-details').innerHTML = "<p>Đơn hàng không tồn tại.</p>";
    }
}

// Gọi hàm để hiển thị chi tiết đơn hàng khi có ID
if (orderId) {
    displayOrderDetails(orderId);
} else {
    document.getElementById('order-details').innerHTML = "<p>Không có thông tin đơn hàng.</p>";
}
