const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../config/db');

// Route để lấy danh sách nhà xuất bản và mã để vào dropdown

  /////////////////////////////////lấy danh sách sách/////////////////////////////////////
  router.get('/', (req, res) => {
    const sql = `
SELECT 
  s.MaSach,
  s.TenSach,
  s.MaNXB,
  nxb.TenNXB,
  s.MaTacGia,
  tg.TenTacGia,
  s.TheLoai,
  s.NamXuatBan,
  s.SoLuong,
  s.Anh
FROM 
  sach s
JOIN 
  nhaxuatban nxb ON s.MaNXB = nxb.MaNXB
JOIN 
  tacgia tg ON s.MaTacGia = tg.MaTacGia
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('❌ Lỗi truy vấn sách:', err);
        return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      }
      res.json(results);
    });
  });
  ///////////////thêm sách///////////////////////////
  router.post('/themsach', (req, res) => {
    const { TenSach, MaTacGia, TheLoai, MaNXB, NamXuatBan, SoLuong, Anh } = req.body;
  
    if (!TenSach || !MaTacGia || !TheLoai || !MaNXB || !NamXuatBan || !SoLuong) {
      return res.status(400).send('Thiếu thông tin bắt buộc');
    }
  
    const query = `
      INSERT INTO sach (TenSach, MaTacGia, TheLoai, MaNXB, NamXuatBan, SoLuong, Anh)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  
    db.query(query, [TenSach, MaTacGia, TheLoai, MaNXB, NamXuatBan, SoLuong, Anh], (err, result) => {
      if (err) {
        console.error('Lỗi khi chèn dữ liệu: ', err);
        return res.status(500).send('Lỗi khi thêm sách.');
      }
      res.send('Đã thêm sách thành công!');
    });
  });
  
  /////////////////////sửa////////////////
  router.put('/api/sach/:id', (req, res) => {
    const { TenSach, TheLoai, MaTacGia, NamXuatBan, SoLuong, MaNXB, Anh } = req.body; // Thêm Anh vào
    const maSach = req.params.id;
  
    const updateSachSQL = `
      UPDATE sach
      SET TenSach = ?, TheLoai = ?, MaTacGia = ?, NamXuatBan = ?, SoLuong = ?, MaNXB = ?, Anh = ? 
      WHERE MaSach = ?
    `;
  
    db.query(updateSachSQL, [TenSach, TheLoai, MaTacGia, NamXuatBan, SoLuong, MaNXB, Anh, maSach], (err, result) => {
      if (err) {
        console.error('❌ Lỗi khi cập nhật sách:', err.message);
        return res.json({ success: false, message: 'Đã có lỗi xảy ra khi cập nhật sách: ' + err.message });
      }
  
      // Trường hợp cập nhật thành công
      res.json({ success: true, message: 'Cập nhật sách thành công' });
    });
  });
  
//////////////////////////////xóa////////////////////////
router.delete('/:id', async (req, res) => {
  const maSach = req.params.id;

  try {
    const [rows] = await db.execute('DELETE FROM Sach WHERE MaSach = ?', [maSach]);
    
    // Kiểm tra xem rows có phải là mảng không và có thuộc tính affectedRows không
    if (!Array.isArray(rows)) {
      return res.status(500).json({ message: 'Lỗi khi xử lý dữ liệu từ cơ sở dữ liệu.' });
    }

    // Kiểm tra affectedRows để xác định xem sách có được xoá không
    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sách để xoá.' });
    }

    res.json({ message: `Đã xoá sách có mã ${maSach}` });
  } catch (error) {
    console.error('❌ Lỗi xoá sách:', error);
    res.status(500).json({ message: 'Đã xóa sách.' });
  }
});

  
  
  

module.exports = router;
