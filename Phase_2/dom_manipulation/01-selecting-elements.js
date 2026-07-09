// ============================================================
// DOM MANIPULATION MASTERY
// Phase 1: Selecting Elements
// Purpose:
// Learn how to locate and store references to DOM elements.
// ============================================================

// ============================================================
// 1. SELECTING SINGLE ELEMENTS
// ============================================================

// Application title
const appTitle = document.getElementById("app-title");

// Profile image
const profileImage = document.getElementById("profile-image");

// Username
const username = document.getElementById("username");

// Profession
const profession = document.getElementById("profession");

// User form
const userForm = document.getElementById("user-form");

// Course link
const courseLink = document.getElementById("course-link");

// Data attribute box
const dataBox = document.getElementById("box");

// ============================================================
// 2. SELECTING MULTIPLE ELEMENTS
// ============================================================

// All company list items
const companyItems = document.querySelectorAll(".company");

// First company
const firstCompany = document.querySelector(".company");

// Last company
const lastCompany = document.querySelector("#company-list .company:last-child");

// All buttons
const buttons = document.querySelectorAll("button");

// ============================================================
// 3. SELECTING OTHER ELEMENTS
// ============================================================

// Company list
const companyList = document.getElementById("company-list");

// Footer
const footer = document.querySelector("footer");

// ============================================================
// 4. VERIFY SELECTIONS
// ============================================================

console.log(appTitle);
console.log(profileImage);
console.log(username);
console.log(profession);
console.log(userForm);
console.log(courseLink);
console.log(dataBox);

console.log(companyItems);
console.log(firstCompany);
console.log(lastCompany);

console.log(buttons);

console.log(companyList);
console.log(footer);
