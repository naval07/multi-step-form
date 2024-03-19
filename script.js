const nextBtn = document.getElementById("next-step-btn");
const goBackBtn = document.getElementById("go-back-btn");
const stepNumbers = document.querySelectorAll(".step-number");
let activeStepNumber = 0;

// Setting the function of the next step button
nextBtn.onclick = function () {
  // Check if the first form is displayed
  let currentForm = document.querySelector(".displayed-form");
  let nextForm = document.querySelector(".waiting-form");
  if (activeStepNumber === 0) {
    let validated = validateStep1();
    if (validated) {
      goBackBtn.style.display = "inline-block";
      displayNextForm(currentForm, nextForm);
    }
  // Check if second form is displayed
  } else if (activeStepNumber === 1) {
    let validated = validateStep2();
    if (validated) {
      displayNextForm(currentForm, nextForm);
    }
  // Check if third form is displayed
  } else if (activeStepNumber === 2) {
    // Third form does not need to be validated
    displayNextForm(currentForm, nextForm);
    // Toggle next step button to confirm button
    toggleNextStepBtn();
  } 
  // else if (activeStepNumber == 3) {
  //   // confirm the entire form
  // }
};

// Helper function to display next form
function displayNextForm(current, next) {
  // Set the current form to completed form
  current.classList.remove("displayed-form");
  current.classList.add("completed-form");
  // Display the next form
  next.classList.remove("waiting-form");
  next.classList.add("displayed-form");
  // Update the form step bar
  stepNumbers[activeStepNumber].classList.remove("step-number-active");
  activeStepNumber += 1;
  stepNumbers[activeStepNumber].classList.add("step-number-active");
}

// Helper function to toggle next step button and confirm button
function toggleNextStepBtn() {
  nextBtn.classList.toggle('confirm-btn');
  if (nextBtn.classList.contains('confirm-btn')) {
    nextBtn.innerText = 'Confirm';
  } else {
    nextBtn.innerText = 'Next Step';
  }
}

// Setting the function of the go back button
goBackBtn.onclick = function () {
  let currentForm = document.querySelector(".displayed-form");
  const stepNumbers = document.querySelectorAll(".step-number");
  // check if step number is > 1
  if (activeStepNumber > 0) {
    // Remove current filled form information
    currentForm.reset();
    // Hide current form
    currentForm.classList.remove("displayed-form");
    currentForm.classList.add("waiting-form");
    // Display previous step form
    const completedForms = document.querySelectorAll(".completed-form");
    let previousForm = completedForms[completedForms.length - 1];
    previousForm.classList.remove("completed-form");
    previousForm.classList.add("displayed-form");
    // Update the form step bar
    stepNumbers[activeStepNumber].classList.remove("step-number-active");
    activeStepNumber -= 1;
    stepNumbers[activeStepNumber].classList.add("step-number-active");
    // Conditional changing features
    if (activeStepNumber === 0) {
      // Hide go back button if went back to first form
      goBackBtn.style.display = "none";
    } else if (activeStepNumber === 2) {
      // Toggle next step button to confirm button on last form
      toggleNextStepBtn();
    }
  }
};

// FORM 1

// - Validation form for the input fields
// - Error messages
// - Form button function
// - change form state and function for previous form
function validateStep1() {
  return true;
}

// FORM 2
// - Function for select only one plan at a time
//    - Make sure nothing changes if the user re selects a plan
// - Function that changes the time lapse plan
// - Form buttons functions
// - change form state and else

function validateStep2() {
  return true;
}

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

// Function that toggles between monthly and Yearly plan
const switchElement = document.querySelector('#switch-input');
switchElement.onclick = function () {
  // Set layout to active plan time text
  const switchContainer = document.querySelector('.plan-switch-container');
  switchContainer.childNodes.forEach((child) => {
    if (child.tagName == 'P') {
      child.classList.toggle("pricing-type-active");
    }
  })
  // Toggling information of selected plan time
  const monthlyPlanItems = document.querySelectorAll('.monthly-plan-item');
  const yeralyPlanItems = document.querySelectorAll('.yearly-plan-item');
  monthlyPlanItems.forEach((item) => item.classList.toggle('hide-plan-info')); yeralyPlanItems.forEach((item) => item.classList.toggle('hide-plan-info'));
}

// FORM 4
const changeBtn = document.querySelector('#change-btn');
changeBtn.onclick = function () {
  goBackBtn.click();
  goBackBtn.click();
}