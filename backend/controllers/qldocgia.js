const db = require('../config/db');
const express = require('express');
const router = express.Router();

// Controller lấy dữ liệu độc giả kèm email từ bảng taikhoan
const getDanhSachDocGia = (req, res) => {
  const query = `
    SELECT docgia.TenDocGia, docgia.NgaySinh, docgia.GioiTinh, docgia.SoDienThoai, docgia.DiaChi, taikhoan.Email
    FROM docgia
    LEFT JOIN taikhoan ON docgia.MaDocGia = taikhoan.MaDocGia
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu độc giả' });
    }

    res.json(results);
  });
};

module.exports = {
  getDanhSachDocGia
};
// Hàm xóa độc giả
// Hàm xóa độc giả (XÓA MỀM)
// Hàm xóa độc giả (xóa mềm - cập nhật trạng thái)
exports.deleteDocGia = (req, res) => {
  const maDocGia = req.params.MaDocGia;

  const sql = 'UPDATE taikhoan SET TrangThai = ? WHERE MaDocGia = ?';
  db.query(sql, ['deleted', maDocGia], (err) => {
    if (err) {
      console.error('❌ Lỗi khi cập nhật trạng thái:', err);
      return res.status(500).json({ message: 'Không thể xóa độc giả này!' });
    }

    res.json({ message: 'Độc giả đã được đánh dấu là đã xóa!' });
  });
};

//tìm kiếm
// File: controllers/qldocgia.js




//



//
module.exports = router;
