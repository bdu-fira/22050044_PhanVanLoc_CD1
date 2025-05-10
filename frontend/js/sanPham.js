
    // Khởi tạo danh sách sản phẩm từ localStorage
    var danhSachSanPham = localStorage.getItem('danhSachSanPham');
    if (danhSachSanPham == null) {
      danhSachSanPham = [];
    } else {
      danhSachSanPham = JSON.parse(danhSachSanPham);
    }
  
    console.log('Danh sách sản phẩm ban đầu:', danhSachSanPham);
  
    // Hàm tạo đối tượng sản phẩm
    function TaoDoiTuongSanPham(maSach, tenSach, theLoai, maNXB, namXuatBan, maTacGia, soLuong, anh) {
      var sanPham = {
          maSach: maSach ? maSach : taoID(),
          tenSach: tenSach,
          theLoai: theLoai,
          maNXB: maNXB,
          namXuatBan: namXuatBan,
          maTacGia: maTacGia,
          soLuong: soLuong,
          anh: anh,
  
          toJson: function () {
              return JSON.stringify(this);
          },
  
          fromJSONDanhSach: function (jsonDanhSachSanPham) {
              var danhSachSanPhamDayDu = [];
              var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
              for (var i = 0; i < danhSachSanPham.length; i++) {
                  var sanpham = danhSachSanPham[i];
                  var sanPhamDayDu = TaoDoiTuongSanPham(
                      sanpham.maSach,
                      sanpham.tenSach,
                      sanpham.theLoai,
                      sanpham.maNXB,
                      sanpham.namXuatBan,
                      sanpham.maTacGia,
                      sanpham.soLuong,
                      sanpham.anh
                  );
                  danhSachSanPhamDayDu.push(sanPhamDayDu);
              }
              return danhSachSanPhamDayDu;
          },
  
          fromJSON: function (json) {
              var doiTuong = JSON.parse(json);
              return TaoDoiTuongSanPham(
                  doiTuong.maSach,
                  doiTuong.tenSach,
                  doiTuong.theLoai,
                  doiTuong.maNXB,
                  doiTuong.namXuatBan,
                  doiTuong.maTacGia,
                  doiTuong.soLuong,
                  doiTuong.anh
              );
          }
      };
  
      return sanPham;
  }
  function chuyenDanhSachDoiTuongSanPhamThanhHTML(danhSachSanPham) {
    var HTMLDanhSachSanPham = '<div class="resource-grid">';
    for (var i = 0; i < danhSachSanPham.length; i++) {
      var sanPham = danhSachSanPham[i];
      var htmlSanPham = chuyenDoiTuongSanPhamThanhHTML(sanPham);
      HTMLDanhSachSanPham += htmlSanPham;
    }
    HTMLDanhSachSanPham += '</div>';
    return HTMLDanhSachSanPham;
  }

  function chuyenDoiTuongSanPhamThanhHTML(sanPham) {
    sanPham = TaoDoiTuongSanPham(
      sanPham.maSach,
      sanPham.tenSach,
      sanPham.theLoai,
      sanPham.maNXB,
      sanPham.namXuatBan,
      sanPham.maTacGia,
      sanPham.soLuong,
      sanPham.anh
    );
  
    var html = '';
    html += '<div class="resource-item">';
    html += '<img src="' + sanPham.anh + '" alt="Ebook">';
    html += '<h3>' + sanPham.tenSach + '</h3>';
    html += '<button onclick="onClickDuaVaoGioHang(\'' + sanPham.maSach + '\')" class="btn btn-primary">Đưa vào giỏ</button>';
    html += '</div>';
    return html;
  }
function laySanPhamTheoId(idSanPham) {
  var sanPham = new Object();
  /* Bước 1: Load toàn bộ danh sách sản phẩm dưới local storage lên */
  var danhSachSanPham = layDanhSachSanPhamDuoiLocalStorage();
  /* Bước 2: Tìm ra đối tượng nào trong danh sách mà có id = idSanPham */
  for (var i = 0; i < danhSachSanPham.length; i++) {
      var sanPhamHienTai = danhSachSanPham[i];
      if (sanPhamHienTai.maSach == idSanPham) {
          sanPham = sanPhamHienTai;
      }
  }
  /* Bước 3: Chuyển đổi tượng thành đối tượng đầy đủ */
  sanPham = TaoDoiTuongSanPham(sanPham.maSach, sanPham.tenSach,sanPham.theLoai,sanPham.maNXB,sanPham.namXuatBan,sanPham.maTacGia,sanPham.soLuong,sanPham.anh,sanPham.id);
  return sanPham;
}










