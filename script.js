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
      // uncheck every radio button of form 2
      const radioButtons = document.querySelectorAll(
        'input[type=radio][name="plan-item-radio"]'
      );
      radioButtons.forEach((elem) => (elem.checked = false));
    }
    // Check if second form is displayed
  } else if (activeStepNumber === 1) {
    let validated = validateStep2();
    if (validated) {
      displayNextForm(currentForm, nextForm);
    }
    // Check if third form is displayed
  } else if (activeStepNumber === 2) {
    // Recolect and display the selected info
    displaySummary(nextForm);
    // Third form does not need to be validated
    displayNextForm(currentForm, nextForm);
    // Toggle next step button to confirm button
    toggleNextStepBtn();
  }
  // else if (activeStepNumber == 3) {
  //   // Display the thank you screen
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
  nextBtn.classList.toggle("confirm-btn");
  if (nextBtn.classList.contains("confirm-btn")) {
    nextBtn.innerText = "Confirm";
  } else {
    nextBtn.innerText = "Next Step";
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
    const selectedItems = currentForm.querySelectorAll(".selected-item");
    selectedItems.forEach((item) => item.classList.remove("selected-item"));
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

// Helper function that creates an error message
function createErrorMsg(inputElem, msg) {
  const previousSibling = inputElem.previousElementSibling;
  const errorElement = previousSibling.querySelector(".small-error");
  errorElement.innerText = msg;
  inputElem.classList.add("invalid-input");
}

// Helper function that removes previous error messages. This is used at onkeydown input attribute
function removeErrorMsg(inputElem) {
  const previousSibling = inputElem.previousElementSibling;
  const errorElement = previousSibling.querySelector(".small-error");
  errorElement.innerText = "";
  inputElem.classList.remove("invalid-input");
}

// FORM 1

// - Validation form for the input fields
// - Error messages
// - Form button function
// - change form state and function for previous form
function validateStep1() {
  const step1Form = document.querySelector('form[name="personal-info"]');
  const nameInput = step1Form.querySelector('input[name="name"]');
  const emailInput = step1Form.querySelector('input[name="email-address"]');
  const phoneNumberInput = step1Form.querySelector(
    'input[name="phone-number"]'
  );
  let formState = true;
  if (!/\w+/.test(nameInput.value)) {
    createErrorMsg(nameInput, "This field is required.");
    formState = false;
  }
  const emailRegexp = /\w+\@[a-z]+\.[a-z]+/;
  if (emailInput.value.length === 0) {
    createErrorMsg(emailInput, "This field is required.");
    formState = false;
  } else if (!emailRegexp.test(emailInput.value)) {
    createErrorMsg(emailInput, "Incorrect format.");
    formState = false;
  }
  const phoneRegexp = /\+[0-9 ]{10,15}/;
  if (phoneNumberInput.value.length == 0) {
    createErrorMsg(phoneNumberInput, "This field is required.");
    formState = false;
  } else if (!phoneRegexp.test(phoneNumberInput.value)) {
    createErrorMsg(phoneNumberInput, "Incorrect format.");
    formState = false;
  }
  // if (formState) {
  //   step1Form.submit();
  // }
  return formState;
}

// FORM 2
// - Function for select only one plan at a time
//    - Make sure nothing changes if the user re selects a plan
// - Function that changes the time lapse plan
// - Form buttons functions
// - change form state and else

function validateStep2() {
  // select radio buttons
  const radioButtons = document.querySelectorAll(
    'input[type=radio][name="plan-item-radio"]'
  );
  // Check if at least one radio button is selected
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return true;
    }
  }
  // Return false if there is no radio button selected
  return false;
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
  // Select ckeckbox buttons
  const checkboxes = document.querySelectorAll(
    'input[type=checkbox][name="add-on-input"]'
  );
  // Event listener for each checkbox
  checkboxes.forEach((elem) => {
    elem.addEventListener("change", (event) => {
      // Adding or removing the selected item layout
      const labelParent = event.target.parentElement;
      if (event.target.checked) {
        labelParent.classList.add("selected-item");
      } else {
        labelParent.classList.remove("selected-item");
      }
    });
  });
});

