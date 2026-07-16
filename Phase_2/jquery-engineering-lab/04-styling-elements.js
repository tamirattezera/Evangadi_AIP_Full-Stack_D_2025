// ============================================================
// jQuery Engineering Lab
// Phase 4: Styling Elements
//
// Purpose:
// Learn how to style HTML elements using jQuery.
//
// Methods:
//
// .css()
// .width()
// .height()
// .show()
// .hide()
// .toggle()
//
// ============================================================

// ============================================================
// 1. SELECT REQUIRED ELEMENTS
// ============================================================

const appTitle = $("#app-title");

const subtitle = $("#subtitle");

const profileImage = $("#profile-image");

const companies = $(".company");

const card = $("#card");

const buttons = $("button");

const footer = $("#footer");

const dashboardCards = $(".card");

// ============================================================
// 2. CHANGE SINGLE CSS PROPERTY
// ============================================================

appTitle.css("color", "crimson");

subtitle.css("color", "royalblue");

// ============================================================
// 3. CHANGE MULTIPLE CSS PROPERTIES
// ============================================================

card.css({
  background: "#eef4ff",

  border: "3px solid royalblue",

  padding: "30px",

  borderRadius: "15px",
});

// ============================================================
// 4. STYLE PROFILE IMAGE
// ============================================================

profileImage.css({
  border: "6px solid royalblue",

  borderRadius: "50%",

  boxShadow: "0 10px 25px rgba(0,0,0,.25)",
});

// ============================================================
// 5. STYLE COMPANY LIST
// ============================================================

companies.css({
  color: "royalblue",

  fontWeight: "bold",

  background: "#dbeafe",
});

// ============================================================
// 6. STYLE BUTTONS
// ============================================================

buttons.css({
  background: "#111827",

  color: "white",

  borderRadius: "10px",
});

// ============================================================
// 7. WIDTH
// ============================================================

profileImage.width(250);

// ============================================================
// 8. HEIGHT
// ============================================================

profileImage.height(250);

// ============================================================
// 9. OPACITY
// ============================================================

profileImage.css("opacity", ".9");

// ============================================================
// 10. HIDE FOOTER
// ============================================================

footer.hide();

// ============================================================
// 11. SHOW FOOTER
// ============================================================

footer.show();

// ============================================================
// 12. TOGGLE FOOTER
// ============================================================

// Uncomment to test

// footer.toggle();

// ============================================================
// 13. LOOP THROUGH DASHBOARD CARDS
// ============================================================

dashboardCards.each(function (index) {
  $(this).css({
    background: "#eef2ff",

    marginBottom: "20px",
  });
});

// ============================================================
// 14. VERIFY
// ============================================================

console.log("========== STYLING COMPLETE ==========");

console.log("Image Width:", profileImage.width());

console.log("Image Height:", profileImage.height());

console.log("Footer Visible:", footer.is(":visible"));
