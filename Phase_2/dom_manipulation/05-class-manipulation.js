// ============================================================
// DOM MANIPULATION MASTERY
// Class Manipulation
// Purpose:
// Learn how to add, remove, toggle, replace, and check CSS classes.
// ============================================================

// ============================================================
// 1. SELECT REQUIRED ELEMENTS
// ============================================================

// Application title
const appTitle = document.getElementById("app-title");

// Profile image
const profileImage = document.getElementById("profile-image");

// All company list items
const companyItems = document.querySelectorAll(".company");

// Card
const card = document.getElementById("card");

// ============================================================
// 2. classList.add()
// Add a new class to an element
// ============================================================

// Add highlight class to the title
appTitle.classList.add("highlight");
// Add rounded class to the image
// profileImage.classList.add("rounded");

// ============================================================
// 3. classList.remove()
// Remove an existing class
// ============================================================

// Remove active class from the card
card.classList.remove("active");

// ============================================================
// 4. classList.toggle()
// Add the class if missing, remove it if it exists
// ============================================================

// Toggle dark mode on the card
card.classList.toggle("dark");

// ============================================================
// 5. classList.contains()
// Check whether an element has a class
// ============================================================

console.log("Title has highlight:", appTitle.classList.contains("highlight"));

console.log("Card has dark:", card.classList.contains("dark"));
if (profileImage.classList.contains("rounded")) {
  console.log("Already rounded");
} else {
  profileImage.classList.add("rounded");
  console.log("Rounded class added.");
}
// ============================================================
// 6. classList.replace()
// Replace one class with another
// ============================================================

// Replace green with blue on every company
companyItems.forEach((company) => {
  company.classList.replace("green", "blue");
});

// ============================================================
// 7. VERIFY CHANGES
// ============================================================

console.log("========== TITLE ==========");
console.log(appTitle.className);
console.log(appTitle.classList);

console.log("========== Profile =========");
console.log(profileImage.className);
console.log(profileImage.classList);

console.log("========== CARD ==========");
console.log(card.className);
console.log(card.classList);

console.log("========== COMPANIES ==========");
companyItems.forEach((company, index) => {
  console.log(`Company ${index + 1}:`, company.className);
});
