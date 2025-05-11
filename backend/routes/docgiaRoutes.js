const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 📦 GET /api/docgia - Lấy danh sách độc giả
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      dg.MaDocGia,
      dg.TenDocGia, 
      dg.NgaySinh, 
      dg.GioiTinh, 
      dg.SoDienThoai, 
      dg.DiaChi, 
      tk.Email,
      tk.TinhTrang
    FROM 
      docgia dg
    JOIN 
      taikhoan tk ON dg.MaDocGia = tk.MaDocGia
    WHERE 
      tk.MaVaiTro = 3 AND tk.TinhTrang = 1
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    }
    res.json(results);
  });
});



// 🛠️ PUT /api/docgia/update - Cập nhật độc giả và Email tài khoản
// 🛠️ PUT /api/docgia/:id - Cập nhật độc giả và đồng bộ tên tài khoản + email
router.put('/api/docgia/:id', (req, res) => {
  const { TenDocGia, NgaySinh, GioiTinh, SoDienThoai, DiaChi, Email } = req.body;
  const maDocGia = req.params.id;

  // Cập nhật thông tin độc giả
  const updateDocGiaSQL = `
    UPDATE docgia
    SET TenDocGia = ?, NgaySinh = ?, GioiTinh = ?, SoDienThoai = ?, DiaChi = ?
    WHERE MaDocGia = ?`;

  db.query(updateDocGiaSQL, [TenDocGia, NgaySinh, GioiTinh, SoDienThoai, DiaChi, maDocGia], (err, result) => {
    if (err) {
      console.error('❌ Lỗi khi cập nhật độc giả:', err.message);
      return res.json({ success: false, message: 'Đã có lỗi xảy ra khi cập nhật độc giả: ' + err.message });
    }

    // Cập nhật Email và TenTaiKhoan (dùng lại TenDocGia làm TenTaiKhoan)
    const updateTaiKhoanSQL = `
      UPDATE taikhoan
      SET Email = ?, TenTaiKhoan = ?
      WHERE MaDocGia = ?`;

    db.query(updateTaiKhoanSQL, [Email, TenDocGia, maDocGia], (err2, result2) => {
      if (err2) {
        console.error('❌ Lỗi khi cập nhật tài khoản:', err2.message);
        if (err2.code === 'ER_DUP_ENTRY') {
          return res.json('Lỗi do email đã được sử dụng');
        }
        return res.json({ success: false, message: 'Đã có lỗi xảy ra khi cập nhật tài khoản: ' + err2.message });
      }
      

      res.send('Cập nhật tác giả thành công!');
    });
  });
});

/////thêm độc
router.post('/api/docgia', (req, res) => {
  const { TenDocGia, NgaySinh, GioiTinh, SoDienThoai, DiaChi, Email, TenTaiKhoan, MatKhau, MaVaiTro } = req.body;

  const insertDocGiaSQL = `
    INSERT INTO docgia (TenDocGia, NgaySinh, GioiTinh, SoDienThoai, DiaChi)
    VALUES (?, ?, ?, ?, ?)`;

  db.query(insertDocGiaSQL, [TenDocGia, NgaySinh, GioiTinh, SoDienThoai, DiaChi], (err, result) => {
    if (err) {
      console.error('❌ Lỗi khi thêm độc giả:', err.message);
      return res.json({ success: false, message: 'Đã có lỗi xảy ra khi thêm độc giả: ' + err.message });
    }

    const maDocGia = result.insertId;

    const insertTaiKhoanSQL = `
      INSERT INTO taikhoan (TenTaiKhoan, MatKhau, MaDocGia, Email, MaVaiTro)
      VALUES (?, ?, ?, ?, ?)`;

    db.query(insertTaiKhoanSQL, [TenTaiKhoan, MatKhau, maDocGia, Email, MaVaiTro], (err2, result2) => {
      if (err2) {
        console.error('❌ Lỗi khi thêm tài khoản:', err2.message);
        if (err2.code === 'ER_DUP_ENTRY') {
          return res.json('Lỗi do email đã được sử dụng');
        }
        return res.json({ success: false, message: 'Đã có lỗi xảy ra khi thêm tài khoản: ' + err2.message });
      }
      

      console.log('✅ Độc giả và tài khoản đã được thêm thành công!');
      res.json({ success: true, message: 'Độc giả  đã được thêm thành công!' });
    });
  });
});
//xoa
router.delete('/:id', (req, res) => {
  const maDocGia = req.params.id;

  // Cập nhật Tình Trạng trong bảng TaiKhoan thành 0
  const sql = 'UPDATE TaiKhoan SET TinhTrang = 0 WHERE MaDocGia = ?';

  db.query(sql, [maDocGia], (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật tình trạng:', err);
      return res.status(500).json({ success: false, message: 'Lỗi khi cập nhật tình trạng độc giả' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản của độc giả' });
    }

    res.json({ success: true, message: 'Cập nhật tình trạng độc giả thành công' });
  });
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM taikhoan WHERE Email = ? AND MatKhau = ?';

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn database:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ!' });
    }

    if (results.length > 0) {
      const user = results[0];  // Lấy thông tin người dùng
      const userRole = user.MaVaiTro;
      const maDocGia = user.MaDocGia;  // Lấy mã độc giả từ tài khoản

      // Trả thông tin người dùng trong response, bao gồm mã độc giả
      if (userRole === 1) {
        return res.json({
          success: true,
          message: 'Đăng nhập thành công (Admin)',
          redirect: '/quanly/giaodien_admin.html',
          user: { id: user.id, email: user.Email, role: user.MaVaiTro, maDocGia: maDocGia }
        });
      } else if (userRole === 2) {
        return res.json({
          success: true,
          message: 'Đăng nhập thành công (Thủ thư)',
          redirect: '/quanly/giaodien.html',
          user: { id: user.id, email: user.Email, role: user.MaVaiTro, maDocGia: maDocGia }
        });
      } else if (userRole === 3) {
        return res.json({
          success: true,
          message: 'Đăng nhập thành công (Độc giả)',
          redirect: '/Giohang.html',
          user: { id: user.id, email: user.Email, role: user.MaVaiTro, maDocGia: maDocGia }
        });
      } else {
        return res.status(400).json({ success: false, message: 'Không xác định vai trò!' });
      }
    } else {
      return res.status(401).json({ success: false, message: 'Sai email hoặc mật khẩu!' });
    }
  });
});


