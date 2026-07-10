// ================================================
// DOM MANIPULATION MASTERY
// Traversing
// Purpose:
// Learn how to navigate between parent, child, and sibiling
// elements in the DOM tree.
//================================================

// ===============================================
// 1. SELECT REQUIRED ELEMENTS
// ===============================================

const profileImage = document.getElementById("profile-image");

const companyList = document.getElementById("company-list");

const firstCompany = document.querySelector(".company");

const thirdCompany = companyList.children[2];

// ===============================================
// PARENT ELEMENT
// ===============================================

console.log(profileImage.parentElement);

// ==============================================
// CHILDREN
// ==============================================

console.log(companyList.children);

console.log(companyList.children[0]);

console.log(companyList.children[1]);

console.log(companyList.children[2]);

// =================================================
// FIRST CHILD
// =================================================

console.log(companyList.firstElementChild);

// ================================================
// LAST CHILD
// ================================================

console.log(companyList.lastElementChild);

// ================================================
// NEXT SIBLING
// ================================================

console.log(firstCompany.nextElementSibling);

// ===============================================
// PREVIOUS SIBLING
// ===============================================

console.log(thirdCompany.previousElementSibling);

// ==============================================
// CLOSEST
// ==============================================

console.log(profileImage.closest(".profile-card"));
