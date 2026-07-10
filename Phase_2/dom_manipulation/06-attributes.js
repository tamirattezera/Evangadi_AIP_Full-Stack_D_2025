// ============================================================
// DOM MANIPULATION MASTERY
// Attributes
//
// Purpose:
// Learn how to:
// - Read HTML attributes
// - Update attributes
// - Add new attributes
// - Remove attributes
// - Check whether attributes exist
// - Compare DOM attributes vs DOM properties
// ============================================================

// ============================================================
// 1. SELECT REQUIRED ELEMENTS
// ============================================================

const profileImage = document.getElementById("profile-image");
const courseLink = document.getElementById("course-link");
const appTitle = document.getElementById("app-title");

// ============================================================
// 2. GET ATTRIBUTES
// ============================================================

console.log("========== GET ATTRIBUTES ==========");

console.log("Image Source:");
console.log(profileImage.getAttribute("src"));

console.log("Image Alt:");
console.log(profileImage.getAttribute("alt"));

console.log("Link URL:");
console.log(courseLink.getAttribute("href"));

console.log("Title ID:");
console.log(appTitle.getAttribute("id"));

// ============================================================
// 3. SET ATTRIBUTES
// ============================================================

// Change profile image
profileImage.setAttribute("src", "https://picsum.photos/id/237/250");

// Change image description
profileImage.setAttribute("alt", "Tamirat Profile Picture");

// Add a new attribute
profileImage.setAttribute("loading", "lazy");

// Change the course link
courseLink.setAttribute("href", "https://github.com");

// ============================================================
// 4. REMOVE ATTRIBUTES
// ============================================================

// Remove target="_blank"
courseLink.removeAttribute("target");

// ============================================================
// 5. CHECK ATTRIBUTES
// ============================================================

console.log("========== HAS ATTRIBUTE ==========");

console.log("Title has id:", appTitle.hasAttribute("id"));

console.log("Link has href:", courseLink.hasAttribute("href"));

console.log("Link has target:", courseLink.hasAttribute("target"));

console.log("Image has alt:", profileImage.hasAttribute("alt"));

console.log("Image has loading:", profileImage.hasAttribute("loading"));

// ============================================================
// 6. VERIFY UPDATED ATTRIBUTES
// ============================================================

console.log("========== UPDATED ATTRIBUTES ==========");

console.log("Image Source:", profileImage.getAttribute("src"));

console.log("Image Alt:", profileImage.getAttribute("alt"));

console.log("Image Loading:", profileImage.getAttribute("loading"));

console.log("Link:", courseLink.getAttribute("href"));

// ============================================================
// 7. ATTRIBUTE VS PROPERTY
// ============================================================
// Most HTML attributes also have DOM properties.
// Learn both approaches because you'll use them frequently.
// ============================================================

console.log("========== DOM PROPERTIES ==========");

console.log("Image src:", profileImage.src);

console.log("Image alt:", profileImage.alt);

console.log("Link href:", courseLink.href);

console.log("Title id:", appTitle.id);

// ============================================================
// 8. READ OPTIONAL ATTRIBUTES
// ============================================================

console.log("========== OPTIONAL ATTRIBUTES ==========");

console.log("Image Width:", profileImage.getAttribute("width"));

console.log("Image Height:", profileImage.getAttribute("height"));

// ============================================================
// 9. DISPLAY ALL IMAGE ATTRIBUTES
// ============================================================
// Every HTML element has an 'attributes' collection.
// This is useful for debugging.
// ============================================================

console.log("========== ALL IMAGE ATTRIBUTES ==========");

for (const attribute of profileImage.attributes) {
  console.log(`${attribute.name}: ${attribute.value}`);
}

// ============================================================
// 10. SUMMARY
// ============================================================

console.table({
  imageSource: profileImage.getAttribute("src"),
  imageAlt: profileImage.getAttribute("alt"),
  imageLoading: profileImage.getAttribute("loading"),
  link: courseLink.getAttribute("href"),
  titleId: appTitle.getAttribute("id"),
});
