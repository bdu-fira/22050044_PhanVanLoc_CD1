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
      tk.TinhTrang,
      tk.MatKhau
    FROM 
      docgia dg
    JOIN 
      taikhoan tk ON dg.MaDocGia = tk.MaDocGia
    WHERE 
      tk.MaVaiTro = 2 AND tk.TinhTrang = 1
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
router.put('/api/admin/:id', (req, res) => {
    const { TenDocGia, NgaySinh, GioiTinh, SoDienThoai, DiaChi, Email, MatKhau } = req.body;
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
  
      // Cập nhật Email và TenTaiKhoan và MatKhau
      const updateTaiKhoanSQL = `
        UPDATE taikhoan
        SET Email = ?, TenTaiKhoan = ?, MatKhau = ?
        WHERE MaDocGia = ?`;
  
      db.query(updateTaiKhoanSQL, [Email, TenDocGia, MatKhau, maDocGia], (err2, result2) => {
        if (err2) {
          console.error('❌ Lỗi khi cập nhật tài khoản:', err2.message);
          if (err2.code === 'ER_DUP_ENTRY') {
            return res.json('Lỗi do email đã được sử dụng');
          }
          return res.json({ success: false, message: 'Đã có lỗi xảy ra khi cập nhật tài khoản: ' + err2.message });
        }
  
        res.send('✅ Cập nhật thủ thư thành công!');
      });
    });
  });
  

/////thêm độc
router.post('/api/admin', (req, res) => {
    const { TenDocGia, NgaySinh, GioiTinh, SoDienThoai, DiaChi, Email, TenTaiKhoan, MatKhau } = req.body;
  
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
        VALUES (?, ?, ?, ?, 2)`; // <-- Gán cứng MaVaiTro = 2 ở đây
  
      db.query(insertTaiKhoanSQL, [TenTaiKhoan, MatKhau, maDocGia, Email], (err2, result2) => {
        if (err2) {
          console.error('❌ Lỗi khi thêm tài khoản:', err2.message);
          if (err2.code === 'ER_DUP_ENTRY') {
            return res.json('Lỗi do email đã được sử dụng');
          }
          return res.json({ success: false, message: 'Đã có lỗi xảy ra khi thêm tài khoản: ' + err2.message });
        }
  
        console.log('✅ Độc giả và tài khoản đã được thêm thành công!');
        res.json({ success: true, message: 'Độc giả đã được thêm thành công!' });
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

////đổi mật khẩu
router.post('/DoiMK', (req, res) => {
    const { email, matKhauCu, matKhauMoi, xacNhanMatKhauMoi } = req.body;
  
    if (!email || !matKhauCu || !matKhauMoi || !xacNhanMatKhauMoi) {
      return res.send('Vui lòng điền đầy đủ thông tin!');
    }
  
    if (matKhauMoi !== xacNhanMatKhauMoi) {
      return res.send('Mật khẩu mới và xác nhận mật khẩu không khớp!');
    }
  
    const sqlSelect = 'SELECT MatKhau FROM taikhoan WHERE Email = ? AND MaVaiTro = 1';
    db.query(sqlSelect, [email], (err, results) => {
      if (err) {
        console.error('❌ Lỗi truy vấn database:', err.message);
        return res.send('Lỗi truy vấn database!');
      }
  
      if (results.length === 0) {
        return res.send('Không tìm thấy tài khoản Admin với email này!');
      }
  
      const matKhauHienTai = results[0].MatKhau;
      if (matKhauCu !== matKhauHienTai) {
        return res.send('Mật khẩu cũ không đúng!');
      }
  
      const sqlUpdate = 'UPDATE taikhoan SET MatKhau = ? WHERE Email = ? AND MaVaiTro = 1';
      db.query(sqlUpdate, [matKhauMoi, email], (err2, results2) => {
        if (err2) {
          console.error('❌ Lỗi cập nhật mật khẩu:', err2.message);
          return res.send('Không thể cập nhật mật khẩu!');
        }
  
        if (results2.affectedRows > 0) {
          console.log('✅ Đổi mật khẩu thành công!');
          return res.send('Đổi mật khẩu thành công!');
        } else {
          return res.send('Đổi mật khẩu thất bại!');
        }
      });
    });
  });


  



module.exports = router;
