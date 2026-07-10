// =========================================
// DOM MANIPULATION MASTERY
// Styling Elements
// Purpose:
// Learn how to change CSS styles using JavaScript.

// ==========================================
// 1. SELECT REQUIRED ELEMENTS
// ==========================================

const appTitle = document.getElementById("app-title");

const profileImage = document.getElementById("profile-image");

const companyItems = document.querySelectorAll(".company");

const footer = document.querySelector("footer");

// ===========================================
// 2. TEXT COLOR
// ===========================================

// Change text color
appTitle.style.color = "red";

// Change background color
appTitle.style.backgroundColor = "lightyellow";

// font size
appTitle.style.fontSize = "48px";

// padding
appTitle.style.padding = "20px";

// border
appTitle.style.border = "3px solid black";

// border radius
appTitle.style.borderRadius = "12px";

// width
profileImage.style.width = "250px";

// height
profileImage.style.height = "250px";

// Make profile image round
profileImage.style.borderRadius = "50%";

// Opacity
profileImage.style.opacity = "0.8";

// hide footer
// footer.style.display = "none";

// show footer
// footer.style.display = "block";

// hide the footer, wait 3 seconds, show it aagain

// footer.style.display = "none";

// setTimeout(() => {
//   footer.style.display = "block";
// }, 3000);
// style all companies
companyItems.forEach((company) => {
  company.style.color = "blue";
});

/*
1 second → Hide
2 seconds → Show
3 seconds → Hide
4 seconds → Show
*/

// blinking effect
if (footer) {
  setTimeout(() => {
    footer.style.display = "none";

    setTimeout(() => {
      footer.style.display = "block";

      setTimeout(() => {
        footer.style.display = "none";

        setTimeout(() => {
          footer.style.display = "block";
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

// Multiple Styles
companyItems.forEach((company) => {
  company.style.color = "blue";
  company.backgroundColor = "#f5f5f5";
  company.style.padding = "10px";
  company.style.borderRadius = "8px";
});

// ========================================
// VERIFY STYLE
// ========================================

console.log(appTitle.style.color);

console.log(profileImage.style.borderRadius);

console.log(footer.style.display);
