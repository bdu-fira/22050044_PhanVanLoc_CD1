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
      tk.MaVaiTro = 3 AND tk.TinhTrang = 2
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    }
    res.json(results);
  });
});

router.put('/duyet/:maDocGia', (req, res) => {
  const maDocGia = req.params.maDocGia;

  const query = `
    UPDATE taikhoan
    SET TinhTrang = 1
    WHERE MaDocGia = ?`;

  db.query(query, [maDocGia], (err, result) => {
    if (err) {
      console.error('❌ Lỗi khi cập nhật tình trạng:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy độc giả' });
    }

    res.json({ success: true, message: 'Duyệt thành công!' });
  });
});
router.get('/:maDocGia', (req, res) => {
  const maDocGia = req.params.maDocGia;

  const query = `
    SELECT 
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
      tk.MaVaiTro = 3 AND dg.MaDocGia = ?
  `;

  db.query(query, [maDocGia], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Lỗi server' });
    if (results.length === 0) return res.status(404).json({ success: false, message: 'Không tìm thấy độc giả' });

    res.json({ success: true, user: results[0] });
  });
});


// routes/duyetDG.js
router.post('/update/:maDocGia', (req, res) => {
    const maDocGia = req.params.maDocGia;
    const updatedInfo = req.body;

    const query = `
        UPDATE docgia 
        SET TenDocGia = ?, Email = ?, NgaySinh = ?, GioiTinh = ?, SoDienThoai = ?, DiaChi = ?, TinhTrang = ?
        WHERE MaDocGia = ?
    `;
    
    db.query(query, [
        updatedInfo.TenDocGia,
        updatedInfo.Email,
        updatedInfo.NgaySinh,
        updatedInfo.GioiTinh,
        updatedInfo.SoDienThoai,
        updatedInfo.DiaChi,
        updatedInfo.TinhTrang,
        maDocGia
    ], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Lỗi khi cập nhật thông tin' });
        }

        res.json({ success: true });
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

router.put('/:maDocGia', (req, res) => {
  const { maDocGia } = req.params;
  const { TenDocGia, Email, NgaySinh, GioiTinh, SoDienThoai, DiaChi } = req.body;

  const updateDocGia = `
    UPDATE docgia SET TenDocGia = ?, NgaySinh = ?, GioiTinh = ?, SoDienThoai = ?, DiaChi = ?
    WHERE MaDocGia = ?`;

  db.query(updateDocGia, [TenDocGia, NgaySinh, GioiTinh, SoDienThoai, DiaChi, maDocGia], (err1, result1) => {
    if (err1) {
      console.error('❌ Lỗi khi cập nhật docgia:', err1);
      return res.json({ success: false, message: 'Lỗi khi cập nhật độc giả!' });
    }

    const updateEmail = `UPDATE taikhoan SET Email = ? WHERE MaDocGia = ?`;

    db.query(updateEmail, [Email, maDocGia], (err2, result2) => {
      if (err2) {
        console.error('❌ Lỗi khi cập nhật email:', err2);
        return res.json({ success: false, message: 'Lỗi khi cập nhật email!' });
      }

      // 🟢 Đây là chỗ rất quan trọng
      return res.json({ success: true, message: 'Cập nhật thành công!' });
    });
  });
});


module.exports = router;