router.post('/register', (req, res) => {
  const { taikhoan, email, password, birthdate, gender, phone, address } = req.body;

  const insertDocGia = `
    INSERT INTO docgia (TenDocGia, NgaySinh, GioiTinh, SoDienThoai, DiaChi)
    VALUES (?, ?, ?, ?, ?)`;

  db.query(insertDocGia, [taikhoan, birthdate, gender, phone, address], (err1, result1) => {
    if (err1) {
      console.error('❌ Lỗi khi thêm độc giả:', err1);
      return res.send({ success: false, message: err1.sqlMessage });
    }

    const maDocGia = result1.insertId;

    const insertTaiKhoan = `
      INSERT INTO taikhoan (TenTaiKhoan, Email, MatKhau, MaDocGia, MaVaiTro, TinhTrang)
      VALUES (?, ?, ?, ?, ?, ?)`;  // ➕ Thêm trường TinhTrang

    db.query(insertTaiKhoan, [taikhoan, email, password, maDocGia, 3, 2], (err2, result2) => {
      if (err2) {
        console.error('❌ Lỗi khi thêm tài khoản:', err2);
        return res.send({ success: false, message: err2.sqlMessage });
      }

      console.log('✅ Đăng ký thành công!');
      res.send({ success: true, message: "Đăng ký thành công!" });
    });
  });
});


router.post('/muon-sach', async (req, res) => {
  try {
    const { maDocGia, danhSachSach } = req.body;

    if (!maDocGia || !Array.isArray(danhSachSach) || danhSachSach.length === 0) {
      return res.status(400).json({ message: 'Dữ liệu không hợp lệ.' });
    }

    // Lặp qua danh sách sách và lưu vào bảng muonsach
    const currentDate = new Date().toISOString().split('T')[0]; // Ngày hiện tại
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // Ngày trả sách sau 14 ngày
    const dueDateStr = dueDate.toISOString().split('T')[0];

    // Insert vào bảng muonsach
    danhSachSach.forEach((sach) => {
      const query = `INSERT INTO muonsach (MaDocGia, MaSach, NgayMuon, NgayHenTra, TinhTrang) VALUES (?, ?, ?, ?, ?)`;
      const values = [maDocGia, sach.masach, currentDate, dueDateStr, 'Chờ duyệt'];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Lỗi khi lưu mượn sách:', err);
          return res.status(500).json({ message: 'Lỗi khi lưu mượn sách vào cơ sở dữ liệu.' });
        }
      });
    });

    // Trả về kết quả thành công
    res.status(200).json({ message: 'Mượn sách thành công.' });
  } catch (error) {
    console.error('Lỗi khi mượn sách:', error);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
});
module.exports = router;
