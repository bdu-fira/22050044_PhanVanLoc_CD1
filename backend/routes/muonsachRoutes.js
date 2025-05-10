const express = require('express');
const router = express.Router();
const db = require('../config/db');

///////////////////////////////load///////////////
router.get('/', (req, res) => {
    const sql = `
    SELECT 
      m.MaMuon,
      m.MaSach,
      s.TenSach,
      tg.TenTacGia,
      s.TheLoai,
      dg.TenDocGia,
      m.NgayMuon,
      m.NgayHenTra,
      m.NgayTraThucTe,
      m.TinhTrang
    FROM 
      muonsach m
    JOIN 
      sach s ON m.MaSach = s.MaSach
    LEFT JOIN 
      tacgia tg ON s.MaTacGia = tg.MaTacGia
    JOIN 
      docgia dg ON m.MaDocGia = dg.MaDocGia
    ORDER BY 
      m.MaMuon ASC
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('❌ Lỗi truy vấn mượn sách:', err);
        return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      }
      res.json(results);
    });
  });



////////////////////////////////THÊM///////////////////////////////
router.post('/themMuonsach', (req, res) => {
  const { maDocGia, maSach, ngayMuon, ngayHenTra, tinhTrang } = req.body;

  if (!maDocGia || !maSach || !ngayMuon || !ngayHenTra || !tinhTrang) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
  }

  const query = `
      INSERT INTO muonsach (MaDocGia, MaSach, NgayMuon, NgayHenTra, TinhTrang)
      VALUES (?, ?, ?, ?, ?)
  `;

  // Cập nhật mảng tham số để phù hợp với câu lệnh SQL
  db.query(query, [maDocGia, maSach, ngayMuon, ngayHenTra, tinhTrang], (err, result) => {
      if (err) {
          console.error('Lỗi khi thêm phiếu mượn:', err);
          return res.status(500).json({ message: 'Lỗi khi thêm phiếu mượn' });
      }
      res.json({ message: 'Đã thêm phiếu mượn thành công!' });
  });
});


///////////////////////////////////////sửa/////////////////////////
// Cập nhật thông tin một lượt mượn sách theo ID
// API cập nhật thông tin mượn sách
router.put('/api/muonsach/:id', (req, res) => {
  const { MaDocGia, MaSach, NgayMuon, NgayHenTra, NgayTraThucTe, TinhTrang } = req.body;
  const maMuon = req.params.id;

  // Câu lệnh SQL cập nhật thông tin mượn sách
  const updateMuonSachSQL = `
    UPDATE muonsach
    SET MaDocGia = ?, MaSach = ?, NgayMuon = ?, NgayHenTra = ?, NgayTraThucTe = ?, TinhTrang = ?
    WHERE MaMuon = ?`;

  db.query(updateMuonSachSQL, [MaDocGia, MaSach, NgayMuon, NgayHenTra, NgayTraThucTe, TinhTrang, maMuon], (err, result) => {
    if (err) {
      console.error('❌ Lỗi khi cập nhật mượn sách:', err.message);
      return res.json({ success: false, message: 'Đã có lỗi xảy ra khi cập nhật mượn sách: ' + err.message });
    }

    res.json({ success: true, message: 'Cập nhật thông tin mượn sách thành công!' });
  });
});

/////////////xóa/////////////
// API xoá mượn sách
// Xóa mượn sách theo MaMuon






  
  
  
  

  


















  
  
module.exports = router;