function layDanhSachSanPhamDuoiLocalStorage() {
  /* Bước 1: load json */
  var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');
  /* Bước 2: Chuyển json thành đối tượng */
  var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
  return danhSachSanPham;
}



    // Hàm xử lý khi bấm "Lưu thay đổi"
    function onClickTaoSanPham() {
      console.log('Gọi hàm onClickTaoSanPham()');
  
      var maSach = document.getElementById('EditMaSach').value;
      var tenSach = document.getElementById('EditTenSach').value;
      var theLoai = document.getElementById('EditTheLoai').value;
      var maNXB = document.getElementById('EditNhaXuatBan').value;
      var namXuatBan = document.getElementById('EditNamXuatBan').value;
      var maTacGia = document.getElementById('EditMaTacGia').value;
      var soLuong = parseInt(document.getElementById('EditSoLuong').value);
      var anh = document.getElementById('EditAnh').value;
  
      var sanPhamMoi = TaoDoiTuongSanPham(maSach, tenSach, theLoai, maNXB, namXuatBan, maTacGia, soLuong, anh);
  
      console.log('Sản phẩm mới:', sanPhamMoi);
  
      danhSachSanPham.push(sanPhamMoi);
      console.log('Danh sách sản phẩm sau thêm:', danhSachSanPham);
  
      localStorage.setItem('danhSachSanPham', JSON.stringify(danhSachSanPham));
  
      // Sau khi lưu xong có thể ẩn form hoặc làm các bước khác
      cancelEditForm();
    }
  
    // Hàm huỷ form
    function cancelEditForm() {
      document.getElementById('editFormContainer').style.display = 'none';
      document.querySelector('#editFormContainer form').reset();
    }
    function onClickDuaVaoGioHang(idSanPham) {
      alert('onclick đưa vào giỏ hàng với sản phẩm có ID là: ' + idSanPham);
      var danhSachItemGiohang = layDanhSachItemGioHang();

      /* Bước 4: Thêm item vào danh sách giỏ hàng */
      var coTonTaiTrongDanhSachItemGiohang = false;

      for (var i = 0; i < danhSachItemGiohang.length; i++) {
          var itemGiohangHienTai = danhSachItemGiohang[i];

          // Nếu tồn tại, thì tăng số lượng
          if (itemGiohangHienTai.idSanPham == idSanPham) {
              danhSachItemGiohang[i].soLuong++;
              coTonTaiTrongDanhSachItemGiohang = true;
          }
      }

      /* Nếu không tồn tại -> tạo ra đối tượng và thêm vào danh sách item giỏ hàng */
      if (coTonTaiTrongDanhSachItemGiohang == false) {
          var itemGioHang = TaoDoiTuongItemGiohang(idSanPham, 1);
          danhSachItemGiohang.push(itemGioHang);
      }

      /* Bước 5: Lưu trữ lại vào local storage */
      luuDanhSachItemGioHangVaoLocalStorage(danhSachItemGiohang);

  }    

/////tìm kiếm
function timKiemSanPham() {
  var tuKhoa = document.getElementById('timKiemTenSach').value.toLowerCase().trim();
  var danhSachSanPham = layDanhSachSanPhamDuoiLocalStorage();

  if (!tuKhoa) {
      // Nếu không có từ khóa thì hiển thị lại toàn bộ danh sách
      var html = chuyenDanhSachDoiTuongSanPhamThanhHTML(danhSachSanPham);
      document.getElementById('danhSachHienThiSanPham').innerHTML = html;
      return;
  }

  var ketQuaTimKiem = danhSachSanPham.filter(function (sp) {
      return sp.tenSach.toLowerCase().includes(tuKhoa);
  });

  if (ketQuaTimKiem.length > 0) {
      var html = chuyenDanhSachDoiTuongSanPhamThanhHTML(ketQuaTimKiem);
      document.getElementById('danhSachHienThiSanPham').innerHTML = html;
  } else {
      document.getElementById('danhSachHienThiSanPham').innerHTML = '<p>Không tìm thấy sản phẩm nào.</p>';
  }
}

////////////////chia theo thể loại
function hienThiDanhSachTheLoai() {
  var danhSachSanPham = layDanhSachSanPhamDuoiLocalStorage();
  var danhSachTheLoai = [];

  // Lọc ra các thể loại duy nhất
  for (var i = 0; i < danhSachSanPham.length; i++) {
      var theLoai = danhSachSanPham[i].theLoai;
      if (danhSachTheLoai.indexOf(theLoai) === -1 && theLoai.trim() !== '') {
          danhSachTheLoai.push(theLoai);
      }
  }

  // Render danh sách thể loại vào <ul id="danhSachTheLoai">
  var ul = document.getElementById('danhSachTheLoai');
  ul.innerHTML = ''; // Xóa cũ

  for (var i = 0; i < danhSachTheLoai.length; i++) {
      var li = document.createElement('li');
      li.className = 'theloai';
      li.innerHTML = '<a href="#" onclick="locSanPhamTheoTheLoai(\'' + danhSachTheLoai[i] + '\')">' + danhSachTheLoai[i] + '</a>';
      ul.appendChild(li);
  }
}



