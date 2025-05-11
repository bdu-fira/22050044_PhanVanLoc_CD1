-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3307
-- Thời gian đã tạo: Th5 09, 2025 lúc 07:14 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quanlythuvienbdu`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `docgia`
--

CREATE TABLE `docgia` (
  `MaDocGia` int(11) NOT NULL,
  `TenDocGia` varchar(100) NOT NULL,
  `NgaySinh` date DEFAULT NULL,
  `GioiTinh` varchar(10) DEFAULT NULL,
  `SoDienThoai` varchar(15) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `docgia`
--

INSERT INTO `docgia` (`MaDocGia`, `TenDocGia`, `NgaySinh`, `GioiTinh`, `SoDienThoai`, `DiaChi`) VALUES
(1, 'Phan Văn lộc', '2000-03-11', 'Nam', '0232654687', 'bình dương'),
(2, 'Nguyễn Văn Sang', '1995-05-12', 'Nữ', '0905123456', 'Bình Dương'),
(3, 'Nguy?n V?n S?n', '2005-02-01', 'N?', '01234567892', 'Hà N?i'),
(4, 'Lê Văn', '2001-09-25', 'Nữ', '091122330', 'Đồng Nai'),
(5, 'phan văn dinh', '2005-05-09', 'Nam', '0825446321', 'tp.Hồ Chí Minh'),
(6, 'Mã Đức Hoàng', '2004-06-30', 'Nam', '0947568315', 'Bình Dương'),
(7, 'Mã Đức Hoàng', '2004-06-30', 'Nam', '0947568315', 'Bình Dương'),
(8, 'Quách Thị Mĩ Phương', '2005-03-29', 'Nam', '0165468445', 'tp.Hồ Chí Minh'),
(9, 'Trần Vũ Sĩ', '2003-12-14', 'Nữ', '0975648912', 'Bình Dương'),
(10, 'Quách Thị  My', '2002-02-11', 'Nam', '0314895762', 'Bình Dương'),
(11, 'Quách Thị Nguyệt', '2005-02-11', 'Nữ', '0352861275', 'Bình Dương'),
(12, 'Nguyễn Văn A', '2023-01-12', 'Nam', '0234569871', 'tp.Hồ Chí Minh'),
(13, 'Nguyễn Văn B', '2023-01-11', 'Nam', '0234569871', 'tp.Hồ Chí Minh'),
(14, 'Nguyễn Văn C', '2023-01-11', 'Nam', '0825446321', 'tp.Hồ Chí Minh'),
(15, 'Nguyễn Văn Cường', '2023-01-12', 'Nam', '0825446321', 'tp.Hồ Chí Minh'),
(16, 'heloo bà già', '2023-01-12', 'Nam', '0825446321', 'tp.Hồ Chí Minh'),
(17, 'Quách Thị Mĩ', '2004-02-12', 'Nam', '0825446321', 'Bình Dương'),
(18, 'Quách Thị Mĩ Thoa sigowi', '2004-02-12', 'Nữ', '082544458', 'Bình Dương'),
(19, 'Trần Giang Sơn', '2002-02-12', 'Nam', '013245668785', 'tp.Hồ Chí Minh'),
(20, 'abfjwhekgnb', '2002-02-12', 'Nam', '01516548645', 'ugfuwhui'),
(21, 'hlkjdjfvgkiuf', '2004-05-12', 'Nam', '0216548478', 'lhkgftjlk'),
(22, 'Hoàng Minh Tú', '2002-06-12', 'Nam', '025863214', 'dfygtuyhi'),
(23, 'Nguyễn Văn Huy', '2002-05-13', 'Nam', '01565489523', 'Bình Tân'),
(24, 'Phan Văn lộc Minh', '2003-10-20', 'Nam', '013548798789745', 'bình dương'),
(25, 'Phan Đình Dương', '2002-02-20', 'Nam', '0374831530', 'Bình Dương'),
(26, 'phongggggggggggggggg', '2003-06-20', 'Nam', '0232654687', 'bình dương'),
(27, 'kgeoirh', '2001-01-20', 'Nam', '0232654687', 'bình dương'),
(28, 'Quach Thị Thu', '2003-09-20', 'Nam', '0323456456', 'Bình Dương'),
(29, 'kgeoirhgug', '2004-01-20', 'Nam', '0134569785', 'Thủ dầu Một'),
(30, 'Quách Thị Mĩ Mãn', '2005-02-21', 'Nam', '01324568798', 'tp.Hồ Chí Minh'),
(31, 'QUÁCH THỊ THU NÈ', '2003-01-21', 'Nữ', '0123456789', 'tp.Hồ Chí Minh'),
(32, 'QUÁCH THỊ THU NÉ', '2003-01-21', 'Nữ', '0123456789', 'tp.Hồ Chí Minh'),
(33, 'QUÁCH THỊ THU NÉ', '2003-01-21', 'Nữ', '0123456789', 'tp.Hồ Chí Minh'),
(34, 'Nguyễn Văn Núi', '2003-09-22', 'Nam', '0123456789', 'tp.Hồ Chí Minh'),
(35, 'Nguyễn Văn Núi', '2003-09-22', 'Nam', '0123456789', 'tp.Hồ Chí Minh'),
(36, 'Lê Lợi', '2001-10-23', 'Nam', '0825446321', 'tp.Hồ Chí Minh'),
(37, 'Điểu Thị Diễm', '2001-10-22', 'Nữ', '0231456898', 'tp.Hồ Chí Minh'),
(38, 'Quách Thị Vinh', '2003-02-22', 'Nam', '08254448847', 'Bình Dương'),
(39, 'Nguyễn Văn Sơn lamm', '2000-02-23', 'Nam', '01234567892', 'Bình Dương'),
(40, 'Nguyễn Văn h', '2025-04-01', 'Nữ', '01234567892', 'Bình Dương'),
(41, 'Nguyễn Văn h', '2025-04-01', 'Nữ', '01234567892', 'Bình Dương'),
(42, 'Nguyễn Văn hien', '2025-04-01', 'Nữ', '01234567892', 'Bình Dương'),
(43, 'Nguyễn Văn Sơn Thủy Tiên', '2004-02-23', 'Nam', '0123456789', 'tp.Hồ Chí Minh'),
(44, 'Phan Thị Lan Hương', '2000-02-23', 'Nam', '0123456789', 'Hà Nội'),
(45, 'ủa gì vậy', '1990-09-23', 'Nữ', '0123456789', 'tp.Hồ Chí Minh'),
(46, 'uâyfgfwrg', '2001-02-23', 'Nữ', '0123456789', 'tp.Hồ Chí Minh'),
(49, 'em là thu nha mn', '2003-05-23', 'Nữ', '0123456789', 'tp.Hồ Chí Minh'),
(50, 'Quách thị yến nhi', '2002-05-29', 'Nam', '0374831530', 'bình dương'),
(51, 'quách thị yến Ly', '2002-02-23', 'Nữ', '0374831530', 'bình dương'),
(52, 'Hoàng Thị Thành', '2004-02-23', 'Nữ', '0232654687', 'bình dương'),
(53, 'Lễ Văn Vệ', '2004-05-23', 'Nữ', '0123456789', 'Hà Nội'),
(71, 'là lá là', '2006-11-27', 'Nữ', '01234567892', 'tp.Hồ Chí Minh'),
(72, 'Nguyễn Văn Sơn', '2003-05-23', 'Nam', '0234569871', 'tp.Hồ Chí Minh'),
(73, 'Nguyễn Văn Sơn', '2003-05-23', 'Nam', '0234569871', 'tp.Hồ Chí Minh'),
(74, 'Nguyễn Nam Sơn', '2004-01-28', 'Nam', '0234569871', 'tp.Hồ Chí Minh'),
(75, 'Phan Văn Lộc Huy', '2000-02-29', 'Nam', '0374831530', 'bình dương'),
(76, 'Trương Thị Thu Thảo', '2004-03-06', 'Nữ', '0232654687', 'bình dương'),
(77, 'Phan Đình Luyến', '2004-03-14', 'Nam', '0158769446', 'bình dương');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `muonsach`
--

CREATE TABLE `muonsach` (
  `MaMuon` int(11) NOT NULL,
  `MaDocGia` int(11) NOT NULL,
  `MaSach` int(11) NOT NULL,
  `NgayMuon` date NOT NULL,
  `NgayHenTra` date NOT NULL,
  `NgayTraThucTe` date DEFAULT NULL,
  `TinhTrang` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `muonsach`
--

INSERT INTO `muonsach` (`MaMuon`, `MaDocGia`, `MaSach`, `NgayMuon`, `NgayHenTra`, `NgayTraThucTe`, `TinhTrang`) VALUES
(22, 1, 10, '2025-05-01', '2025-05-15', NULL, 'Chưa trả'),
(31, 77, 10, '2025-05-09', '2025-05-23', NULL, 'Chưa trả'),
(32, 75, 2, '2025-05-09', '2025-05-23', NULL, 'Chưa trả'),
(33, 1, 24, '2025-05-09', '2025-05-23', NULL, 'Chờ duyệt');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhaxuatban`
--

