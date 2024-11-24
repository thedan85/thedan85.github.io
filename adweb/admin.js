
let users = JSON.parse(localStorage.getItem('users')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let orders = JSON.parse(localStorage.getItem('ArrayBill')) || [];



if (!users.some(u => u.username === 'admin')) {
    addUser('admin', 'password', true);
}

window.onload = function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const activeSection = localStorage.getItem('activeSection');

    if (loggedInUser) {
        const user = users.find(u => u.username === loggedInUser.username);
        if (user && !user.isBlocked) {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            loadUsers();
            loadProducts();
            loadOrders();

            if (activeSection) {
                showSection(activeSection);
            }
        } else {
            localStorage.removeItem('loggedInUser');
        }
    }
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.isBlocked) {
            alert('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên để biết thêm chi tiết.');
        } else if (user.isAdmin) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            loadUsers();
            loadProducts();
            loadOrders();
        } else {
            alert('Bạn không có quyền truy cập vào trang quản trị');
        }
    } else {
        alert('Thông tin đăng nhập không hợp lệ');
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

function showSection(sectionId) {
   
    document.getElementById('user-management').style.display = 'none';
    document.getElementById('product-management').style.display = 'none';
    document.getElementById('order-management').style.display = 'none';
    document.getElementById('statistics').style.display = 'none';
  
    document.getElementById(sectionId).style.display = 'block';
}

function loadUsers() {
   
    let userListHtml = '<table><thead><tr><th>Tên đăng nhập</th><th>Họ và tên</th><th>Email</th><th>Số điện thoại</th><th>Hành động</th></tr></thead><tbody>';
    users.forEach(user => {
        userListHtml += `<tr>
            <td>${user.username}</td>
            <td>${user.fullname}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>
                <button onclick="showEditUserForm(${user.id})">Sửa</button>
                <button onclick="toggleBlockUser(${user.id})">${user.isBlocked ? 'Mở khóa' : 'Khóa'}</button>
                <button onclick="deleteUser(${user.id})">Xóa</button>
            </td>
        </tr>`;
    });
    userListHtml += '</tbody></table>';
    document.getElementById('user-list').innerHTML = userListHtml;
}

function showAddUserForm() {
    // Triển khai để hiển thị form thêm người dùng mới
    const formHtml = `
        <form id="add-user-form">
            <label for="ten_signup">Tên đăng nhập:</label>
            <input type="text" id="ten_signup" name="ten_signup" required><br>

            <label for="pass_signup">Mật khẩu:</label>
            <input type="password" id="pass_signup" name="pass_signup" required><br>

            <label for="repass_signup">Nhập lại mật khẩu:</label>
            <input type="password" id="repass_signup" name="repass_signup" required><br>

            <label for="hovaten">Họ và tên:</label>
            <input type="text" id="hovaten" name="hovaten" required><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br>

            <label for="sodienthoai">Số điện thoại:</label>
            <input type="text" id="sodienthoai" name="sodienthoai" required><br>

            <button type="button" onclick="addUserFromForm()">Thêm Người Dùng</button>
        </form>
    `;
    document.getElementById('user-list').innerHTML = formHtml;
}

function showEditUserForm(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        const formHtml = `
            <form id="edit-user-form">
                <label for="edit_ten_signup">Tên đăng nhập:</label>
                <input type="text" id="edit_ten_signup" name="edit_ten_signup" value="${user.username}" required><br>

                <label for="edit_hovaten">Họ và tên:</label>
                <input type="text" id="edit_hovaten" name="edit_hovaten" value="${user.fullname}" required><br>

                <label for="edit_email">Email:</label>
                <input type="email" id="edit_email" name="edit_email" value="${user.email}" required><br>

                <label for="edit_sodienthoai">Số điện thoại:</label>
                <input type="text" id="edit_sodienthoai" name="edit_sodienthoai" value="${user.phone}" required><br>

                <button type="button" onclick="editUserFromForm(${user.id})">Cập Nhật</button>
            </form>
        `;
        document.getElementById('user-list').innerHTML = formHtml;
    }
}

