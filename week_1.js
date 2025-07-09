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
