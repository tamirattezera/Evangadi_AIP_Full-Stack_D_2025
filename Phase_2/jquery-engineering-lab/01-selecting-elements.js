// ============================================================
// jQuery Engineering Lab
// Phase 1: Selecting Elements
// Purpose:
// Learn how to select HTML elements using jQuery selectors.
// jQuery syntax:
//
// $(selector)
//
// ============================================================

// ============================================================
// 1. SELECT BY ID
// ============================================================

// Vanilla JavaScript:
// document.getElementById("app-title")

// jQuery:
const appTitle = $("#app-title");

console.log("========== APP TITLE ==========");

console.log(appTitle);

console.log("Text:", appTitle.text());

// ============================================================
// 2. SELECT BY CLASS
// ============================================================

// Select all cards

const cards = $(".card");

console.log("========== CARDS ==========");

console.log(cards);

console.log("Total Cards:", cards.length);

// ============================================================
// 3. SELECT BY TAG NAME
// ============================================================

// Select all buttons

const buttons = $("button");

console.log("========== BUTTONS ==========");

console.log(buttons);

console.log("Total Buttons:", buttons.length);

// ============================================================
// 4. SELECT EVERYTHING
// ============================================================

// Select all elements in page

const allElements = $("*");

console.log("========== ALL ELEMENTS ==========");

console.log(allElements.length);

// ============================================================
// 5. DESCENDANT SELECTOR
// ============================================================

// Select all paragraphs inside sections

const sectionParagraphs = $("section p");

console.log("========== SECTION PARAGRAPHS ==========");

console.log(sectionParagraphs);

// ============================================================
// 6. DIRECT CHILD SELECTOR
// ============================================================

// Select direct li children of company list

const companies = $("#company-list > li");

console.log("========== COMPANY LIST ==========");

console.log(companies);

console.log("Companies:", companies.length);

// ============================================================
// 7. FIRST ELEMENT
// ============================================================

// First company

const firstCompany = $(".company:first");

console.log("========== FIRST COMPANY ==========");

console.log(firstCompany.text());

// ============================================================
// 8. LAST ELEMENT
// ============================================================

// Last company

const lastCompany = $(".company:last");

console.log("========== LAST COMPANY ==========");

console.log(lastCompany.text());

// ============================================================
// 9. INDEX SELECTION :eq()
// ============================================================

// Third company

const thirdCompany = $(".company:eq(2)");

console.log("========== THIRD COMPANY ==========");

console.log(thirdCompany.text());

// ============================================================
// 10. EVEN / ODD
// ============================================================

// Even companies

const evenCompanies = $(".company:even");

// Odd companies

const oddCompanies = $(".company:odd");

console.log("========== EVEN COMPANIES ==========");

console.log(evenCompanies);

console.log("========== ODD COMPANIES ==========");

console.log(oddCompanies);

// ============================================================
// 11. CONTAINS TEXT
// ============================================================

// Find company containing AI

const aiCompany = $(".company:contains('AI')");

console.log("========== AI COMPANY ==========");

console.log(aiCompany.text());

// ============================================================
// 12. FORM SELECTOR
// ============================================================

const form = $("#user-form");

console.log("========== FORM ==========");

console.log(form);

// ============================================================
// 13. IMAGE SELECTOR
// ============================================================

const profileImage = $("#profile-image");

console.log("========== IMAGE ==========");

console.log(profileImage);

// ============================================================
// SUMMARY
// ============================================================

console.log("========== SUMMARY ==========");

console.table({
  title: appTitle.length,

  cards: cards.length,

  buttons: buttons.length,

  companies: companies.length,

  form: form.length,

  image: profileImage.length,
});
