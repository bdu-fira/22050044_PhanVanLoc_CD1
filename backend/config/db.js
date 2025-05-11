const mysql = require('mysql2');

// Tạo kết nối đến cơ sở dữ liệu
const db = mysql.createConnection({
  host: 'localhost',              // Địa chỉ MySQL, mặc định là localhost
  user: 'root',                    // Tên đăng nhập MySQL (XAMPP mặc định là 'root')
  password: 'Thubezy2004@',                    // Mật khẩu (trống nếu dùng XAMPP mặc định)
  database: 'quanlythuvienbdu',    // Tên cơ sở dữ liệu trong phpMyAdmin
  charset: 'utf8mb4'               // Hỗ trợ tiếng Việt và ký tự đặc biệt
});

// Kết nối tới cơ sở dữ liệu
db.connect((err) => {
  if (err) {
    console.error('❌ Lỗi kết nối CSDL:', err.message);
    return;
  }
  console.log('✅ Kết nối thành công đến CSDL!');
});

module.exports = db;

