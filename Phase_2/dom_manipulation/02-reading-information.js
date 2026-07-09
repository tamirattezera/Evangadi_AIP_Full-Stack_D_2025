// ============================================================
// DOM MANIPULATION MASTERY
// Phase 2: Reading Information
// Purpose:
// Learn how to inspect and retrieve information from the DOM.
// ============================================================

// ============================================================
// 1. APPLICATION TITLE
// ============================================================

console.log("========== APP TITLE ==========");

console.log(appTitle);

console.log("ID:", appTitle.id);

console.log("Class:", appTitle.className);

console.log("Text:", appTitle.textContent);

// ============================================================
// 2. PROFILE
// ============================================================

console.log("========== PROFILE ==========");

console.log("Username:", username.textContent);

console.log("Profession:", profession.textContent);

console.log("Image URL:", profileImage.src);

console.log("Alt:", profileImage.alt);

// ============================================================
// 3. COURSE LINK
// ============================================================

console.log("========== COURSE LINK ==========");

console.log("Text:", courseLink.textContent);

console.log("URL:", courseLink.href);

// ============================================================
// 4. COMPANIES
// ============================================================

console.log("========== COMPANIES ==========");

console.log("Total:", companyItems.length);

console.log("First:", firstCompany.textContent);

console.log("Last:", lastCompany.textContent);

companyItems.forEach((company, index) => {
  console.log(`${index + 1}. ${company.textContent}`);
});

// ============================================================
// 5. DATA ATTRIBUTES
// ============================================================

console.log("========== DATA ATTRIBUTES ==========");

console.log(dataBox.dataset);

console.log("User:", dataBox.dataset.user);

console.log("Role:", dataBox.dataset.role);

// ============================================================
// 6. FORM
// ============================================================

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const country = document.getElementById("country");
const message = document.getElementById("message");

console.log("========== FORM ==========");

console.log("Name:", nameInput.value);

console.log("Email:", emailInput.value);

console.log("Country:", country.value);

console.log("Message:", message.value);

// ============================================================
// 7. BUTTONS
// ============================================================

console.log("========== BUTTONS ==========");

console.log("Total Buttons:", buttons.length);

buttons.forEach((button, index) => {
  console.log(`${index + 1}. ${button.textContent}`);
});

// ============================================================
// 8. SUMMARY
// ============================================================

console.table({
  username: username.textContent,
  profession: profession.textContent,
  image: profileImage.src,
  companies: companyItems.length,
});
