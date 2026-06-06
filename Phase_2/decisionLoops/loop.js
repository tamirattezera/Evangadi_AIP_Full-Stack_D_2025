// var i = 7;
// if (i <= 10) {
//   console.log("Hello");
// }
// i++;
// if (i <= 10) {
//   console.log("Hello");
// }
// i++;
// if (i <= 10) {
//   console.log("Hello");
// }
// i++;
// if (i <= 10) {
//   console.log("Hello");
// }
// i++;
// if (i <= 10) {
//   console.log("Hello");
// }

// for (i = 7; i <= 10; i++) {
//   console.log("Hello");
// }

// let studentGrades = [12, 89, 90, 78, 99];
// let pass = 50;
// console.log(studentGrades[0]);
// console.log(studentGrades[1]);
// console.log(studentGrades[2]);
// console.log(studentGrades[3]);
// console.log(studentGrades[4]);

// for (i = 0; i < studentGrades.length; i++) {
//   console.log(studentGrades[i]);
// }

// function greetings() {
//   for (let i = 1; i <= 5; i++) {
//     console.log(i + " Hello Class");
//   }
// }

// greetings();

// function print(start, end) {
//   for (let i = start; i <= end; i++) {
//     console.log("Printing Page Number " + i);
//   }
// }
// print(5, 7);
// print(20, 30);

// function listElements(someNumbers) {
//   console.log(someNumbers);
//   for (let i = 0; i < someNumbers.length; ++i) {
//     console.log("Element " + someNumbers[i]);
//   }
// }
// listElements([11, 45, 65, 67, 34, 98, 78]);

// function passOrFail(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
//     if (arr[i] > 50) {
//       console.log("Student " + i + " passes - with the score of i " + arr[i]);
//     }
//   }
// }
// passOrFail([35, 78, 90, 40, 67]);
// const products = [{ name: "Laptop" }, { name: "Phone" }, { name: "Tablet" }];

// for (const product of products) {
//   console.log(product.name);
// }
// const user = {
//   username: "tame",
//   email: "tame@gmail.com",
//   age: 22,
// };

// for (const field in user) {
//   console.log(`Checking ${field}`);
// }
// const settings = {
//   darkMode: true,
//   language: "English",
//   notifications: false,
// };

// for (const key in settings) {
//   console.log(`${key}: ${settings[key]}`);
// }
// const person = {
//   name: "Tame",
//   age: 22,
//   country: "Ethiopia",
// };
// for (const key in person) {
//   //console.log(key);
//   //console.log(person[key]); // Getting the Values
//   console.log(`${key}: ${person[key]}`); // Getting Both Key and Value
// }

// const student = {
//   name: "John",
//   age: 22,
//   Grade: "A",
// };
// for (const students in student) {
//   // console.log(students);
//   // console.log(student[students]);
//   console.log(`${students}: ${student[students]} `);
// }

// const book = {
//   title: "JavaScript",
//   author: "John",
//   pages: 500,
// };
// let count = 0;
// for (const key in book) {
//   count++;
// }
// console.log(count);

// function printNumbers() {
//   let i = 0;
//   while (i <= 5) {
//     console.log("The value of i is ", i);
//     i++;
//   }
// }
// printNumbers();

// function listName(arr) {
//   console.log(arr);
//   let i = 0;

//   while (i < arr.length) {
//     console.log(arr[i] + " is a creative AI-Developer!");
//     i++;
//   }
// }
// listName(["Tamirat", "Eden", "Aklil", "Tofik", "Seble"]);

// function listName2(arr) {
//   let x = true;
//   let i = 0;

//   while (x) {
//     if (arr[i] === "Bob") {
//       x = false;
//     } else {
//       console.log(arr[i]);
//     }
//     i++;
//   }
// }
// listName2(["Tame", "Eden", "Rahel", "John", "Bob", "kaleab"]);

// function addNumbers(a) {
//   if (typeof a !== "number" || a < 0) {
//     return "Invalid Input: Please enter positive numbers.";
//   } else if (a < 0) {
//     return "Please enter only postive number.";
//   } else {
//     var result = 0;
//     for (i = 1; i <= a; i++) {
//       result = result + i;
//     }
//   }
//   return result;
// }
// var added = addNumbers(13);
// console.log(added);

// function addNumbers(a) {
//   if (typeof a !== "number" || a < 0) {
//     return "Invalid Input: Please enter positive numbers.";
//   }
//   let result = 0;
//   for (i = 1; i <= a; i++) {
//     result = result + i;
//   }
//   return result;
// }
// console.log(addNumbers(4));

// // mathematical formula
// function addNumbers2(a) {
//   if (typeof a !== "number" || a < 0) {
//     return "Please enter a positive number.";
//   }

//   return (a * (a + 1)) / 2;
// }

// console.log(addNumbers2(13));

// let i = 1;
// while (i <= num) {
//   sum = sum + i;
//   i++;
// }
// return sum;
// console.log(addNumbers(13));

function generateRandomNumbersUntil(target) {
  console.log("Target:", target);

  let randomNumber;
  let count = 0;

  while (randomNumber !== target) {
    randomNumber = Math.floor(Math.random() * 10); // 0-9

    console.log("Generated:", randomNumber);
    count++;
  }

  console.log("Target number", target, "found after", count, "attempts");
}

generateRandomNumbersUntil(1);

function generateRandomNumbersUntil2(target) {
  let randomNumber;

  let count;
  for (count = 0; randomNumber !== target; count++) {
    randomNumber = Math.floor(Math.random() * 10); // 0-9

    console.log("Generated:", randomNumber);
  }
  console.log("Target number", target, "found after", count, "attempts");
}

generateRandomNumbersUntil2(1);