function addUserFromForm() {
    const username = document.getElementById('ten_signup').value;
    const password = document.getElementById('pass_signup').value;
    const repassword = document.getElementById('repass_signup').value;
    const fullname = document.getElementById('hovaten').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('sodienthoai').value;

    if (password !== repassword) {
        alert('Mật khẩu nhập lại không khớp.');
        return;
    }

    const today = new Date();
    const datesignup = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    if (username && password && fullname && email && phone) {
        addUser(username, password, false, fullname, email, phone, datesignup);
    }
}

function addUser(username, password, isAdmin, fullname, email, phone, datesignup) {
    users.push({ id: users.length + 1, username, password, isAdmin, isBlocked: false, fullname, email, phone, datesignup });
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

function editUserFromForm(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        const newUsername = document.getElementById('edit_ten_signup').value;
        const newFullname = document.getElementById('edit_hovaten').value;
        const newEmail = document.getElementById('edit_email').value;
        const newPhone = document.getElementById('edit_sodienthoai').value;

        if (newUsername && newFullname && newEmail && newPhone) {
            user.username = newUsername;
            user.fullname = newFullname;
            user.email = newEmail;
            user.phone = newPhone;
            localStorage.setItem('users', JSON.stringify(users));
            loadUsers();
        }
    }
}

function deleteUser(userId) {
    users = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

function toggleBlockUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.isBlocked = !user.isBlocked;
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }
}

function loadProducts() {
    // Tải và hiển thị danh sách sản phẩm
    let productListHtml = '<table><thead><tr><th>Tên sản phẩm</th><th>Giá</th><th>Hình ảnh</th><th>Hành động</th></tr></thead><tbody>';
    products.forEach(product => {
        productListHtml += `<tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img src="${product.image}" alt="${product.name}" width="50"></td>
            <td>
                <button onclick="showEditProductForm(${product.id})">Sửa</button>
                <button onclick="deleteProduct(${product.id})">Xóa</button>
            </td>
        </tr>`;
    });
    productListHtml += '</tbody></table>';
    document.getElementById('product-list').innerHTML = productListHtml;
}

function showAddProductForm() {
    const formHtml = `
        <form id="add-product-form">
            <label for="product_name">Tên sản phẩm:</label>
            <input type="text" id="product_name" name="product_name" required><br>

            <label for="product_price">Giá:</label>
            <input type="number" id="product_price" name="product_price" required><br>

            <label for="product_image">Hình ảnh:</label>
            <input type="file" id="product_image" name="product_image" accept="image/*" required><br>

            <button type="button" onclick="addProductFromForm()">Thêm Sản Phẩm</button>
        </form>
    `;
    document.getElementById('product-list').innerHTML = formHtml;
}

function addProductFromForm() {
    const name = document.getElementById('product_name').value;
    const price = document.getElementById('product_price').value;
    const imageInput = document.getElementById('product_image');
    const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : '';


    if (name && price && image) {
        addProduct(name, price, image);
    }
}

function addProduct(name, price, image) {
    products.push({ id: products.length + 1, name, price, img: image });
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}


function showEditProductForm(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const formHtml = `
            <form id="edit-product-form">
                <label for="edit_product_name">Tên sản phẩm:</label>
                <input type="text" id="edit_product_name" name="edit_product_name" value="${product.name}" required><br>

                <label for="edit_product_price">Giá:</label>
                <input type="number" id="edit_product_price" name="edit_product_price" value="${product.price}" required><br>

                <label for="edit_product_image">Hình ảnh:</label>
                <input type="file" id="edit_product_image" name="edit_product_image" accept="image/*"><br>

                <button type="button" onclick="editProductFromForm(${product.id})">Cập Nhật</button>
            </form>
        `;
        document.getElementById('product-list').innerHTML = formHtml;
    }
}

