const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const app = express();

// Router imports
const qldocgiaRoutes = require('./routes/docgiaRoutes');
const tacGiaRouter = require('./routes/tacgiaRoutes');
const nhaxuatbanRouter = require('./routes/nxbRoutes');
const sachRoutes = require('./routes/sachRoutes');
const muonsachRoutes = require('./routes/muonsachRoutes');
const thongkeRoutes = require('./routes/thongkeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const duyetDG = require('./routes/duyetDG');
const index = require('./routes/index');



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
// Frontend static path
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// Route definitions
app.use('/api/docgia', qldocgiaRoutes);
app.use('/api/tacgia', tacGiaRouter);
app.use('/api/nhaxuatban', nhaxuatbanRouter);
app.use('/api/sach', sachRoutes);
app.use('/api/muonsach', muonsachRoutes);
app.use('/api/thongke', thongkeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/duyetDG', duyetDG);
app.use('/api/index', index);



// Đăng nhập
app.get('/login', (req, res) => {
  res.sendFile(path.join(frontendPath, 'login.html'));
});


app.use('/', qldocgiaRoutes);
app.use('/', tacGiaRouter);
app.use('/', nhaxuatbanRouter);
app.use('/', sachRoutes);
app.use('/', muonsachRoutes);
app.use('/', thongkeRoutes);
app.use('/', adminRoutes);
app.use('/', duyetDG);
app.use('/', index);


app.delete('/api/muonsach/:id', (req, res) => {
  const maMuon = req.params.id;  // Lấy ID từ URL (ví dụ: /api/muonsach/1)
  console.log(`Xóa mượn sách với ID: ${maMuon}`);

  // Bước 1: Lấy thông tin sách từ bảng `muonsach` trước khi xóa
  const getSachSql = `
    SELECT MaSach
    FROM muonsach
    WHERE MaMuon = ?`;

  db.query(getSachSql, [maMuon], (err, result) => {
    if (err) {
      console.error('❌ Lỗi khi lấy thông tin sách:', err);
      return res.status(500).json({ success: false, message: 'Lỗi khi lấy thông tin sách' });
    }

    if (result.length === 0) {
      console.log('❌ Không tìm thấy bản ghi mượn sách');
      return res.status(404).json({ success: false, message: 'Không tìm thấy bản ghi mượn sách cần xóa' });
    }

    const maSach = result[0].MaSach; // Lấy mã sách từ kết quả truy vấn

    // Bước 2: Cập nhật số lượng sách trong bảng `sach`
    const updateSachSql = `
      UPDATE sach
      SET SoLuong = SoLuong + 1
      WHERE MaSach = ?`;

    db.query(updateSachSql, [maSach], (err2, result2) => {
      if (err2) {
        console.error('❌ Lỗi khi cập nhật số lượng sách:', err2);
        return res.status(500).json({ success: false, message: 'Lỗi khi cập nhật số lượng sách' });
      }

      // Bước 3: Xóa bản ghi mượn sách trong bảng `muonsach`
      const deleteMuonSachSql = `
        DELETE FROM muonsach
        WHERE MaMuon = ?`;

      db.query(deleteMuonSachSql, [maMuon], (err3, result3) => {
        if (err3) {
          console.error('❌ Lỗi khi xóa mượn sách:', err3);
          return res.status(500).json({ success: false, message: 'Lỗi khi xóa mượn sách' });
        }

        if (result3.affectedRows === 0) {
          console.log('❌ Không tìm thấy bản ghi mượn sách để xóa');
          return res.status(404).json({ success: false, message: 'Không tìm thấy bản ghi mượn sách cần xóa' });
        }

        console.log('✅ Xóa mượn sách và cập nhật số lượng sách thành công');
        res.json({ success: true, message: 'Xóa mượn sách và cập nhật số lượng sách thành công' });
      });
    });
  });
});





// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}/login`);
});
