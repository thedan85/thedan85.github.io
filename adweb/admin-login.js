document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // Mock validation for admin login (You can improve this)
    if (username === "admin" && password === "12345") {
        window.location.href = "admin-dashboard.html"; // Redirect to admin dashboard
    } else {
        document.getElementById("login-error").textContent = "Sai tên đăng nhập hoặc mật khẩu!";
    }
});
