// Lấy danh sách người dùng từ LocalStorage hoặc khởi tạo danh sách rỗng nếu không có
let users = JSON.parse(localStorage.getItem('users')) || [];

// Hàm để lưu danh sách người dùng vào LocalStorage
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Hàm để hiển thị danh sách người dùng
function displayUsers() {
    const userTable = document.getElementById('user-list');
    userTable.innerHTML = ''; // Clear previous data

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.status}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${user.id})">Sửa</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">Xóa</button>
                <button class="block-btn" onclick="blockUser(${user.id})">Khóa</button>
            </td>
        `;
        userTable.appendChild(row);
    });
}

// Chức năng khóa người dùng
function blockUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        user.status = 'Khóa';  // Cập nhật trạng thái người dùng thành 'Khóa'
        saveUsers();
        displayUsers();
        alert('Người dùng đã bị khóa!');
    }
}

// Thêm người dùng mới
document.querySelector('.add-user-btn').addEventListener('click', function () {
    document.getElementById('user-form').style.display = 'block';
    document.getElementById('user-id').value = ''; // Clear hidden ID
    document.getElementById('user-name').value = '';
    document.getElementById('user-email').value = '';
    document.getElementById('user-status').value = 'Hoạt Động';
});

// Chỉnh sửa thông tin người dùng
function editUser(id) {
    const user = users.find(u => u.id === id);
    document.getElementById('user-form').style.display = 'block';
    document.getElementById('user-id').value = user.id;
    document.getElementById('user-name').value = user.name;
    document.getElementById('user-email').value = user.email;
    document.getElementById('user-status').value = user.status;
}

// Lưu thông tin người dùng
document.getElementById('user-form-content').addEventListener('submit', function (e) {
    e.preventDefault();

    const userId = document.getElementById('user-id').value;
    const userName = document.getElementById('user-name').value;
    const userEmail = document.getElementById('user-email').value;
    const userStatus = document.getElementById('user-status').value;

    if (userId) { // Sửa người dùng
        const user = users.find(u => u.id === parseInt(userId));
        user.name = userName;
        user.email = userEmail;
        user.status = userStatus;
    } else { // Thêm người dùng mới
        const newUser = {
            id: Date.now(),
            name: userName,
            email: userEmail,
            status: userStatus,
        };
        users.push(newUser);
    }

    saveUsers();
    displayUsers();
    document.getElementById('user-form').style.display = 'none';
});

// Hủy chỉnh sửa
function cancelEdit() {
    document.getElementById('user-form').style.display = 'none';
}

// Xóa người dùng
function deleteUser(id) {
    if (confirm('Bạn có chắc muốn xóa người dùng này không?')) {
        users = users.filter(u => u.id !== id);
        saveUsers();
        displayUsers();
    }
}

// Hiển thị danh sách người dùng khi tải trang
displayUsers();
