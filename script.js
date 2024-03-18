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

// Setting the function of the next step and go back buttons
const nextBtn = document.getElementById("next-step-btn");
const goBackBtn = document.getElementById("go-back-btn");
let activeStepNumber = 0;

nextBtn.onclick = function () {
  // Check if the first form is displayed
  if (activeStepNumber === 0) {
    let currentForm = document.querySelector(".displayed-form");
    let nextForm = document.querySelector(".waiting-form");
    const stepNumbers = document.querySelectorAll(".step-number");
    if (validateStep1()) {
      goBackBtn.style.display = "inline-block";
      currentForm.classList.remove("displayed-form");
      currentForm.classList.add("completed-form");

      nextForm.classList.remove("waiting-form");
      nextForm.classList.add("displayed-form");

      stepNumbers[activeStepNumber].classList.remove("step-number-active");
      activeStepNumber += 1;
      stepNumbers[activeStepNumber].classList.add("step-number-active");
    }
  }
  // If true
  // validate first form
  // unhide the go back function
  // show next form
  // update the form step state bar
  // If false
  // validate current form
  // show next form
  // update the form step state bar
};

goBackBtn.onclick = function () {
  let currentForm = document.querySelector(".displayed-form");
  let nextForm = document.querySelector(".waiting-form");
  const stepNumbers = document.querySelectorAll(".step-number");
  // check if step number is > 1
  if (activeStepNumber > 0) {
    currentForm.reset();
    currentForm.classList.remove("displayed-form");
    currentForm.classList.add("waiting-form");

    const completedForms = document.querySelectorAll(".completed-form");
    let previousForm = completedForms[completedForms.length - 1];
    previousForm.classList.remove("completed-form");
    previousForm.classList.add("displayed-form");

    stepNumbers[activeStepNumber].classList.remove("step-number-active");
    activeStepNumber -= 1;
    stepNumbers[activeStepNumber].classList.add("step-number-active");

    if (activeStepNumber === 0) {
      goBackBtn.style.display = "none";
    }
  }
  // if True
  // reset and hide current form
  // display the last completed form
  // update the form step state bar
};

function validateStep1() {
  return true;
}

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