function editProductFromForm(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const newName = document.getElementById('edit_product_name').value;
        const newPrice = document.getElementById('edit_product_price').value;
        const imageInput = document.getElementById('edit_product_image');
        const newImage = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : product.image;

        if (newName && newPrice) {
            product.name = newName;
            product.price = newPrice;
            product.image = newImage;
            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();
        }
    }
}

function deleteProduct(productId) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        products = products.filter(p => p.id !== productId);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    }
    function notifyUserPage() {
        window.localStorage.setItem('products', JSON.stringify(products));
        // Reload or update the UI to reflect changes
    }
}
/* Quản lý đơn hàng */
/* Quản lý đơn hàng */
function loadOrders() {
    // Tải và hiển thị danh sách đơn hàng dưới dạng bảng
    let orderListHtml = '<table><thead><tr><th>ID</th><th>Khách hàng</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Ngày đặt</th><th>Địa chỉ</th><th>Tình trạng</th><th>Hành động</th></tr></thead><tbody>';
    orders.forEach(order => {
        orderListHtml += `<tr>
            <td>${order.id}</td>
            <td>${order.username}</td>
            <td>${order.info}</td>
            <td>${currency(order.totalprice)}</td>
            <td>${order.date}</td>
            <td>${order.address.address}, ${order.address.city}, ${order.address.district}</td>
            <td>${order.status}</td>
            <td>
                <select onchange="updateOrderStatus(${order.id}, this.value)">
                    <option value="Chưa xử lý" ${order.status === 'Chưa xử lý' ? 'selected' : ''}>Chưa xử lý</option>
                    <option value="Đã xác nhận" ${order.status === 'Đã xác nhận' ? 'selected' : ''}>Đã xác nhận</option>
                    <option value="Đã giao thành công" ${order.status === 'Đã giao thành công' ? 'selected' : ''}>Đã giao thành công</option>
                    <option value="Đã hủy" ${order.status === 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
                </select>
            </td>
        </tr>`;
    });
    orderListHtml += '</tbody></table>';
    document.getElementById('order-list').innerHTML = orderListHtml;
}

function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        localStorage.setItem('ArrayBill', JSON.stringify(orders));
        loadOrders();
    }
}

function filterOrdersByDate(startDate, endDate) {
    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date.split('-').reverse().join('-'));
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
    displayFilteredOrders(filteredOrders);
}

function filterOrdersByStatus(status) {
    const filteredOrders = orders.filter(order => order.status === status);
    displayFilteredOrders(filteredOrders);
}

function displayFilteredOrders(filteredOrders) {
    let orderListHtml = '<table><thead><tr><th>ID</th><th>Khách hàng</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Ngày đặt</th><th>Địa chỉ</th><th>Tình trạng</th><th>Hành động</th></tr></thead><tbody>';
    filteredOrders.forEach(order => {
        orderListHtml += `<tr>
            <td>${order.id}</td>
            <td>${order.username}</td>
            <td>${order.info}</td>
            <td>${currency(order.totalprice)}</td>
            <td>${order.date}</td>
            <td>${order.address.address}, ${order.address.city}, ${order.address.district}</td>
            <td>${order.status}</td>
            <td>
                <select onchange="updateOrderStatus(${order.id}, this.value)">
                    <option value="Chưa xử lý" ${order.status === 'Chưa xử lý' ? 'selected' : ''}>Chưa xử lý</option>
                    <option value="Đã xác nhận" ${order.status === 'Đã xác nhận' ? 'selected' : ''}>Đã xác nhận</option>
                    <option value="Đã giao thành công" ${order.status === 'Đã giao thành công' ? 'selected' : ''}>Đã giao thành công</option>
                    <option value="Đã hủy" ${order.status === 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
                </select>
            </td>
        </tr>`;
    });
    orderListHtml += '</tbody></table>';
    document.getElementById('order-list').innerHTML = orderListHtml;
}

function currency(value) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

