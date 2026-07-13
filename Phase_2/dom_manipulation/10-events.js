// ==================================================
// DOM MANIPULATION MASTERY
// Events
//
// Purpose:
// Learn how to respond to user interactions using
// addEventListener().
//
// Includes:
// - Mouse events
// - Keyboard events
// - Input events
// - Change events
// - Submit validation
// - Real-time validation
// ==================================================

// ==================================================
// 1. SELECT REQUIRED ELEMENTS
// ==================================================

// Buttons

const clickButton = document.getElementById("click-btn");

const doubleButton = document.getElementById("double-btn");

const hoverButton = document.getElementById("hover-btn");

const submitButton = document.getElementById("submit-btn");

// Content

const appTitle = document.getElementById("app-title");

const profileImage = document.getElementById("profile-image");

// Form

const form = document.getElementById("user-form");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const countrySelect = document.getElementById("country");

const messageInput = document.getElementById("message");

// Error containers

const nameError = document.getElementById("name-error");

const emailError = document.getElementById("email-error");

const countryError = document.getElementById("country-error");

const messageError = document.getElementById("message-error");

// Debug

console.log({
  clickButton,
  appTitle,
  profileImage,
  form,
  nameInput,
  emailInput,
  countrySelect,
  messageInput,
});

// ==================================================
// 2. CLICK EVENT
//
// Click button
//        ↓
// Change title color
// ==================================================

clickButton.addEventListener("click", () => {
  console.log("BUTTON CLICKED");

  appTitle.style.color = "red";
});

// ==================================================
// 3. DOUBLE CLICK EVENT
// ==================================================

doubleButton.addEventListener("dblclick", () => {
  console.log("DOUBLE CLICK WORKING");

  appTitle.style.backgroundColor = "yellow";
});

// ==================================================
// 4. MOUSE ENTER / LEAVE
//
// Hover image
//        ↓
// Scale image
// ==================================================

profileImage.addEventListener("mouseenter", () => {
  profileImage.style.transform = "scale(1.2)";
});

profileImage.addEventListener("mouseleave", () => {
  profileImage.style.transform = "scale(1)";
});

// ==================================================
// 5. MOUSEOVER / MOUSEOUT
// ==================================================

hoverButton.addEventListener("mouseover", () => {
  hoverButton.style.backgroundColor = "green";
});

hoverButton.addEventListener("mouseout", () => {
  hoverButton.style.backgroundColor = "";
});

// ==================================================
// 6. KEYBOARD EVENTS
// ==================================================

nameInput.addEventListener("keydown", (event) => {
  console.log("Key pressed:", event.key);
});

nameInput.addEventListener("keyup", (event) => {
  console.log("Key released:", event.key);
});

// ==================================================
// 7. VALIDATION HELPER FUNCTIONS
// ==================================================

function showError(input, errorElement, message) {
  input.classList.add("input-error");

  input.classList.remove("input-success");

  errorElement.textContent = message;
}

function showSuccess(input, errorElement) {
  input.classList.remove("input-error");

  input.classList.add("input-success");

  errorElement.textContent = "";
}

// ==================================================
// 8. VALIDATION FUNCTIONS
// ==================================================

function validateName() {
  const value = nameInput.value.trim();

  if (value === "") {
    showError(nameInput, nameError, "Name is required");

    return false;
  }

  if (value.length < 3) {
    showError(nameInput, nameError, "Name must contain at least 3 characters");

    return false;
  }

  showSuccess(nameInput, nameError);

  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();

  if (value === "") {
    showError(emailInput, emailError, "Email is required");

    return false;
  }

  if (!value.includes("@")) {
    showError(emailInput, emailError, "Enter valid email");

    return false;
  }

  showSuccess(emailInput, emailError);

  return true;
}

function validateMessage() {
  const value = messageInput.value.trim();

  if (value.length < 10) {
    showError(messageInput, messageError, "Message must contain 10 characters");

    return false;
  }

  showSuccess(messageInput, messageError);

  return true;
}

// ==================================================
// 9. REAL TIME VALIDATION
//
// User types
//        ↓
// Validate immediately
// ==================================================

nameInput.addEventListener("input", () => {
  validateName();
});

emailInput.addEventListener("input", () => {
  validateEmail();
});

messageInput.addEventListener("input", () => {
  validateMessage();
});

// ==================================================
// 10. CHANGE EVENT
// ==================================================

countrySelect.addEventListener("change", () => {
  console.log("Country:", countrySelect.value);
});

// ==================================================
// 11. SUBMIT EVENT
//
// User clicks submit
//
//        ↓
//
// preventDefault()
//
//        ↓
//
// Validate all fields
//
//        ↓
//
// Success
//
// ==================================================

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValid = validateName();

  const emailValid = validateEmail();

  const messageValid = validateMessage();

  if (!nameValid || !emailValid || !messageValid) {
    console.log("Form contains errors");

    return;
  }

  const formData = {
    name: nameInput.value.trim(),

    email: emailInput.value.trim(),

    country: countrySelect.value,

    message: messageInput.value.trim(),
  };

  console.log("FORM SUCCESS");

  console.table(formData);
});
