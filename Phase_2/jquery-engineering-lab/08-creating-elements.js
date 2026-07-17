// ============================================================
// jQuery Engineering Lab
// Phase 8: Creating Elements
//
// Purpose:
// Learn how to create and insert DOM elements dynamically.
//
// Methods:
//
// $("<element>")
// .append()
// .prepend()
// .before()
// .after()
// .appendTo()
// .prependTo()
//
// ============================================================

// ============================================================
// 1. SELECT REQUIRED ELEMENTS
// ============================================================

const companyList = $("#company-list");

const cardSection = $("#card-section");

const card = $("#card");

const container = $("#container");

const dynamicSection = $("#dynamic");

// ============================================================
// 2. CREATE SIMPLE ELEMENT
// ============================================================

// Create new company

const newCompany = $("<li>");

// Add class

newCompany.addClass("company");

// Add text

newCompany.text("Netflix");

// Insert into list

companyList.append(newCompany);

// ============================================================
// 3. CREATE ELEMENT WITH HTML
// ============================================================

const newCard = $(
  `
<div class="dynamic-card">

    <h3>
        AI Engineering
    </h3>

    <p>
        Building intelligent applications with JavaScript and AI.
    </p>

</div>
`,
);

container.append(newCard);

// ============================================================
// 4. PREPEND
// Add element at beginning
// ============================================================

const firstCompany = $("<li>");

firstCompany.addClass("company").text("Google Studio");

companyList.prepend(firstCompany);

// ============================================================
// 5. BEFORE
// Insert before element
// ============================================================

const message = $("<p>");

message.text("Companies powered by AI:");

companyList.before(message);

// ============================================================
// 6. AFTER
// Insert after element
// ============================================================

const info = $("<p>");

info.text("More companies coming soon...");

companyList.after(info);

// ============================================================
// 7. APPEND TO
// ============================================================

const button = $("<button>");

button.text("Dynamic Button");

button.addClass("dynamic-button");

button.appendTo(dynamicSection);

// ============================================================
// 8. PREPEND TO
// ============================================================

const heading = $("<h2>");

heading.text("jQuery Dynamic Section");

heading.prependTo(dynamicSection);

// ============================================================
// 9. CREATE MULTIPLE ELEMENTS USING LOOP
// ============================================================

const technologies = ["jQuery", "JavaScript", "React", "Node.js", "Python"];

technologies.forEach((tech) => {
  const item = $("<li>");

  item.addClass("company").text(tech);

  companyList.append(item);
});

// ============================================================
// 10. CREATE CARD COMPONENT
// ============================================================

const productCard = $(
  `
<div class="dynamic-card">

    <h3>
        AI Portfolio Builder
    </h3>

    <p>
        Create professional developer portfolios.
    </p>

    <button>
        View Project
    </button>

</div>
`,
);

cardSection.append(productCard);

// ============================================================
// 11. VERIFY
// ============================================================

console.log("Companies:", companyList.children().length);

console.log("Dynamic Elements:", container.children().length);
