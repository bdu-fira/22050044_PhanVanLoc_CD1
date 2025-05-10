

function layGioHangTuLocalStorage() {
    var gioHang = new Array();

    // Bước 1: lấy json
    var jsonGioHang = localStorage.getItem('gioHang');

    // Bước 2: chuyển json thành đối tượng giỏ hàng
    if (jsonGioHang != null) {
        gioHang = JSON.parse(jsonGioHang);
    }

    return gioHang;
}
function themSanPhamVaoGioHang(idSanPham, gioHang) {
    var gioHangSauKhiDuocThem = gioHang;

    // Bước 1: tạo ra đối tượng item giỏ hàng
    var itemGioHang = TaoDoiTuongItemGioHang(idSanPham, 1);

    // Bước 2: Thêm vào giỏ hàng item mới
    console.log(gioHang);
    gioHangSauKhiDuocThem.push(itemGioHang);

    return gioHangSauKhiDuocThem;
}

function luuGioHangVaoLocalStorage(gioHang) {
    // Bước 1: Chuyển giỏ hàng thành json
    var jsonGioHang = JSON.stringify(gioHang);

    // Bước 2: Lưu json xuống local storage
    localStorage.setItem("gioHang", jsonGioHang);
}
function TaoDoiTuongItemGioHang(idSanPham, soLuong) {
    var itemGioHang = new Object();

    itemGioHang.idSanPham = idSanPham;
    itemGioHang.soLuong = soLuong;

    return itemGioHang;
}

console.log(TaoDoiTuongItemGioHang('123',20))

var keyLocalStorageItemGiohang = 'danhSachItemGioHang';


/* 
Yêu cầu: Lấy ra toàn bộ các item giỏ hàng được lưu trữ trong local storage 
Input: không có 
Output: danh sách toàn bộ item giỏ hàng lưu trữ trong local storage 
*/
function layDanhSachItemGioHang() {
    var danhSachItemGiohang = new Array();

    // Bước 1: Lấy chuỗi JSON lưu trữ trong localStorage
    var jsonDanhSachItemGioHang = localStorage.getItem(keyLocalStorageItemGiohang);

    // Bước 2: Chuyển từ JSON sang danh sách item giỏ hàng
    if (jsonDanhSachItemGioHang != null) {
        danhSachItemGiohang = JSON.parse(jsonDanhSachItemGioHang);
    }

    return danhSachItemGiohang;
}

function luuDanhSachItemGioVaoLocalStorage(danhSachItemGioHang) {
    // Bước 1: Chuyển danh sách thành chuỗi JSON
    var jsonDanhSachItemGioHang = JSON.stringify(danhSachItemGioHang);

    // Bước 2: Lưu vào localStorage
    localStorage.setItem(keyLocalStorageItemGiohang, jsonDanhSachItemGioHang);
}

