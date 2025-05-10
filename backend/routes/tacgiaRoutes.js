const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy tất cả tác giả
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      tg.MaTacGia,
      tg.TenTacGia, 
      tg.GioiTinh, 
      tg.ButDanh, 
      tg.LinhVuc
    FROM 
      tacgia tg
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn lấy tác giả:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    }
    res.json(results);
  });
});
///thêm tác giả
router.post('/themtacgia', (req, res) => {
  const { TenTacGia, GioiTinh, ButDanh, LinhVuc } = req.body;

  const query = 'INSERT INTO tacgia (TenTacGia, GioiTinh, ButDanh, LinhVuc) VALUES (?, ?, ?, ?)';
  db.query(query, [TenTacGia, GioiTinh, ButDanh, LinhVuc], (err, result) => {
      if (err) {
          console.error('Lỗi khi chèn dữ liệu: ', err);
          return res.status(500).send('Lỗi khi thêm tác giả.');
      }
      res.send('Đã thêm tác giả thành công!');
  });
});
////////////////////sửa////////////////
router.put('/api/tacgia/:id', (req, res) => {
  const { TenTacGia, GioiTinh, ButDanh, LinhVuc } = req.body;
  const id = req.params.id;

  const query = 'UPDATE tacgia SET TenTacGia = ?, GioiTinh = ?, ButDanh = ?, LinhVuc = ? WHERE MaTacGia = ?';
  db.query(query, [TenTacGia, GioiTinh, ButDanh, LinhVuc, id], (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật:', err);
      return res.status(500).send('Lỗi cập nhật dữ liệu.');
    }
    res.send('Cập nhật tác giả thành công!');
  });
});

// Xóa tác giả theo MaTacGia
router.delete('/api/tacgia/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM tacgia WHERE MaTacGia = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Lỗi khi xóa tác giả:', err);
      return res.status(500).send('Lỗi khi xóa tác giả.');
    }

    // Trả về chuỗi đơn giản thay vì JSON
    res.send('Đã xóa tác giả thành công!');
  });
});



module.exports = router;
