const imgPosition = document.querySelectorAll('.aspect-ratio-169 img');
const imgContainer = document.querySelector('.aspect-ratio-169');
const dotItem = document.querySelectorAll('.dot');
let imgNumber = imgPosition.length;
let index = 0;

// Hiển thị ảnh đầu tiên
imgPosition.forEach((image, idx) => {
    image.style.left = `${idx * 100}%`;
    dotItem[idx].addEventListener("click", () => {
        slider(idx);
    });
});

function imgSlide() {
    index++;
    if (index >= imgNumber) index = 0; // Quay lại ảnh đầu
    slider(index);
}

function slider(index) {
    imgPosition.forEach((img) => {
        img.style.transform = `translateX(-${index * 100}%)`; // Dịch ảnh
    });

    // Cập nhật chấm tròn
    document.querySelector(".dot.active").classList.remove("active");
    dotItem[index].classList.add("active");
}

setInterval(imgSlide, 3000); // Tự động chuyển ảnh mỗi 3 giây
