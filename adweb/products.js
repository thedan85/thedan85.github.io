// Lấy danh sách sản phẩm từ LocalStorage hoặc khởi tạo danh sách rỗng nếu không có
let products = JSON.parse(localStorage.getItem('products')) || [];

// Hàm để lưu dữ liệu sản phẩm vào LocalStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Hàm để hiển thị danh sách sản phẩm
function displayProducts() {
    const productTable = document.getElementById('product-list');
    productTable.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>${product.status}</td>
            <td><img src="${product.image || 'default.jpg'}" alt="Product Image" width="50"></td>
            <td>
                <button class="edit-btn" onclick="editProduct(${product.id})">Sửa</button>
                <button class="delete-btn" onclick="confirmDelete(${product.id})">Xóa</button>
            </td>
        `;
        productTable.appendChild(row);
    });
}

// Thêm sản phẩm
document.querySelector('.add-product-btn').addEventListener('click', function () {
    document.getElementById('product-form').style.display = 'block';
    document.getElementById('product-id').value = ''; // Clear hidden ID
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-category').value = '';
    document.getElementById('product-status').value = 'Còn Hàng';
    document.getElementById('product-image').value = ''; // Clear image input
});

// Chỉnh sửa sản phẩm
function editProduct(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('product-form').style.display = 'block';
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-status').value = product.status;
    document.getElementById('product-image').value = ''; // Allow new image upload
}

// Xử lý sự kiện lưu thông tin sản phẩm
document.getElementById('product-form-content').addEventListener('submit', function (e) {
    e.preventDefault();

    const productId = document.getElementById('product-id').value;
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productCategory = document.getElementById('product-category').value;
    const productStatus = document.getElementById('product-status').value;
    const productImage = document.getElementById('product-image').files[0]; // Get the uploaded file

    const imageUrl = productImage ? URL.createObjectURL(productImage) : null;

    if (productId) { // Sửa sản phẩm
        const product = products.find(p => p.id === parseInt(productId));
        product.name = productName;
        product.price = productPrice;
        product.category = productCategory;
        product.status = productStatus;
        if (imageUrl) product.image = imageUrl;
    } else { // Thêm mới sản phẩm
        const newProduct = {
            id: Date.now(),
            name: productName,
            price: productPrice,
            category: productCategory,
            status: productStatus,
            image: imageUrl,
        };
        products.push(newProduct);
    }

    saveProducts();
    displayProducts();
    document.getElementById('product-form').style.display = 'none';
});

// Hủy chỉnh sửa
function cancelEdit() {
    document.getElementById('product-form').style.display = 'none';
}

// Xác nhận xóa sản phẩm
function confirmDelete(id) {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        displayProducts();
    }
}

// Hiển thị sản phẩm khi tải trang
displayProducts();