CREATE TABLE `nhaxuatban` (
  `MaNXB` int(11) NOT NULL,
  `TenNXB` varchar(255) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `SoDienThoai` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nhaxuatban`
--

INSERT INTO `nhaxuatban` (`MaNXB`, `TenNXB`, `DiaChi`, `SoDienThoai`, `Email`) VALUES
(2, 'Nhà xuất bản Kim đồng', 'tp.Hồ Chí Minh', '0123456789', 'kimdong@bdu.edu.vn'),
(3, 'Nhà xuất bản Lê Hồng Phong', 'Bình Dương', '01234567892', 'docgia@bdu.edu.vn'),
(11, 'Phan Văn Tuấn', 'tp.Hồ Chí Minh', '0825446321', 'eevanc@example.com'),
(12, 'Nhà xuất bản Trẻ', 'Bình Dương', '013546545', 'docgia@bdu.edu.vn'),
(15, 'Nhà xuất bản giáo dục Việt Nam.', 'tp.Hồ Chí Minh', '0123456789', 'NhaxuatbanGDvn@gmail.com'),
(16, 'NXB Giáo Dục Việt Nam', 'Hà Nội, Việt Nam', '024-1234567', 'nxbgdvn@gmail.com'),
(17, 'NXB Hồng Đức', 'Hồ Chí Minh, Việt Nam', '028-2345678', 'nxbhd@gmail.com'),
(18, 'NXB Trẻ', 'Hà Nội, Việt Nam', '024-9876543', 'nxbtre@gmail.com'),
(19, 'NXB Khoa Học Kỹ Thuật', 'Hà Nội, Việt Nam', '024-3456789', 'nxbkht@gmail.com'),
(20, 'NXB Đại Học Quốc Gia', 'Hà Nội, Việt Nam', '024-8765432', 'nxbdhqg@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sach`
--

CREATE TABLE `sach` (
  `MaSach` int(11) NOT NULL,
  `TenSach` varchar(255) NOT NULL,
  `MaTacGia` int(11) DEFAULT NULL,
  `TheLoai` varchar(100) DEFAULT NULL,
  `MaNXB` int(11) DEFAULT NULL,
  `NamXuatBan` date DEFAULT NULL,
  `SoLuong` int(11) DEFAULT NULL,
  `Anh` varchar(500) DEFAULT NULL
) ;

--
-- Đang đổ dữ liệu cho bảng `sach`
--

INSERT INTO `sach` (`MaSach`, `TenSach`, `MaTacGia`, `TheLoai`, `MaNXB`, `NamXuatBan`, `SoLuong`, `Anh`) VALUES
(1, 'Tôi thấy hoa vàng trên cỏ xanh', 5, 'Thơ', 12, '1942-09-01', 12, 'https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-12-tuoi-1.jpg'),
(2, 'Những cuộc phưu lưu của Tom', 5, 'Truyện tranh', 2, '2025-04-10', 1, 'https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-12-tuoi-2.jpg'),
(10, 'Haripoter', 5, 'truyện', 2, '2025-04-11', 5, 'https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-12-tuoi-4.jpg'),
(12, 'Tuổi trẻ đáng giá bao nhiêu?', 5, 'Kỹ năng sống, truyền cảm hứng', 2, '2025-04-09', 6, 'https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-12-tuoi-5.jpg'),
(13, 'Dám bị ghét', 5, 'Tâm lý học, phát triển bản thân', 3, '2006-02-28', 37, 'http://cbqqo.edu.vn/storage/app/public/photos/3/5e51edbec7809.jpg'),
(23, 'Lập Trình C++ Cơ Bản', 16, 'Lập trình', 16, '2023-01-01', 100, 'https://coder.com.vn/wp-content/uploads/2019/12/1_hoc-lap-trinh-truc-tuyen-can-ban-den-nang-cao-11122015-1.jpg'),
(24, 'Lập Trình Java Cơ Bản', 17, 'Lập trình', 17, '2022-05-15', 50, 'https://images.nxbxaydung.com.vn/Picture/2020/biasachnen-0616154230.png'),
(25, 'Lập Trình Python Dành Cho Người Mới Bắt Đầu', 18, 'Lập trình', 18, '2021-08-20', 75, 'https://salt.tikicdn.com/cache/750x750/ts/product/54/e8/22/031f45d5dd5e94556a882d2991690f91.png.webp'),
(26, 'Lập Trình Web với HTML, CSS và JavaScript', 19, 'Lập trình Web', 19, '2020-07-10', 120, 'https://i.ebayimg.com/images/g/rDkAAeSw7e5oDMOL/s-l1600.webp'),
(27, 'Phát Triển Phần Mềm Agile', 20, 'Phát triển phần mềm', 20, '2019-11-30', 201, 'https://salt.tikicdn.com/cache/750x750/ts/product/6c/18/bf/1d089efb0dd499fa8225b4b2c3732951.jpg.webp'),
(32, 'Lập Trình C++ Nâng Cao', 16, 'Lập trình', 16, '2023-03-01', 80, 'https://down-vn.img.susercontent.com/file/64cc384e3cb0b0ef3b42dfa2548c0dbe.webp'),
(33, 'Lập Trình Java Nâng Cao', 17, 'Lập trình', 17, '2022-06-20', 60, 'https://xemsachhay.com/wp-content/uploads/2018/04/12352_p18732.jpg'),
(34, 'Lập Trình Python Cho Dự Án Thực Tế', 18, 'Lập trình', 18, '2021-09-10', 100, 'https://api.vietstem.com/api/Containers/products/download/8e8ebce8-556d-4cd4-9a3f-f9ff6e70e711.jpg'),
(35, 'Phát Triển Web với Node.js', 19, 'Lập trình Web', 19, '2020-04-15', 150, 'https://i.ebayimg.com/images/g/AjwAAOSwzPtlqlNZ/s-l960.webp');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tacgia`
--

CREATE TABLE `tacgia` (
  `MaTacGia` int(11) NOT NULL,
  `TenTacGia` varchar(255) DEFAULT NULL,
  `GioiTinh` varchar(10) DEFAULT NULL,
  `ButDanh` varchar(100) DEFAULT NULL,
  `LinhVuc` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tacgia`
--

INSERT INTO `tacgia` (`MaTacGia`, `TenTacGia`, `GioiTinh`, `ButDanh`, `LinhVuc`) VALUES
(5, 'Hoàng Lý Việt', 'Nữ', '', ''),
(10, 'lê văn minh', 'Nam', '', ''),
(11, 'Cao Thanh Sang', 'Nữ', 'ẻhgteh', 'ferhth'),
(15, 'Nam Cao', 'Nữ', 'không', 'Văn học'),
(16, 'Đoàn Hùng Sơn', NULL, NULL, 'Lập Trình C++'),
(17, 'Nguyễn Thanh Bình', NULL, NULL, 'Lập Trình Java'),
(18, 'Nguyễn Văn Hòa', NULL, NULL, 'Lập Trình Python'),
(19, 'Trần Văn Hùng', NULL, NULL, 'Lập Trình Web'),
(20, 'Nguyễn Thành Nam', NULL, NULL, 'Phát Triển Phần Mềm Agile');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `MaTaiKhoan` int(11) NOT NULL,
  `TenTaiKhoan` varchar(50) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `MaDocGia` int(11) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `MaVaiTro` int(11) DEFAULT NULL,
  `TinhTrang` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`MaTaiKhoan`, `TenTaiKhoan`, `MatKhau`, `MaDocGia`, `Email`, `MaVaiTro`, `TinhTrang`) VALUES