/* Quản lý đơn hàng */
function loadOrders() {
    let orderListHtml = '<table><thead><tr><th>ID</th><th>Khách hàng</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Ngày đặt</th><th>Địa chỉ</th><th>Tình trạng</th><th>Hành động</th></tr></thead><tbody>';
    orders.forEach(order => {
        orderListHtml += `<tr>
            <td><a href="#" onclick="viewOrderDetails(${order.id})">${order.id}</a></td>
            <td>${order.username}</td>
            <td>${order.info}</td>
            <td>${currency(order.totalprice)}</td>
            <td>${order.date}</td>
            <td>${order.address.address}, ${order.address.city}, ${order.address.district}</td>
            <td>${order.status}</td>
            <td>
                <select onchange="updateOrderStatus(${order.id}, this.value)">
                    <option value="Chưa xử lý" ${order.status === 'Chưa xử lý' ? 'selected' : ''}>Chưa xử lý</option>
                    <option value="Đã xác nhận" ${order.status === 'Đã xác nhận' ? 'selected' : ''}>Đã xác nhận</option>
                    <option value="Đã giao thành công" ${order.status === 'Đã giao thành công' ? 'selected' : ''}>Đã giao thành công</option>
                    <option value="Đã hủy" ${order.status === 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
                </select>
            </td>
        </tr>`;
    });
    orderListHtml += '</tbody></table>';
    document.getElementById('order-list').innerHTML = orderListHtml;
}

function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        localStorage.setItem('ArrayBill', JSON.stringify(orders));
        loadOrders();
    }
}

function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        alert(`Chi tiết đơn hàng:
        ID: ${order.id}
        Khách hàng: ${order.username}
        Sản phẩm: ${order.info}
        Tổng tiền: ${currency(order.totalprice)}
        Ngày đặt: ${order.date}
        Địa chỉ: ${order.address.address}, ${order.address.city}, ${order.address.district}
        Tình trạng: ${order.status}`);
    }
}

// Lọc đơn hàng theo ngày
function showOrderFilterForm() {
    const formHtml = `
        <form id="filter-order-form">
            <label for="start_date">Ngày bắt đầu:</label>
            <input type="date" id="start_date" name="start_date" required><br>

            <label for="end_date">Ngày kết thúc:</label>
            <input type="date" id="end_date" name="end_date" required><br>

            <button type="button" onclick="applyOrderDateFilter()">Lọc đơn hàng</button>
        </form>
    `;
    document.getElementById('order-filter').innerHTML = formHtml;
}

function applyOrderDateFilter() {
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;

    if (startDate && endDate) {
        filterOrdersByDate(startDate, endDate);
    } else {
        alert("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.");
    }

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        alert('Ngày kết thúc không được trước ngày bắt đầu. Vui lòng kiểm tra lại!');
        return; // Dừng xử lý nếu có lỗi
    }
}

function filterOrdersByDate(startDate, endDate) {
    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date.split('-').reverse().join('-'));
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
    console.log(filteredOrders);
    displayFilteredOrders(filteredOrders);
}

// Lọc đơn hàng theo tình trạng
function showStatusFilterForm() {
    const formHtml = `
        <select id="status_filter" onchange="applyStatusFilter()">
            <option value="">Chọn tình trạng đơn hàng</option>
            <option value="Chưa xử lý">Chưa xử lý</option>
            <option value="Đã xác nhận">Đã xác nhận</option>
            <option value="Đã giao thành công">Đã giao thành công</option>
            <option value="Đã hủy">Đã hủy</option>
        </select>
    `;
    document.getElementById('order-filter').innerHTML = formHtml;
}

function applyStatusFilter() {
    const status = document.getElementById('status_filter').value;
    if (status) {
        filterOrdersByStatus(status);
    }
}

function filterOrdersByStatus(status) {
    const filteredOrders = orders.filter(order => order.status === status);
    displayFilteredOrders(filteredOrders);
}

