const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

const form1 = document.querySelector(".element-1");
const form2 = document.querySelector(".element-2");

nextBtn.onclick = function () {
  form1.classList.remove("displayed-form");
  form1.classList.add("completed-form");

  form2.classList.remove("waiting-form");
  form2.classList.add("displayed-form");
};

prevBtn.onclick = function () {
  form2.classList.remove("displayed-form");
  form2.classList.add("waiting-form");

  form1.classList.remove("completed-form");
  form1.classList.add("displayed-form");
};
