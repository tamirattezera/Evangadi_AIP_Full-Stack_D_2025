// ============================================================
// jQuery Engineering Lab
// Phase 5: Class Manipulation
//
// Purpose:
// Learn how to add, remove, toggle and check CSS classes.
//
// Methods:
//
// .addClass()
// .removeClass()
// .toggleClass()
// .hasClass()
//
// ============================================================

// ============================================================
// 1. SELECT REQUIRED ELEMENTS
// ============================================================

const appTitle = $("#app-title");

const profileImage = $("#profile-image");

const companies = $(".company");

const card = $("#card");

const buttons = $("button");

const footer = $("#footer");

// ============================================================
// 2. ADD CLASS
// ============================================================

appTitle.addClass("highlight");

profileImage.addClass("shadow");

companies.addClass("blue");

// ============================================================
// 3. REMOVE CLASS
// ============================================================

companies.removeClass("green");

// ============================================================
// 4. TOGGLE CLASS
// ============================================================

card.toggleClass("dark");

// ============================================================
// 5. CHECK CLASS
// ============================================================

console.log("Card has dark class:");

console.log(card.hasClass("dark"));

console.log("Title has highlight class:");

console.log(appTitle.hasClass("highlight"));

// ============================================================
// 6. ADD MULTIPLE CLASSES
// ============================================================

buttons.addClass("shadow round");

// ============================================================
// 7. REMOVE MULTIPLE CLASSES
// ============================================================

// Uncomment to test

// buttons.removeClass("shadow round");

// ============================================================
// 8. TOGGLE MULTIPLE CLASSES
// ============================================================

// Uncomment to test

// profileImage.toggleClass("shadow rotate");

// ============================================================
// 9. LOOP THROUGH COMPANY LIST
// ============================================================

companies.each(function (index) {
  if (index % 2 === 0) {
    $(this).addClass("highlight");
  } else {
    $(this).addClass("orange");
  }
});

// ============================================================
// 10. VERIFY
// ============================================================

console.log("========== CLASS MANIPULATION ==========");

console.log("Title:", appTitle.attr("class"));

console.log("Card:", card.attr("class"));

console.log("Image:", profileImage.attr("class"));

companies.each(function () {
  console.log($(this).attr("class"));
});
