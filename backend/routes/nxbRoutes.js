const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy tất cả nhà xuất bản
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      MaNXB,
      TenNXB, 
      DiaChi, 
      SoDienThoai, 
      Email
    FROM 
      nhaxuatban
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn lấy nhà xuất bản:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    }
    res.json(results);
  });
});

/// Thêm nhà xuất bản
router.post('/themnxb', (req, res) => {
  const { TenNXB, DiaChi, SoDienThoai, Email } = req.body;

  const query = 'INSERT INTO nhaxuatban (TenNXB, DiaChi, SoDienThoai, Email) VALUES (?, ?, ?, ?)';
  db.query(query, [TenNXB, DiaChi, SoDienThoai, Email], (err, result) => {
      if (err) {
          console.error('Lỗi khi chèn dữ liệu nhà xuất bản: ', err);
          return res.status(500).send('Lỗi khi thêm nhà xuất bản.');
      }
      res.send('Đã thêm nhà xuất bản thành công!');
  });
});

/// Sửa thông tin nhà xuất bản
router.put('/api/nhaxuatban/:id', (req, res) => {
  const { TenNXB, DiaChi, SoDienThoai, Email } = req.body;
  const id = req.params.id;

  const query = 'UPDATE nhaxuatban SET TenNXB = ?, DiaChi = ?, SoDienThoai = ?, Email = ? WHERE MaNXB = ?';
  db.query(query, [TenNXB, DiaChi, SoDienThoai, Email, id], (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật nhà xuất bản:', err);
      return res.status(500).send('Lỗi cập nhật dữ liệu.');
    }
    res.send('Cập nhật nhà xuất bản thành công!');
  });
});

// Xóa nhà xuất bản theo MaNXB
router.delete('/api/nhaxuatban/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM nhaxuatban WHERE MaNXB = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Lỗi khi xóa nhà xuất bản:', err);
      return res.status(500).send('Lỗi khi xóa nhà xuất bản.');
    }

    res.send('Đã xóa nhà xuất bản thành công!');
  });
});

module.exports = router;