// Lọc đơn hàng theo quận
function showDistrictFilterForm() {
    const formHtml = `
        <label for="district_filter">Chọn Quận:</label>
        <select id="district_filter" onchange="applyDistrictFilter()">
            <option value="">Chọn Quận</option>
            <option value="Quận 1">Quận 1</option>
            <option value="Quận 2">Quận 2</option>
            <option value="Quận 3">Quận 3</option>
            <option value="Quận 4">Quận 4</option>
            <option value="Quận 5">Quận 5</option>
            <option value="Quận 6">Quận 6</option>
            <option value="Quận 7">Quận 7</option>
            <option value="Quận 8">Quận 8</option>
            <option value="Quận 9">Quận 9</option>
            <option value="Quận 10">Quận 10</option>
            <option value="Quận 11">Quận 11</option>
            <option value="Quận 12">Quận 12</option>
            <option value="Quận Tân Phú">Quận Tân Phú</option>
            <option value="Quận Bình Tân">Quận Bình Tân</option>
            <option value="Quận Bình Thạnh">Quận Bình Thạnh</option>
            <option value="Quận Phú Nhuận">Quận Phú Nhuận</option>
            <option value="Quận Gò Vấp">Quận Gò Vấp</option>
        </select>
    `;
    document.getElementById('order-filter').innerHTML = formHtml;
}

function applyDistrictFilter() {
    const district = document.getElementById('district_filter').value.trim().toLowerCase();
    if (district) {
        filterOrdersByDistrict(district);
    } else {
        loadOrders();
    }
}

function filterOrdersByDistrict(district) {
    const filteredOrders = orders.filter(order => order.address.district.toLowerCase().includes(district));
    displayFilteredOrders(filteredOrders);
}

function displayFilteredOrders(filteredOrders) {
    let orderListHtml = '<table><thead><tr><th>ID</th><th>Khách hàng</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Ngày đặt</th><th>Địa chỉ</th><th>Tình trạng</th><th>Hành động</th></tr></thead><tbody>';
    filteredOrders.forEach(order => {
        orderListHtml += `<tr>
            <td><a href="#" onclick="viewOrderDetails(${order.id})">${order.id}</a></td>
            <td>${order.username}</td>
            <td>${order.info}</td>
            <td>${currency(order.totalprice)}</td>
            <td>${order.date}</td>
            <td>${order.address.address}, ${order.address.city}, ${order.address.district}</td>
            <td>${order.status}</td>
            <td>
                <select onchange="updateOrderStatus(${order.id}, this.value)">
                    <option value="Chưa xử lý" ${order.status === 'Chưa xử lý' ? 'selected' : ''}>Chưa xử lý</option>
                    <option value="Đã xác nhận" ${order.status === 'Đã xác nhận' ? 'selected' : ''}>Đã xác nhận</option>
                    <option value="Đã giao thành công" ${order.status === 'Đã giao thành công' ? 'selected' : ''}>Đã giao thành công</option>
                    <option value="Đã hủy" ${order.status === 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
                </select>
            </td>
        </tr>`;
    });
    orderListHtml += '</tbody></table>';
    document.getElementById('order-list').innerHTML = orderListHtml;
}

function currency(value) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

// Thống kê kinh doanh
function applyStatisticsFilter() {
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;

    if (startDate && endDate) {
        filterStatisticsByDate(startDate, endDate);
    } else {
        alert("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.");
    }
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        alert('Ngày kết thúc không được trước ngày bắt đầu. Vui lòng kiểm tra lại!');
        return; // Dừng xử lý nếu có lỗi
    }
}
    

