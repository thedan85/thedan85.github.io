// sales-statistics.js

document.getElementById('filter-btn').addEventListener('click', function () {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (startDate && endDate) {
        // Thực hiện thống kê doanh thu trong khoảng thời gian
        getSalesStatistics(startDate, endDate);
    } else {
        alert('Vui lòng chọn khoảng thời gian.');
    }
});

// Giả sử dữ liệu các đơn hàng đã có, dưới đây là một ví dụ về dữ liệu đơn hàng
const orders = [
    { orderId: 1, customer: 'Nguyễn Văn A', date: '2024-11-01', items: [
        { name: 'Sản phẩm 1', quantity: 2, price: 200000 },
        { name: 'Sản phẩm 2', quantity: 1, price: 150000 }
    ], total: 550000 },
    { orderId: 2, customer: 'Trần Thị B', date: '2024-11-05', items: [
        { name: 'Sản phẩm 3', quantity: 3, price: 100000 }
    ], total: 300000 },
    // Thêm các đơn hàng khác ở đây...
];

// Hàm để tính và hiển thị thống kê
function getSalesStatistics(startDate, endDate) {
    const itemStats = {};
    const customerStats = {};

    // Lọc các đơn hàng theo khoảng thời gian
    const filteredOrders = orders.filter(order => {
        return new Date(order.date) >= new Date(startDate) && new Date(order.date) <= new Date(endDate);
    });

    // Thống kê theo mặt hàng
    filteredOrders.forEach(order => {
        order.items.forEach(item => {
            if (!itemStats[item.name]) {
                itemStats[item.name] = { quantity: 0, total: 0 };
            }
            itemStats[item.name].quantity += item.quantity;
            itemStats[item.name].total += item.quantity * item.price;
        });

        // Thống kê theo khách hàng
        if (!customerStats[order.customer]) {
            customerStats[order.customer] = 0;
        }
        customerStats[order.customer] += order.total;
    });

    // Hiển thị thống kê mặt hàng
    displayItemStatistics(itemStats);

    // Hiển thị thống kê khách hàng
    displayCustomerStatistics(customerStats);
}

// Hàm hiển thị thống kê mặt hàng
function displayItemStatistics(itemStats) {
    const tableBody = document.getElementById('item-statistics').querySelector('tbody');
    tableBody.innerHTML = ''; // Xóa các dòng cũ

    let totalRevenue = 0;
    let bestSelling = { name: '', total: 0 };
    let worstSelling = { name: '', total: Infinity };

    for (const [name, data] of Object.entries(itemStats)) {
        totalRevenue += data.total;

        if (data.total > bestSelling.total) {
            bestSelling = { name, total: data.total };
        }

        if (data.total < worstSelling.total) {
            worstSelling = { name, total: data.total };
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${data.quantity}</td>
            <td>${data.total.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    }

    // Hiển thị tổng doanh thu và mặt hàng bán chạy nhất
    const summaryRow = document.createElement('tr');
    summaryRow.innerHTML = `
        <td><strong>Tổng Doanh Thu</strong></td>
        <td colspan="2">${totalRevenue.toLocaleString()}</td>
    `;
    tableBody.appendChild(summaryRow);

    const bestSellingRow = document.createElement('tr');
    bestSellingRow.innerHTML = `
        <td><strong>Mặt Hàng Bán Chạy Nhất</strong></td>
        <td colspan="2">${bestSelling.name}: ${bestSelling.total.toLocaleString()}</td>
    `;
    tableBody.appendChild(bestSellingRow);

    const worstSellingRow = document.createElement('tr');
    worstSellingRow.innerHTML = `
        <td><strong>Mặt Hàng Bán Ế Nhất</strong></td>
        <td colspan="2">${worstSelling.name}: ${worstSelling.total.toLocaleString()}</td>
    `;
    tableBody.appendChild(worstSellingRow);
}

// Hàm hiển thị thống kê khách hàng
function displayCustomerStatistics(customerStats) {
    const tableBody = document.getElementById('customer-statistics').querySelector('tbody');
    tableBody.innerHTML = ''; // Xóa các dòng cũ

    // Sắp xếp khách hàng theo doanh thu từ cao đến thấp
    const sortedCustomers = Object.entries(customerStats).sort((a, b) => b[1] - a[1]);

    // Lấy 5 khách hàng có doanh thu cao nhất
    sortedCustomers.slice(0, 5).forEach(([customer, total]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer}</td>
            <td>${total.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}
