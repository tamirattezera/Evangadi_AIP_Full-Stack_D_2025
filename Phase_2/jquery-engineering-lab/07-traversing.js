// ============================================================
// jQuery Engineering Lab
// Phase 7: Traversing
//
// Purpose:
// Learn how to move around the DOM using jQuery.
//
// Methods:
//
// .parent()
// .children()
// .find()
// .first()
// .last()
// .next()
// .prev()
// .siblings()
// .closest()
// .eq()
//
// ============================================================

// ============================================================
// 1. SELECT REQUIRED ELEMENTS
// ============================================================

const profileImage = $("#profile-image");

const companyList = $("#company-list");

const companies = $(".company");

const cardTitle = $("#card-title");

// ============================================================
// 2. PARENT
// ============================================================

console.log("========== PARENT ==========");

console.log(profileImage.parent());

// ============================================================
// 3. CHILDREN
// ============================================================

console.log("========== CHILDREN ==========");

console.log(companyList.children());

// ============================================================
// 4. FIRST CHILD
// ============================================================

console.log("========== FIRST ==========");

console.log(companies.first());

console.log(companies.first().text());

// ============================================================
// 5. LAST CHILD
// ============================================================

console.log("========== LAST ==========");

console.log(companies.last());

console.log(companies.last().text());

// ============================================================
// 6. NEXT SIBLING
// ============================================================

console.log("========== NEXT ==========");

console.log(companies.first().next());

console.log(companies.first().next().text());

// ============================================================
// 7. PREVIOUS SIBLING
// ============================================================

console.log("========== PREVIOUS ==========");

console.log(companies.last().prev());

console.log(companies.last().prev().text());

// ============================================================
// 8. SIBLINGS
// ============================================================

console.log("========== SIBLINGS ==========");

console.log(companies.eq(2).siblings());

// ============================================================
// 9. FIND
// ============================================================

console.log("========== FIND ==========");

console.log($("#companies").find(".company"));

// ============================================================
// 10. CLOSEST
// ============================================================

console.log("========== CLOSEST ==========");

console.log(cardTitle.closest("section"));

// ============================================================
// 11. EQ
// ============================================================

console.log("========== EQ ==========");

console.log(companies.eq(0).text());

console.log(companies.eq(1).text());

console.log(companies.eq(2).text());

console.log(companies.eq(3).text());

console.log(companies.eq(4).text());

// ============================================================
// 12. LOOP
// ============================================================

console.log("========== LOOP ==========");

companies.each(function (index) {
  console.log(index + 1, $(this).text());
});

// ============================================================
// 13. PRACTICE
// ============================================================

// Parent of profile image

console.log(profileImage.parent());

// First company

console.log(companies.first().text());

// Last company

console.log(companies.last().text());

// Next company

console.log(companies.eq(1).next().text());

// Previous company

console.log(companies.eq(3).prev().text());

// Children of company list

console.log(companyList.children());

// ============================================================
// SUMMARY
// ============================================================

console.log("========== SUMMARY ==========");

console.table({
  companies: companies.length,

  first: companies.first().text(),

  last: companies.last().text(),

  second: companies.eq(1).text(),
});
