// Dữ liệu mẫu cho các đơn hàng (có thể thay thế bằng dữ liệu từ backend hoặc localStorage)
let orders = [
    { id: 1, customerName: 'Nguyễn Văn A', address: 'Quận 1', status: 'pending', date: '2024-11-18' },
    { id: 2, customerName: 'Lê Thị B', address: 'Quận 2', status: 'confirmed', date: '2024-11-17' },
    { id: 3, customerName: 'Trần Minh C', address: 'Quận 3', status: 'shipped', date: '2024-11-16' },
    { id: 4, customerName: 'Phạm Quân D', address: 'Quận 1', status: 'cancelled', date: '2024-11-15' },
];

// Hiển thị đơn hàng trong bảng
function displayOrders(filteredOrders) {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    filteredOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.address}</td>
            <td>${order.status}</td>
            <td>${order.date}</td>
            <td><a href="order-details.html?id=${order.id}">Xem Chi Tiết</a></td>
        `;
        orderList.appendChild(row);
    });
}

// Lọc đơn hàng theo tình trạng, thời gian, và địa chỉ
document.getElementById('filter-btn').addEventListener('click', function() {
    const statusFilter = document.getElementById('status-filter').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const districtFilter = document.getElementById('district-filter').value;

    let filteredOrders = orders;

    // Lọc theo tình trạng đơn hàng
    if (statusFilter !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }

    // Lọc theo khoảng thời gian
    if (startDate) {
        filteredOrders = filteredOrders.filter(order => new Date(order.date) >= new Date(startDate));
    }
    if (endDate) {
        filteredOrders = filteredOrders.filter(order => new Date(order.date) <= new Date(endDate));
    }

    // Lọc theo địa chỉ giao hàng (quận)
    if (districtFilter !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.address === districtFilter);
    }

    // Hiển thị kết quả đã lọc
    displayOrders(filteredOrders);
});

// Hiển thị tất cả đơn hàng khi tải trang
displayOrders(orders);
