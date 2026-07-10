// ============================================================
// DOM MANIPULATION MASTERY
// Removing & Replacing Elements
// Purpose:
// Learn how to remove and replace DOM elements using modern
// DOM APIs.
// ============================================================

// ============================================================
// 1. SELECT REQUIRED ELEMENTS
// ============================================================

const companyList = document.getElementById("company-list");

const profileCard = document.getElementById("profile-card");

const courseLink = document.getElementById("course-link");

// ============================================================
// remove()
// Remove the last company
// ============================================================

// companyList.lastElementChild.remove();

// ============================================================
// removeChild()
// Remove the first company
// ============================================================

// companyList.removeChild(companyList.firstElementChild);

// ============================================================
// replaceWith()
// Replace the second company with OpenAI
// ============================================================

// {
//   const secondCompany = companyList.children[1];
//
//   const newCompany = document.createElement("li");
//
//   newCompany.className = "company green";
//
//   newCompany.textContent = "OpenAI";
//
//   secondCompany.replaceWith(newCompany);
// }

// ============================================================
// replaceChild()
// Replace the third company with Anthropic
// ============================================================

// {
//   const thirdCompany = companyList.children[2];
//
//   const replacement = document.createElement("li");
//
//   replacement.className = "company green";
//
//   replacement.textContent = "Anthropic";
//
//   companyList.replaceChild(replacement, thirdCompany);
// }

// ============================================================
// Replace Course Link
// ============================================================

// {
//   const portfolio = document.createElement("a");
//
//   portfolio.id = "course-link";
//
//   portfolio.className = "course-link";
//
//   portfolio.textContent = "Visit Portfolio";
//
//   portfolio.href = "https://github.com";
//
//   portfolio.target = "_blank";
//
//   courseLink.replaceWith(portfolio);
// }

// ============================================================
// Remove the Entire Profile Card
// ============================================================

// profileCard.remove();

// ============================================================
// Replace Entire Company List
// ============================================================

// {
//   const aiCompanies = [
//     "OpenAI",
//     "Anthropic",
//     "Google DeepMind",
//     "NVIDIA",
//     "Microsoft AI",
//   ];
//
//   companyList.innerHTML = "";
//
//   aiCompanies.forEach((companyName) => {
//     const company = document.createElement("li");
//
//     company.className = "company";
//
//     company.textContent = companyName;
//
//     companyList.append(company);
//   });
// }

// ============================================================
// VERIFY DOM
// ============================================================

console.log("========== COMPANY LIST ==========");

console.log(companyList);

console.log("Children:", companyList.children.length);

console.log("First:", companyList.firstElementChild?.textContent);

console.log("Last:", companyList.lastElementChild?.textContent);
