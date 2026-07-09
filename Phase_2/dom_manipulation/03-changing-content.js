// ===============================================
// DOM MANIPULATION MASTERY
// Purpose:
// Learn how to modify DOM content.
// ===============================================

// ===============================================
// 1. SELECT REQUIRED ELEMNTS
// ===============================================
const subTitle = document.getElementById("subtitle");
const username = document.getElementById("username");
const profession = document.getElementById("profession");
const courseLink = document.getElementById("course-link");
const companyItems = document.querySelectorAll("company");
const cardTitle = document.getElementById("card-title");


// =============================================
// 2. CHANGE TEXT CONTENT
// =============================================

// change username
username.textContent = "Tamirat";

// change profession
profession.textContent = "AI Engineer";
courseLink.textContent = "Visit Portfolio";

// change subtitle
subTitle.textContent = "Mastering JavaScript DOM Like A Professional";
// change cardtitle
cardTitle.textContent = "Modern Frontend Engineering";
// company replacement
const aiCompanies = [
  "OpenAI",
  "Anthropic",
  "Google DeepMind",
  "NVIDIA",
  "Microsoft AI",
];
companyItems.forEach((company, index) => {
  company.textContent = aiCompanies[index];
});

// ============================================================
// VERIFY CHANGES
// ============================================================

console.log("========== UPDATED CONTENT ==========");

console.log("Username:", username.textContent);

console.log("Profession:", profession.textContent);

console.log("Link:", courseLink.textContent);


console.log("Companies:");

companyItems.forEach(company => {
    console.log(company.textContent);
});