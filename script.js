// const nextBtn = document.getElementById("next-btn");
// const prevBtn = document.getElementById("prev-btn");

// const form1 = document.querySelector(".element-1");
// const form2 = document.querySelector(".element-2");

// nextBtn.onclick = function () {
//   form1.classList.remove("displayed-form");
//   form1.classList.add("completed-form");

//   form2.classList.remove("waiting-form");
//   form2.classList.add("displayed-form");
// };

// prevBtn.onclick = function () {
//   form2.classList.remove("displayed-form");
//   form2.classList.add("waiting-form");

//   form1.classList.remove("completed-form");
//   form1.classList.add("displayed-form");
// };

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

// Function that changes the layout of the selected label
document.addEventListener("DOMContentLoaded", function () {
  // select radio buttons
  const radioButtons = document.querySelectorAll(
    'input[type=radio][name="plan-item-radio"]'
  );
  // Event listener for each radio button
  radioButtons.forEach((elem) => {
    elem.addEventListener("change", (event) => {
      // Delete previous selected item layout
      const labels = document.querySelectorAll("label.plan-item");
      labels.forEach((l) => {
        l.classList.remove("selected-item");
      });
      // Adding the selected item layout to the new selected item
      const labelParent = event.target.parentElement;
      if (event.target.checked) {
        labelParent.classList.add("selected-item");
      }
    });
  });
});