function filterStatisticsByDate(startDate, endDate) {
    const orders = JSON.parse(localStorage.getItem('ArrayBill')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (orders.length === 0) {
        alert("Không có đơn hàng nào để thống kê.");
        return;
    }

    // Lọc đơn hàng trong khoảng thời gian
    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date.split('-').reverse().join('-'));
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    // Thống kê mặt hàng
    let productStats = {};
    let totalRevenue = 0;

    filteredOrders.forEach(order => {
        order.info.split('<br><br>').forEach(info => {
            const match = info.match(/(\d+) x (.+)/);
            if (match) {
                const quantity = parseInt(match[1]);
                const productName = match[2];

                if (!productStats[productName]) {
                    productStats[productName] = { quantity: 0, totalRevenue: 0 };
                }
                productStats[productName].quantity += quantity;

                const product = products.find(p => p.name === productName);
                if (product) {
                    productStats[productName].totalRevenue += product.price * quantity;
                    totalRevenue += product.price * quantity;
                }
            }
        });
    });

    // Tạo HTML để hiển thị kết quả thống kê
    let productStatisticsHtml = '<h3>Thống kê mặt hàng</h3><table><thead><tr><th>Sản phẩm</th><th>Số lượng bán</th><th>Doanh thu</th></tr></thead><tbody>';
    let bestSellingProduct = { name: '', quantity: 0 };
    let worstSellingProduct = { name: '', quantity: Infinity };

    Object.keys(productStats).forEach(productName => {
        const { quantity, totalRevenue } = productStats[productName];
        productStatisticsHtml += `<tr><td>${productName}</td><td>${quantity}</td><td>${currency(totalRevenue)}</td></tr>`;
        if (quantity > bestSellingProduct.quantity) {
            bestSellingProduct = { name: productName, quantity };
        }
        if (quantity < worstSellingProduct.quantity) {
            worstSellingProduct = { name: productName, quantity };
        }
    });

    productStatisticsHtml += '</tbody></table>';
    productStatisticsHtml += `<p><strong>Tổng doanh thu:</strong> ${currency(totalRevenue)}</p>`;
    productStatisticsHtml += `<p><strong>Sản phẩm bán chạy nhất:</strong> ${bestSellingProduct.name} (Số lượng: ${bestSellingProduct.quantity})</p>`;
    productStatisticsHtml += `<p><strong>Sản phẩm ế nhất:</strong> ${worstSellingProduct.name} (Số lượng: ${worstSellingProduct.quantity})</p>`;

    // Thống kê khách hàng
    let customerStats = {};
    filteredOrders.forEach(order => {
        if (!customerStats[order.username]) {
            customerStats[order.username] = { totalRevenue: 0, orderCount: 0 };
        }
        customerStats[order.username].totalRevenue += order.totalprice;
        customerStats[order.username].orderCount += 1;
    });

    let customerStatisticsHtml = '<h3>Thống kê khách hàng</h3><table><thead><tr><th>Khách hàng</th><th>Tổng doanh thu</th><th>Số đơn hàng</th><th>Hành động</th></tr></thead><tbody>';
    Object.keys(customerStats).forEach(customerName => {
        const { totalRevenue, orderCount } = customerStats[customerName];
        customerStatisticsHtml += `<tr><td>${customerName}</td><td>${currency(totalRevenue)}</td><td>${orderCount}</td><td><button onclick="viewCustomerOrders('${customerName}')">Xem hóa đơn</button></td></tr>`;
    });
    customerStatisticsHtml += '</tbody></table>';

    document.getElementById('statistics-results').innerHTML = productStatisticsHtml + customerStatisticsHtml;
}
function viewCustomerOrders(customerName) {
    const orders = JSON.parse(localStorage.getItem('ArrayBill')) || [];
    const filteredOrders = orders.filter(order => order.username === customerName);
    let orderDetailsHtml = `<h3>Hóa đơn của khách hàng: ${customerName}</h3><ul>`;
    filteredOrders.forEach(order => {
        orderDetailsHtml += `<li>ID: ${order.id}, Sản phẩm: ${order.info}, Tổng tiền: ${currency(order.totalprice)}, Ngày đặt: ${order.date}</li>`;
    });
    orderDetailsHtml += '</ul>';
    document.getElementById('customer-order-details').innerHTML = orderDetailsHtml;
    document.getElementById('customer-order-details').style.display = 'block';
}



function currency(value) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

