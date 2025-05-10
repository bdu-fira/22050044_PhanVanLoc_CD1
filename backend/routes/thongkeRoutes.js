const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  // 1. Thống kê sách chung
  const bookSummarySql = `
    SELECT
      (SELECT COUNT(*) FROM sach) AS tongSoSach,
      (SELECT COUNT(*) FROM muonsach WHERE NgayTraThucTe IS NULL) AS sachDangMuon,
      (SELECT COUNT(*) FROM muonsach WHERE NgayTraThucTe IS NOT NULL) AS sachDaTra
  `;
  db.query(bookSummarySql, (err, bookSummaryRows) => {
    if (err) {
      console.error('❌ Lỗi truy vấn thống kê sách chung:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn thống kê sách chung' });
    }
    const bookSummary = bookSummaryRows[0];

    // 2. Thống kê tình trạng mượn sách
    const bookStatusSql = `
      SELECT TinhTrang, COUNT(*) AS soLuong
      FROM muonsach
      GROUP BY TinhTrang
    `;
    db.query(bookStatusSql, (err2, bookStatusRows) => {
      if (err2) {
        console.error('❌ Lỗi truy vấn tình trạng sách:', err2);
        return res.status(500).json({ error: 'Lỗi truy vấn tình trạng sách' });
      }

      // 3. Thống kê tổng quan độc giả chỉ với TinhTrang=1 trong taikhoan
      const readerSummarySql = `
        SELECT
          COUNT(*) AS tongSoDocGia
        FROM docgia dg
        JOIN taikhoan tk
          ON dg.MaDocGia = tk.MaDocGia
         AND tk.TinhTrang = 1
      `;
      db.query(readerSummarySql, (err3, readerSummaryRows) => {
        if (err3) {
          console.error('❌ Lỗi truy vấn tổng số độc giả:', err3);
          return res.status(500).json({ error: 'Lỗi truy vấn tổng số độc giả' });
        }
        const readerSummary = readerSummaryRows[0];

        // 4. Thống kê chi tiết từng độc giả (chỉ TinhTrang=1)
        const readerStatsSql = `
          SELECT
            dg.MaDocGia,
            dg.TenDocGia,
            s.TenSach,
            ms.MaMuon,
            COUNT(ms.MaSach) AS SoLanMuon,
            SUM(CASE WHEN ms.NgayTraThucTe > ms.NgayHenTra THEN 1 ELSE 0 END) AS SoSachTraMuon,
            GROUP_CONCAT(DISTINCT
              CASE
                WHEN ms.TinhTrang NOT LIKE '%Mượn%' AND ms.TinhTrang NOT LIKE '%Đã trả%' THEN ms.TinhTrang
                ELSE NULL
              END
              SEPARATOR ', '
            ) AS TinhTrangSach,
            (SELECT COUNT(*) 
             FROM muonsach ms2 
             WHERE ms2.MaDocGia = dg.MaDocGia) AS TongSoLanMuon 
          FROM docgia dg
          JOIN taikhoan tk ON dg.MaDocGia = tk.MaDocGia AND tk.TinhTrang = 1
          LEFT JOIN muonsach ms ON dg.MaDocGia = ms.MaDocGia
          LEFT JOIN sach s ON ms.MaSach = s.MaSach
          WHERE ms.MaSach IS NOT NULL
          GROUP BY dg.MaDocGia, s.TenSach, ms.MaMuon
          HAVING SoLanMuon > 0;
        `;

        db.query(readerStatsSql, (err4, readerStatsRows) => {
          if (err4) {
            console.error('❌ Lỗi truy vấn thống kê độc giả chi tiết:', err4);
            return res.status(500).json({ error: 'Lỗi truy vấn thống kê độc giả chi tiết' });
          }

          // 5. Thống kê sách mượn theo tháng
          const bookMonthlyStatsSql = `
            SELECT
              s.MaSach,
              s.TenSach,
              COALESCE(b.SoMuonThang, 0) AS SoLuongDaMuonTrongThang,
              CASE
                WHEN COALESCE(b.SoMuonThang, 0) = MAX(COALESCE(b.SoMuonThang, 0)) OVER () THEN 'X'
                ELSE ''
              END AS SachDuocMuonNhieuNhatTrongThang,
              s.SoLuong AS SoLuongConSauKhiMuon
            FROM sach s
            LEFT JOIN (
              SELECT 
                MaSach,
                COUNT(*) AS SoMuonThang
              FROM muonsach
              WHERE YEAR(NgayMuon) = YEAR(CURDATE())
                AND MONTH(NgayMuon) = MONTH(CURDATE())
              GROUP BY MaSach
            ) b USING(MaSach)
            ORDER BY SoLuongDaMuonTrongThang DESC;
          `;

          db.query(bookMonthlyStatsSql, (err5, bookMonthlyStatsRows) => {
            if (err5) {
              console.error('❌ Lỗi truy vấn thống kê sách mượn theo tháng:', err5);
              return res.status(500).json({ error: 'Lỗi truy vấn thống kê sách mượn theo tháng' });
            }

            // 6. Gộp kết quả và trả về
            res.json({
              // Sách
              tongSoSach: bookSummary.tongSoSach,
              sachDangMuon: bookSummary.sachDangMuon,
              sachDaTra: bookSummary.sachDaTra,
              thongKeTinhTrang: bookStatusRows,
              // Độc giả (chỉ tk.TinhTrang=1)
              tongSoDocGia: readerSummary.tongSoDocGia,
              thongKeDocGia: readerStatsRows,
              // Thống kê sách mượn trong tháng
              thongKeSachTheoThang: bookMonthlyStatsRows
            });
          });
        });
      });
    });
  });
});

module.exports = router;
