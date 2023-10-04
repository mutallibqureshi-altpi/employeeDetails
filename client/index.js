const btn = document.querySelector("button");
const inputVal1 = document.getElementById("input-box1");
const inputVal2 = document.getElementById("input-box2");
const dropdown1 = document.getElementById("dropdown1");
const dropdown2 = document.getElementById("dropdown2");
const dropdown3 = document.getElementById("dropdown3");
const dropdown = document.querySelectorAll("select");
console.log(dropdown);
const submitBtn = () => {
  console.log(dropdown1.value);
  console.log(dropdown2.value);
  console.log(dropdown3.value);
  console.log(inputVal1.value);
  console.log(inputVal2.value);
  // if (inputVal1.value === "" || inputVal2 === "") {
  //   alert("require");
  // }
};

btn.addEventListener("click", submitBtn);
