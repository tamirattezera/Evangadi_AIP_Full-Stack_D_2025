// // START

// // Function convertToSeconds(minutes)

// // IF minutes is not a number OR minutes is NaN
// //     return "Invalid input: enter a number"

// // IF minutes < 0
// //     return "Invalid input: minutes cannot be negative"

// // seconds = minutes * 60

// // RETURN seconds

// // END

// function convertToSeconds(minutes) {
//   if (typeof minutes !== "number" || isNaN(minutes)) {
//     return "Invalid input: enter a valid number";
//   }

//   if (minutes < 0) {
//     return "Invalid input: minutes cannot be negative";
//   }

//   let seconds = minutes * 60;

//   return seconds;
// }
// function convertDisplay() {
//   e.preventDefault();
//   let input = document.getElementById("num");
//   let inputValue = input.ariaValueMax;
//   if (inputValue.length === 0) {
//     input.style.background = "gold";
//     input.style.border = " pink 2px solid";
//   } else {
//     input.style.background = "";
//     input.style.border = "";
//     let output = document.getElementById("result");

//     output.textContent = minToSecConveter(inputValue);
//   }
// }
// document.getElementById("minToSec").addEventListener("submit", convertDisplay);

// console.log(convertDisplay());

// // console.log(convertToSeconds(5));
// // console.log(convertToSeconds(0));
// // console.log(convertToSeconds(-2));
// // console.log(convertToSeconds("10"));
// // console.log(convertToSeconds(NaN));

function minSec(mins) {
  if (isNaN(mins)) {
    return "Please enter numerical value";
  } else if (mins <= 0) {
    return "please enter a positive value";
  } else {
    let seconds = mins * 60;
    return seconds;
  }
}
// console.log(minSec(7))
// console.log(minSec("7"))
// console.log(minSec("seven"))

function convertDisplay(e) {
  e.preventDefault();
  let input = document.getElementById("num");

  let inputValue = input.value;
  if (inputValue.length == 0) {
    input.style.background = "pink";
    input.style.border = "red 2px solid";
  } else {
    input.style.background = "";
    input.style.border = "";
    let output = document.getElementById("result");

    output.textContent = minSec(inputValue);
  }
}

document.getElementById("minToSec").addEventListener("submit", convertDisplay);
