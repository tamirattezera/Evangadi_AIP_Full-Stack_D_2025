// ============================================================
// jQuery Engineering Lab
// Phase 9: Removing & Replacing Elements
// Purpose:
// Learn how to remove, clear, detach, and replace elements.
// Methods:
// .remove()
// .empty()
// .detach()
// .replaceWith()
// .unwrap()
//
// ============================================================

// ============================================================
// 1. SELECT REQUIRED ELEMENTS
// ============================================================

const companyList = $("#company-list");

const companies = $(".company");

const card = $("#card");

const appTitle = $("#app-title");

const container = $("#container");

const courseLink = $("#course-link");

// ============================================================
// 2. REMOVE ELEMENT
// ============================================================

console.log("Removing last company...");

companies.last().remove();

// ============================================================
// 3. REMOVE SPECIFIC COMPANY
// ============================================================

companies.eq(1).remove();

// ============================================================
// 4. EMPTY CONTAINER
// ============================================================

// Create some sample content

container.append("<p>Notification 1</p>");

container.append("<p>Notification 2</p>");

container.append("<p>Notification 3</p>");

console.log("Container before empty:");

// console.log(container.html());

container.empty();

console.log("Container after empty:");

console.log(container.html());

// ============================================================
// 5. DETACH ELEMENT
// ============================================================

const detachedCard = card.detach();

console.log("Card detached:");

console.log(detachedCard);

// ============================================================
// 6. RE-ATTACH DETACHED ELEMENT
// ============================================================

$("#card-section").append(detachedCard);

// ============================================================
// 7. REPLACE TITLE
// ============================================================

appTitle.replaceWith(
  `
<h1 id="app-title" class="highlight">

     jQuery Engineering Lab

</h1>
`,
);

// ============================================================
// 8. REPLACE BUTTON
// ============================================================

courseLink.replaceWith(
  `
<button id="portfolio-btn">

    Visit Portfolio

</button>
`,
);

// ============================================================
// 9. REMOVE WRAPPER
// ============================================================

// Example:
//
// <div class="wrapper">
//      <img>
// </div>
//
// $(".wrapper").unwrap();

// ============================================================
// 10. VERIFY
// ============================================================

console.log("========== VERIFY ==========");

console.log("Companies:");

$("#company-list .company").each(function () {
  console.log($(this).text());
});

console.log("Container:");

console.log(container.html());

console.log("Card Exists:");

console.log($("#card").length);

console.log("Portfolio Button:");

console.log($("#portfolio-btn").length);
