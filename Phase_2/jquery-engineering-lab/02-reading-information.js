// ============================================================
// jQuery Engineering Lab
// Phase 2: Reading Information
//
// Purpose:
// Learn how to read information from the DOM using jQuery.
//
// jQuery Methods
//
// .text()
// .html()
// .val()
// .attr()
// .prop()
// .data()
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

const form = $("#user-form");

const nameInput = $("#name");

const emailInput = $("#email");

const passwordInput = $("#password");

const countrySelect = $("#country");

const messageInput = $("#message");

const userBox = $("#user-box");

// ============================================================
// 2. READ TEXT
// ============================================================

console.log("========== TEXT ==========");

console.log("App Title:", appTitle.text());

console.log("Subtitle:", subtitle.text());

console.log("Username:", username.text());

console.log("Profession:", profession.text());

// ============================================================
// 3. READ HTML
// ============================================================

console.log("========== HTML ==========");

console.log($("#card").html());

// ============================================================
// 4. READ FORM VALUES
// ============================================================

console.log("========== FORM VALUES ==========");

console.log("Name:", nameInput.val());

console.log("Email:", emailInput.val());

console.log("Password:", passwordInput.val());

console.log("Country:", countrySelect.val());

console.log("Message:", messageInput.val());

// ============================================================
// 5. READ ATTRIBUTES
// ============================================================

console.log("========== ATTRIBUTES ==========");

console.log("Image Source:", profileImage.attr("src"));

console.log("Image Alt:", profileImage.attr("alt"));

console.log("Image Width:", profileImage.attr("width"));

console.log("Course Link:", courseLink.attr("href"));

console.log("Target:", courseLink.attr("target"));

// ============================================================
// 6. READ PROPERTIES
// ============================================================

console.log("========== PROPERTIES ==========");

console.log("Name Disabled:", nameInput.prop("disabled"));

console.log("Submit Disabled:", $("#submit-btn").prop("disabled"));

// ============================================================
// 7. READ DATA ATTRIBUTES
// ============================================================

console.log("========== DATA ATTRIBUTES ==========");

console.log("User:", userBox.data("user"));

console.log("Role:", userBox.data("role"));

console.log("Level:", userBox.data("level"));

// ============================================================
// 8. LOOP THROUGH COMPANY LIST
// ============================================================

console.log("========== COMPANY LIST ==========");

companies.each(function (index) {
  console.log(index + 1, $(this).text());
});

// ============================================================
// 9. LOOP THROUGH NAVIGATION
// ============================================================

console.log("========== NAVIGATION ==========");

$(".nav-item").each(function (index) {
  console.log(index + 1, $(this).text());
});

// Company Names

companies.each(function () {
  console.log($(this).text());
});

// Link URL
console.log("Link:", courseLink.attr("href"));

// Data Attributes
console.log(userBox.data());



// ============================================================
// SUMMARY
// ============================================================

console.log("========== SUMMARY ==========");

console.table({
  title: appTitle.text(),

  username: username.text(),

  profession: profession.text(),

  companies: companies.length,

  image: profileImage.attr("src"),

  course: courseLink.attr("href"),

  country: countrySelect.val(),
});
