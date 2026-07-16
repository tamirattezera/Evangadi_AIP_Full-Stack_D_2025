// ============================================================
// jQuery Engineering Lab
// Phase 6: Attributes
//
// Purpose:
// Learn how to read, update, remove, and inspect
// HTML attributes using jQuery.
//
// Methods:
//
// .attr()
// .removeAttr()
// .prop()
// .data()
//
// ============================================================

// ============================================================
// 1. SELECT REQUIRED ELEMENTS
// ============================================================

const appTitle = $("#app-title");

const profileImage = $("#profile-image");

const courseLink = $("#course-link");

const submitButton = $("#submit-btn");

const userBox = $("#user-box");

const countrySelect = $("#country");

// ============================================================
// 2. READ ATTRIBUTES
// ============================================================

console.log("========== READ ATTRIBUTES ==========");

console.log("Image Source:");

console.log(profileImage.attr("src"));

console.log("Image Alt:");

console.log(profileImage.attr("alt"));

console.log("Image Width:");

console.log(profileImage.attr("width"));

console.log("Course Link:");

console.log(courseLink.attr("href"));

console.log("Target:");

console.log(courseLink.attr("target"));

// ============================================================
// 3. CHANGE ATTRIBUTES
// ============================================================

profileImage.attr(
  "src",

  "https://picsum.photos/id/237/250",
);

profileImage.attr(
  "alt",

  "Professional Developer",
);

courseLink.attr(
  "href",

  "https://github.com",
);

courseLink.text("Visit GitHub");

// ============================================================
// 4. CHANGE MULTIPLE ATTRIBUTES
// ============================================================

profileImage.attr({
  width: "250",

  height: "250",

  loading: "lazy",
});

// ============================================================
// 5. REMOVE ATTRIBUTE
// ============================================================

courseLink.removeAttr("target");

// ============================================================
// 6. PROPERTIES
// ============================================================

submitButton.prop("disabled", true);

console.log(
  "Submit Disabled:",

  submitButton.prop("disabled"),
);

// Uncomment to enable

// submitButton.prop("disabled", false");

// ============================================================
// 7. DATA ATTRIBUTES
// ============================================================

console.log("========== DATA ATTRIBUTES ==========");

console.log("User:");

console.log(userBox.data("user"));

console.log("Role:");

console.log(userBox.data("role"));

console.log("Level:");

console.log(userBox.data("level"));

// ============================================================
// 8. MODIFY DATA
// ============================================================

userBox.data("user", "Tamirat");

userBox.data("role", "AI Engineer");

userBox.data("level", "Senior");

// ============================================================
// 9. VERIFY
// ============================================================

console.log("========== VERIFY ==========");

console.log(profileImage.attr("src"));

console.log(profileImage.attr("alt"));

console.log(profileImage.attr("loading"));

console.log(courseLink.attr("href"));

console.log(courseLink.attr("target"));

console.log(submitButton.prop("disabled"));

console.log(userBox.data());
