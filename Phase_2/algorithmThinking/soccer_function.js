// Soccer Function
// if the arguments are not a numb add validation checker
// Define a function that takes 3 arguments.
// check if all of the input are positive  return "please provide postive numbers."
// Mutiply the first argument  by 3 && the 2nd argument by 2 & mutliply the third argument by 0
// check if all of the arguments numbers
// if provide the win, lose is postive num return the value.
// add them together

function soccerPoint(win, draw, lose) {
  if (isNaN(win * 3) || isNaN(draw * 1) || isNaN(lose * 0)) {
    return "please enter postive number.";
  } else if (win < 0 || draw < 0 || lose < 0) {
    return "Error: Match results cannot be negative.";
  } else {
    const totalPoints = win * 3 + draw * 1 + lose * 0;
    return totalPoints;
  }
}

console.log(soccerPoint(5, 2, 1));
console.log(soccerPoint(3, 4, 2));
console.log(soccerPoint(-1, 2, 0));
console.log(soccerPoint(2, "two", 1));
