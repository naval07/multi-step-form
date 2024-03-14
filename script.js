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

// FORM 1

// - Validation form for the input fields
// - Error messages
// - Form button function
// - change form state and function for previous form

// FORM 2 
// - Function for select only one plan at a time
//    - Make sure nothing changes if the user re selects a plan
// - Function that changes the time lapse plan
// - Form buttons functions
// - change form state and else