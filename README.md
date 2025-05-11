# 📚 Hệ Thống Quản Lý Thư Viện Trường Đại Học Bình Dương

## 📝 Mô tả
Dự án này xây dựng một hệ thống quản lý thư viện hỗ trợ các chức năng như quản lý độc giả, tài liệu, mượn – trả sách, và quản trị người dùng. Hệ thống giúp thủ thư và admin thực hiện các nghiệp vụ một cách nhanh chóng, hiệu quả và chính xác.

## 🚀 Tính năng chính
- Dành cho Quản trị viên (Admin)
       Quản lý duyệt độc giả
    👤 Quản lý độc giả: Thêm, sửa, xóa, duyệt tài khoản độc giả.
        Quản lý tác giả: Thêm, sửa , xóa, tìm kiếm tác giả
    📖 Quản lý sách: Thêm mới, chỉnh sửa thông tin sách, xóa, tìm kiếm sách theo tên/tác giả/nhà xuất bản.
    🔄 Quản lý mượn – trả sách: Ghi nhận việc mượn và trả sách, tự động cập nhật số lượng sách còn lại.
    🔐 Quản lý thủ thư: Thêm, sửa, xóa, tìm kiếm thủ thư, đổi mật khẩu admin
    📊 Thống kê – báo cáo: Thống kê theo hoạt động độc giả, theo thời gian, theo số lượng sách.
- Dành cho Thủ thư
       Quản lý duyệt độc giả
    👤 Quản lý độc giả: Thêm, sửa, xóa, duyệt tài khoản độc giả.
        Quản lý tác giả: Thêm, sửa , xóa, tìm kiếm tác giả
        Quản lý Nhà xuất bản: Thêm, sửa , xóa, tìm kiếm nhà xuất bản
    📖 Quản lý sách: Thêm mới, chỉnh sửa thông tin sách, xóa, tìm kiếm sách theo tên/tác giả/nhà xuất bản.
    🔄 Quản lý mượn – trả sách: Ghi nhận việc mượn và trả sách, tự động cập nhật số lượng sách còn lại.
    📊 Thống kê – báo cáo: Thống kê theo hoạt động độc giả, theo thời gian, theo số lượng sách.

- Dành cho Người dùng (Độc giả)
    🔎 Tìm kiếm sách: Tìm kiếm thông tin sách trong thư viện, chỉnh sửa thông tin cá nhân
    📥 Yêu cầu mượn sách: Gửi yêu cầu mượn sách trực tuyến( nếu đã được thủ thư hoặc admin duyệt )
    📝 Đăng ký tài khoản: Đăng ký tài khoản độc giả và chờ duyệt bởi admin và thủ thư.
    🔐 Đăng nhập: Đăng nhập để truy cập các chức năng cá nhân hóa.
- Giao diện người dùng
    📱 Responsive UI: Giao diện thân thiện, dễ sử dụng trên cả desktop và thiết bị di động.
    🧭 Phân chia rõ ràng: Giao diện tách biệt giữa quản trị viên và người dùng cuối.
    🎨 Trải nghiệm người dùng mượt mà: Thiết kế hiện đại, dễ điều hướng và thao tác

## 🧱 Kiến trúc hệ thống
- **Frontend:** HTML, CSS, JavaScript
- **Backend:**  Node.js + Express.js
- **Cơ sở dữ liệu:** MySQL
- **Triển khai:** Localhost

## 📦 Cài đặt
1. Clone repo:
   ```bash
   git clone https://github.com/bdu-fira/22050034_QuachThiThu_CD1.git
   
2. Cài đặt môi trường:
    - Các thư viện gồm:
        Node.js (bao gồm npm)
        npm init -y
        npm install express
        npm install body-parser
        npm install cors
        npm install mysql2
        npm install mysql
        npm install


3. Cấu hình cơ sở dữ liệu
 Chỉnh lại kết nối đến databse ở đường dẫn "backend\config\db.js",
 database nằm ở "backend\dataset\quanlythuvienbdu.sql"

4. Cách chạy 
    -Mở XAMPP hoặc hoặc MySQL .
    - Tạo cơ sở dữ liệu có tên quanlythuvienbdu, import file quanlythuvienbdu.sql từ thư mục backend/dataset/.
    - Trong bài đã có sẵn kết nối cho MYSQL, chỉnh lại phần config/db.js phần pasword nếu có. Hoặc nếu sài XAMPP thì chỉnh lại:
    Đây là code mẫu kêt nối với XAMPP:
                const mysql = require('mysql');

            // Tạo kết nối đến cơ sở dữ liệu
                const db = mysql.createConnection({
                host: 'localhost',               // Địa chỉ MySQL, mặc định là localhost
                user: 'root',                    // Tên đăng nhập MySQL (XAMPP mặc định là 'root')
                password: '',                    // Mật khẩu (trống nếu dùng XAMPP mặc định)
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
    - Cài đặt các môi trường.
    - Chạy server Node.js:
            cd backend
            node server.js
            truy cập theo link 
            http://localhost:3000/login



    

    


