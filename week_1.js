//define
const mainImgContainer = document.querySelector(".main_img");
const mainImgs = document.querySelectorAll(".main_img_orther");
const btnSilders = document.querySelectorAll(".btn_silder");
const color = document.querySelectorAll(".color_list");
const displayElment = document.getElementById("color_name");
const sold_out = document.querySelector(".sold_out");
const cart_text = document.querySelector(".add_to_cart");
const lable_stock = document.querySelector(".lable_stock");
const process = document.querySelector(".process_body");
const wrapper = document.querySelector(".slider_wrapper");

const dots = document.querySelectorAll(".dot_pagination");

function increase() {
  let plus = document.getElementsByClassName("input_number")[0];

  plus.value = parseInt(plus.value) + 1;
}
function decrease() {
  let plus = document.getElementsByClassName("input_number")[0];

  plus.value = parseInt(plus.value) - 1;
  if (plus.value < 1) {
    plus.value = 0;
  }
}

// active scoll
window.onscroll = function () {
  testscroll();
};

function testscroll() {
  const wrapperRect = wrapper.getBoundingClientRect();

  if (wrapperRect.top < window.innerHeight && wrapperRect.bottom > 0) {
    const items = document.querySelectorAll(".img_item");
    const dots = document.querySelectorAll(".dot_pagination_item");

    let activeIndex = -1;

    // Xác định item nào đang nằm trong viewport
    items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();

      if (
        itemRect.top < window.innerHeight * 0.5 &&
        itemRect.bottom > window.innerHeight * 0.25
      ) {
        activeIndex = index;
      }
    });

    // Xử lý active dot tương ứng
    dots.forEach((dot, i) => {
      if (i === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }
}

//active stock

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".color_list").forEach((el) => {
    el.addEventListener("click", activestock);
  });
});
function activestock(event) {
  const color = document.querySelectorAll(".color_list");
  if (color) {
    color.forEach((element, i) => {
      element.classList.remove("active_color");
    });
  }
  event.currentTarget.classList.add("active_color");

  const selectedColor = event.currentTarget.getAttribute("data-color");
  if (displayElment) {
    if (selectedColor === "Blue" || selectedColor === "Sliver") {
      sold_out.classList.add("active_text");
      cart_text.innerHTML = "Sold Out";
      cart_text.classList.add("active_button");
      lable_stock.innerHTML = "Out of stock";
      process.classList.add("out_stock");
    } else {
      sold_out.classList.remove("active_text");
      cart_text.innerHTML = "Add to Cart";
      lable_stock.innerHTML = "Very low stock";
      process.classList.remove("out_stock");
    }
    displayElment.textContent = selectedColor;
  } else {
    console.log("không thấy");
  }


  
color.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // Tính vị trí cần scroll đến
    const scrollX = mainImgs[index].offsetLeft;

    // Cuộn container đến ảnh tương ứng
    mainImgContainer.scrollTo({
      left: scrollX,
      behavior: "smooth",
    });

    // Cập nhật class active
    color.forEach((b) => b.classList.remove("active_color"));
    btn.classList.add("active_color");
  });
});

}

// open model
function zoom() {
  const btn_zoom = document.querySelector(".btn_zoom");
  const anh = document.querySelector(".zoom_img");
  if (btn_zoom) {
    anh.classList.add("active_display");
    document.body.style.overflow = "hidden";
  }
}
function close_zoom() {
  const btn_close = document.querySelector(".btn_close");
  const anh = document.querySelector(".zoom_img");

  if (btn_close) {
    anh.classList.remove("active_display");
    document.body.style.overflow = "auto";
  }
}
//active ảnh

mainImgContainer.addEventListener("scroll", () => {
  let closestIndex = 0;
  let minDistance = Infinity;
  // thuật toán nhỏ nhất
  mainImgs.forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    const distance = Math.abs(
      rect.left - mainImgContainer.getBoundingClientRect().left
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  // Cập nhật nút active
  btnSilders.forEach((btn, index) => {
    if (index === closestIndex) {
      btn.classList.add("active_img");
    } else {
      btn.classList.remove("active_img");
    }
  });
  //cập nhật nút dots
  const dots = document.querySelectorAll(".dot_pagination");
  dots.forEach((dot, index) => {
    if (index === closestIndex) {
      dot.classList.add("active_dot");
    } else {
      dot.classList.remove("active_dot");
    }
  });
});

btnSilders.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // Tính vị trí cần scroll đến
    const scrollX = mainImgs[index].offsetLeft;

    // Cuộn container đến ảnh tương ứng
    mainImgContainer.scrollTo({
      left: scrollX,
      behavior: "smooth",
    });

    // Cập nhật class active
    btnSilders.forEach((b) => b.classList.remove("active_img"));
    btn.classList.add("active_img");
  });
});




dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const scrollX = mainImgs[index].offsetLeft;

    mainImgContainer.scrollTo({
      left: scrollX,
      behavior: "smooth",
    });

    dots.forEach((b) => b.classList.remove("active_dot"));
    dot.classList.add("active_dot");
  });
});

const endTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
const check = new Date().toLocaleDateString();
console.log(check);
function updateCountdown() {
  const now = new Date().getTime();
  let timeLeft = Math.max(endTime - now, 0);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  // Tách từng số hàng chục và hàng đơn vị
  document.getElementById("day1").textContent = Math.floor(days / 10);
  document.getElementById("day2").textContent = days % 10;

  document.getElementById("hour1").textContent = Math.floor(hours / 10);
  document.getElementById("hour2").textContent = hours % 10;

  document.getElementById("min1").textContent = Math.floor(minutes / 10);
  document.getElementById("min2").textContent = minutes % 10;

  document.getElementById("sec1").textContent = Math.floor(seconds / 10);
  document.getElementById("sec2").textContent = seconds % 10;
}

// Cập nhật mỗi giây
updateCountdown();
setInterval(updateCountdown, 1000);

const main_img_detail = document.querySelector(".slider_img");
const main_img_detail_orther = document.querySelectorAll(".slider_img_item");
const btn_prev = document.querySelector(".pagination_item.prev");
const btn_next = document.querySelector(".pagination_item.next");
const number_item = document.querySelector(".pagination_item.per");
let currentIndex = 0; // Biến lưu vị trí hiện tại

function scrollToIndex(index) {
  if (index >= 0 && index < main_img_detail_orther.length) {
    const scrollX = main_img_detail_orther[index].offsetLeft;
    main_img_detail.scrollTo({
      left: scrollX,
      behavior: "smooth",
    });
    currentIndex = index;
    number_item.innerHTML = currentIndex + 1 + " / 6";
  }
}

// Khi scroll: cập nhật lại currentIndex gần nhất
main_img_detail.addEventListener("scroll", () => {
  let closestIndex = 0;
  let minDistance = Infinity;

  main_img_detail_orther.forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    const distance = Math.abs(
      rect.left - mainImgContainer.getBoundingClientRect().left
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  currentIndex = closestIndex;
  number_item.innerHTML = currentIndex + 1 + "/6";
});

// Xử lý nút prev
btn_prev.addEventListener("click", () => {
  scrollToIndex(currentIndex - 1);
});

// Xử lý nút next
btn_next.addEventListener("click", () => {
  scrollToIndex(currentIndex + 1);
});