(1, 'admin', '12345', 1, 'admin@bdu.edu.vn', 1, 1),
(2, 'Nguyễn Văn Sang', 'thuthu12345', 2, 'thuthu@bdu.edu.vn', 2, 1),
(3, 'Nguyễn Văn Sơn', '123456', 3, 'thuquach3@gmail.com', 1, 1),
(4, 'Lê Văn', 'admin123', 4, 'eevanc@example.com', 3, 1),
(5, 'phan văn dinh', 'admin123', 5, 'dinhpv@example.com', 3, 1),
(6, 'Mã Đức Hoàng', 'admin123', 6, 'maduchoa@example.com', 3, 1),
(7, 'Mã Đức Hoàng', 'admin123', 7, 'maduchoang@example.com', 3, 1),
(8, 'Quách Thị Mĩ Phương', 'admin123', 8, 'mypthuong@example.com', 3, 1),
(9, 'Trần Vũ Sĩ', 'admin123', 9, 'tranvusi@example.com', 3, 1),
(10, 'Quách Thị  My', 'admin123', 10, 'myqt@example.com', 3, 1),
(11, 'Quách Thị Nguyệt', 'admin123', 11, 'nguyetqt@example.com', 3, 1),
(12, 'Nguyễn Văn A', 'admin123', 12, 'nva@example.com', 3, 1),
(13, 'Nguyễn Văn B', 'admin123', 13, 'nvb@example.com', 3, 1),
(14, 'Nguyễn Văn C', 'admin123', 14, 'nvc@example.com', 3, 1),
(15, 'Nguyễn Văn Cường', 'admin123', 15, 'nvcuong@example.com', 3, 1),
(16, 'qq', 'admin123', 16, 'qquser@example.com', 3, 1),
(17, 'Quách Thị Mĩ', 'admin123', 17, 'myqt2@example.com', 3, 1),
(18, 'Quách Thị Mĩ Thoa sigowi', 'admin123', 18, 'thoasigowi@example.com', 3, 1),
(19, 'Trần Giang Sơn', 'admin123', 19, 'giangson@example.com', 3, 1),
(20, 'abfjwhekgnb', 'admin123', 20, 'random20@example.com', 3, 1),
(21, 'hlkjdjfvgkiuf', 'admin123', 21, 'random21@example.com', 3, 1),
(22, 'Hoàng Minh Tú', 'admin123', 22, 'minhtu@example.com', 3, 1),
(23, 'Nguyễn Văn Huy', 'admin123', 23, 'vanhuy@example.com', 3, 1),
(24, 'Phan Văn lộc Minh', 'admin123', 24, 'locminh@example.com', 3, 1),
(25, 'Phan Đình Dương', 'admin123', 25, 'duongphan@example.com', 3, 1),
(26, 'phongggggggggggggggg', 'admin123', 26, 'phonglong@example.com', 3, 1),
(27, 'kgeoirh', 'admin123', 27, 'kgeoirh27@example.com', 3, 1),
(28, 'Quach Thị Thu', 'admin123', 28, 'quachthu@example.com', 3, 1),
(29, 'kgeoirhgug', 'admin123', 29, 'kgeoirhgug29@example.com', 3, 1),
(30, 'Quách Thị Mĩ Mãn', 'admin123', 30, 'miman@example.com', 3, 1),
(31, 'QUÁCH THỊ THU NÈ', 'admin123', 31, 'thune31@example.com', 3, 1),
(32, 'QUÁCH THỊ THU NÉ', 'admin123', 32, 'thune32@example.com', 3, 1),
(33, 'QUÁCH THỊ THU NÉ', 'admin123', 33, 'thune33@example.com', 3, 1),
(35, 'Nguyễn Văn Núi', 'admin123', 35, 'nui@gmail.com', 3, 1),
(36, 'Lê Lợi', 'admin123', 36, 'LeLoi@gmail.com', 3, 1),
(37, 'Điểu Thị Diễm', 'admin123', 37, 'vndiem@gmail.com', 3, 1),
(38, 'Quách Thị Vinh', 'admin123', 38, 'vinhquach@gmail.com', 3, 1),
(39, 'Nguyễn Văn Sơn lamm', 'admin123', 39, 'SonLam@bdu.edu.vn', 3, 1),
(40, 'Nguyễn Văn h', 'admin123', 40, 'h@gmail.com', 3, 1),
(42, 'Nguyễn Văn hien', '', 42, 'hien@gmail.com', 3, 1),
(43, 'Nguyễn Văn Sơn Thủy Tiên', 'admin123', 43, 'Tien@gmail.com', 3, 1),
(44, 'Phan Thị Lan Hương', 'admin123', 44, 'jisjgiorhg@gmail.com', 3, 1),
(45, 'thử nè má', 'admin123', 45, 'helooooooooooooooooooo@gmail.com', 3, 1),
(46, 'uầy', 'admin123', 46, 'aaaaaaaaaaaaaa@gmail.com', 3, 1),
(49, 'em là thu nha mn', 'admin123', 49, 'thuthu35446@gmail.com', 3, 1),
(50, 'Quách thị yến nhi', '123', 50, 'quachyennhi1302@gmail.com', 3, 1),
(51, 'quách thị yến Ly', '123', 51, 'YenLy@gmaill.com', 3, 1),
(52, 'Hoàng Thị Thành', '123', 52, 'thanhhoang@gmail.com', 3, 1),
(53, 'Lễ Văn Vệ', '123456', 53, 'thuquach@example.com', 3, 0),
(67, 'là lá là', 'admin123', 71, 'lalaa@gmail.com', 3, 0),
(69, 'Nguyễn Văn Sơn', 'admin123', 73, 'Son@bdu.edu.vn', 3, 1),
(70, 'Nguyễn Nam Sơn', 'admin123', 74, 'sơnnguyenbdu.edu.vn', 2, 0),
(71, 'Phan Văn Lộc Huy', '111', 75, 'locloc22@bdu.edu.vn', 3, 1),
(72, 'Trương Thị Thu Thảo', '12345', 76, '22050076@bdu.edu.vn', 3, 1),
(73, 'Phan Đình Luyến', '12345', 77, '22050036@bdu.edu.vn', 3, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vaitro`
--

CREATE TABLE `vaitro` (
  `MaVaiTro` int(11) NOT NULL,
  `TenVaiTro` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `vaitro`
--

INSERT INTO `vaitro` (`MaVaiTro`, `TenVaiTro`) VALUES
(1, 'Admin'),
(2, 'Thủ thư'),
(3, 'Độc giả');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `docgia`
--
ALTER TABLE `docgia`
  ADD PRIMARY KEY (`MaDocGia`);

--
-- Chỉ mục cho bảng `muonsach`
--
ALTER TABLE `muonsach`
  ADD PRIMARY KEY (`MaMuon`),
  ADD KEY `idx_MaDocGia` (`MaDocGia`),
  ADD KEY `idx_MaSach` (`MaSach`);

--
-- Chỉ mục cho bảng `nhaxuatban`
--
ALTER TABLE `nhaxuatban`
  ADD PRIMARY KEY (`MaNXB`);

--
-- Chỉ mục cho bảng `sach`
--
ALTER TABLE `sach`
  ADD PRIMARY KEY (`MaSach`),
  ADD KEY `MaTacGia` (`MaTacGia`),
  ADD KEY `MaNXB` (`MaNXB`);

--
-- Chỉ mục cho bảng `tacgia`
--
ALTER TABLE `tacgia`
  ADD PRIMARY KEY (`MaTacGia`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`MaTaiKhoan`),
  ADD UNIQUE KEY `unique_email` (`Email`),
  ADD KEY `MaDocGia` (`MaDocGia`),
  ADD KEY `MaVaiTro` (`MaVaiTro`);

--
-- Chỉ mục cho bảng `vaitro`
--
ALTER TABLE `vaitro`
  ADD PRIMARY KEY (`MaVaiTro`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `docgia`
--
ALTER TABLE `docgia`
  MODIFY `MaDocGia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT cho bảng `muonsach`
--
ALTER TABLE `muonsach`
  MODIFY `MaMuon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `nhaxuatban`
--
ALTER TABLE `nhaxuatban`
  MODIFY `MaNXB` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `sach`
--
ALTER TABLE `sach`
  MODIFY `MaSach` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tacgia`
--
ALTER TABLE `tacgia`
  MODIFY `MaTacGia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `MaTaiKhoan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `muonsach`
--
ALTER TABLE `muonsach`
  ADD CONSTRAINT `fk_muonsach_docgia` FOREIGN KEY (`MaDocGia`) REFERENCES `docgia` (`MaDocGia`),
  ADD CONSTRAINT `fk_muonsach_sach` FOREIGN KEY (`MaSach`) REFERENCES `sach` (`MaSach`);

--
-- Các ràng buộc cho bảng `sach`
--
ALTER TABLE `sach`
  ADD CONSTRAINT `sach_ibfk_1` FOREIGN KEY (`MaTacGia`) REFERENCES `tacgia` (`MaTacGia`),
  ADD CONSTRAINT `sach_ibfk_2` FOREIGN KEY (`MaNXB`) REFERENCES `nhaxuatban` (`MaNXB`);

--
-- Các ràng buộc cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `taikhoan_ibfk_1` FOREIGN KEY (`MaDocGia`) REFERENCES `docgia` (`MaDocGia`) ON DELETE SET NULL,
  ADD CONSTRAINT `taikhoan_ibfk_2` FOREIGN KEY (`MaVaiTro`) REFERENCES `vaitro` (`MaVaiTro`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
