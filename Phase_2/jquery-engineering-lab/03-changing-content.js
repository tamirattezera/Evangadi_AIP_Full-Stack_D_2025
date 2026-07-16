// ============================================================
// jQuery Engineering Lab
// Phase 3: Changing Content
//
// Purpose:
// Learn how to modify page content using jQuery.
//
// Methods:
//
// .text()
// .html()
// .val()
// .attr()
//
// ============================================================

// ============================================================
// 1. SELECT REQUIRED ELEMENTS
// ============================================================

const appTitle = $("#app-title");

const subtitle = $("#subtitle");

const username = $("#username");

const profession = $("#profession");

const profileImage = $("#profile-image");

const courseLink = $("#course-link");

const companies = $(".company");

const cardTitle = $("#card-title");

const cardDescription = $(".card-description");

const nameInput = $("#name");

const emailInput = $("#email");

const passwordInput = $("#password");

const countrySelect = $("#country");

const messageInput = $("#message");

// ============================================================
// 2. CHANGE TEXT
// ============================================================

appTitle.text("jQuery Engineering Mastery");

subtitle.text("Build Interactive Web Applications");

username.text("Tamirat");

profession.text("AI Engineer");

// ============================================================
// 3. CHANGE HTML
// ============================================================

cardTitle.html("🚀 Modern Frontend Engineering");

cardDescription.html(
  "<strong>Learn jQuery</strong> and build professional applications.",
);

// ============================================================
// 4. CHANGE LINK
// ============================================================

courseLink.text("Visit GitHub");

courseLink.attr("href", "https://github.com");

// ============================================================
// 5. CHANGE IMAGE
// ============================================================

profileImage.attr("src", "https://picsum.photos/id/237/220");

profileImage.attr("alt", "Professional Developer");

// ============================================================
// 6. CHANGE FORM VALUES
// ============================================================

nameInput.val("Tamirat");

emailInput.val("tamirat@example.com");

passwordInput.val("12345678");

countrySelect.val("Canada");

messageInput.val("Welcome to jQuery Engineering Lab.");

// ============================================================
// 7. REPLACE COMPANY LIST
// ============================================================

const aiCompanies = [
  "OpenAI",

  "Anthropic",

  "Google DeepMind",

  "Microsoft AI",

  "NVIDIA",

  "Meta AI",

  "Perplexity",
];

companies.each(function (index) {
  $(this).text(aiCompanies[index]);
});

// ============================================================
// 8. UPDATE DASHBOARD
// ============================================================

$(".count").eq(0).text("2500");

$(".count").eq(1).text("$250,000");

$(".count").eq(2).text("72");

$(".count").eq(3).text("480");

// ============================================================
// 9. UPDATE NOTIFICATIONS
// ============================================================

$(".notification").eq(0).text("Welcome Tamirat");

$(".notification").eq(1).text("Payment Successful");

$(".notification").eq(2).text("AI Portfolio Published");

$(".notification").eq(3).text("New Course Released");

// ============================================================
// 10. VERIFY CHANGES
// ============================================================

console.log("========== UPDATED CONTENT ==========");

console.log("Title:", appTitle.text());

console.log("Username:", username.text());

console.log("Profession:", profession.text());

console.log("Course:", courseLink.text());

console.log("Image:", profileImage.attr("src"));

console.log("Country:", countrySelect.val());

console.log("========== COMPANY LIST ==========");

companies.each(function () {
  console.log($(this).text());
});