// Function that toggles between monthly and Yearly plan
const switchElement = document.querySelector("#switch-input");
switchElement.onclick = function () {
  // Set layout to active plan time text
  const switchContainer = document.querySelector(".plan-switch-container");
  switchContainer.childNodes.forEach((child) => {
    if (child.tagName == "P") {
      child.classList.toggle("pricing-type-active");
    }
  });
  // Toggling information of selected plan time
  const monthlyPlanItems = document.querySelectorAll(".monthly-plan-item");
  const yeralyPlanItems = document.querySelectorAll(".yearly-plan-item");
  monthlyPlanItems.forEach((item) => item.classList.toggle("hide-plan-info"));
  yeralyPlanItems.forEach((item) => item.classList.toggle("hide-plan-info"));
};

// FORM 4
const changeBtn = document.querySelector("#change-btn");
changeBtn.onclick = function () {
  goBackBtn.click();
  goBackBtn.click();
};

// Function that recolects and display the entire info
function displaySummary(form) {
  // Initialization of total price variable
  const getPriceRegExp = /[0-9]+/;
  let totalPrice = 0;
  // Get the selected plan information
  const radioButtons = document.querySelectorAll(
    'input[type=radio][name="plan-item-radio"]'
  );
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      const selectedPlanLabel = radioButtons[i].parentElement;
      const planInfo = selectedPlanLabel.querySelector(".plan-info");
      var planName = planInfo.querySelector("h3").innerText;
      // Get the billing pricing (monthly or yearly) that is displayed
      var planPrice = planInfo.querySelector(
        "p:not(.hide-plan-info)"
      ).innerText;
    }
  }
  // Insert the value into the form
  const planSummaryName = document.querySelector("#selected-plan-name");
  planSummaryName.innerText = planName;
  const planSummaryPricing = document.querySelector("#selected-plan-price");
  planSummaryPricing.innerText = planPrice;
  // Adding plan price to total price
  totalPrice += Number(getPriceRegExp.exec(planPrice)[0]);
  // Remove previous add-ons
  const planSummaryContainer = document.querySelector(
    ".plan-summary-container"
  );
  planSummaryContainer
    .querySelectorAll(".add-on-summary-element")
    .forEach((elem) => elem.remove());
  // Get the add-ons
  const addOnButtons = document.querySelectorAll(".add-on-checkbox");
  for (let i = 0; i < addOnButtons.length; i++) {
    let btn = addOnButtons[i];
    if (btn.checked) {
      // Get add-on info
      const selectedAddOnLabel = btn.parentElement;
      const addOnName = selectedAddOnLabel.querySelector("div > h4").innerText;
      const addOnPrice = selectedAddOnLabel.querySelector(
        "small:not(.hide-plan-info)"
      ).innerText;
      // Create and set add on information
      const selectedAddOn = document.createElement("div");
      const selectedAddOnName = document.createElement("p");
      const selectedAddOnPricing = document.createElement("small");
      selectedAddOn.setAttribute(
        "class",
        "selected-add-on add-on-summary-element"
      );
      selectedAddOnPricing.setAttribute("class", "selected-add-on-price");
      selectedAddOnName.innerText = addOnName;
      selectedAddOnPricing.innerText = addOnPrice;
      selectedAddOn.appendChild(selectedAddOnName);
      selectedAddOn.appendChild(selectedAddOnPricing);
      // Insert the add-on info into the summary
      planSummaryContainer.appendChild(selectedAddOn);
      // Adding add-on price to total price
      totalPrice += Number(getPriceRegExp.exec(addOnPrice)[0]);
    }
  }
  // Display the total value
  const totalPriceElement = document.querySelector("#total-price-value");
  totalPriceElement.innerText = planPrice.replace(getPriceRegExp, totalPrice);
}
