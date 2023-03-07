const result = document.getElementById("js-result");
const tempResult = document.getElementById("js-temp-result");
const btns = [...document.querySelectorAll(".number-grid button")];
const notAllowValue = ["RESET", "=", "DEL"];
const themeRadios = [...document.querySelectorAll("input[type='radio']")];
const title = document.querySelector(".switch-toggle .title");
const themeNums = document.querySelectorAll(".numbers span");
const logo = document.querySelector(".logo");


let expression = ""; // used in operations
let tempExpression = ""; // used when del after evaluate;
let tempNum; // totalVal
let gotDecimal = false;
let isEvaluate = false;
let continueEvaluate = false;
let func;
let operators = ["+", "-", "*", "/"];

//reset
result.textContent = "";
themeRadios[0].checked = true;
result.style.color = document.documentElement.style.getPropertyValue("--color2");
tempResult.style.color = document.documentElement.style.getPropertyValue("--color2");

// eventlisteners
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {

    if (e.target.value == "DEL") {
      delFunction();
      return;
    }
    if(e.target.value == "RESET") {
      reset();
      return;
    }
    if(e.target.value == "=") {
      // function
      evaluate();
      return;
    }
    tempExpression = "";


    if (isEvaluate && operators.indexOf(btn.value) == -1) {
      reset();
    }
    else if(isEvaluate && operators.indexOf(btn.value) != -1) {
      isEvaluate = false;
      continueEvaluate = true;
    }


    expression = checkExpression(expression, e.target.value);
    try {
      func = Function(`return ${expression}`);
    } catch(error) {
    }
    tempNum = func();
    tempNum = countDecimals(tempNum) > 3 ? toFixed(tempNum, 3) : tempNum;
    if(tempNum === Infinity) {
      result.style.color = "red";
      tempResult.style.color = "red";
      tempResult.textContent = "Can't divide by 0";
    }
    else {
      result.style.color = document.documentElement.style.getPropertyValue("--color2");
      tempResult.style.color = document.documentElement.style.getPropertyValue("--color2");
      tempResult.textContent = tempNum;
    }
  });
});

themeRadios.forEach(radio => {
  radio.addEventListener("click", (e) => {
    changeThemes(e.target.id);
  })
});

/*
  function toFixed
    set the amount of decimal places
    number(double)
    n: the amount of decimal places
    exp: toFixed(100.33, 1) => 100.3
*/
function toFixed(number, n) {
  return parseInt(number * 10 ** n) / 10 ** n;
}

function countDecimals(value) {
  if(value === Infinity) {
    return;
  }

  if((value % 1) != 0) {
    return value.toString().split(".")[1].length;
  }
  return 0;
}


function checkExpression(expression, userInput) {

  // when str is empty, cannot add operators(besides + and -, indicates positive and negative)
  if (expression.length == 0) {
    if (userInput == "*" || userInput == "/") {
      return;
    } else {
      expression += userInput;
      result.textContent = changeInputLook(userInput);
    }
  }
  else if (expression.length > 0) {
    // if not operators, then add the number to the expression
    if (operators.indexOf(userInput) == -1) {
      

      if(userInput == ".") {
        if(operators.indexOf(expression[expression.length - 1]) == ".") {
          expression = expression.slice(0, -1) + userInput;
          result.textContent = result.textContent.slice(0, -1) + changeInputLook(userInput);
        }
        else {
          if(gotDecimal) {
            expression += "";
            result.textContent += "";
          }
          else {
            expression += userInput;
            result.textContent += changeInputLook(userInput);
            gotDecimal = true;
          }
        }
      }
      else {
        expression += userInput;
        result.textContent += changeInputLook(userInput);
      }
    } 

    // if userinput is operator, then check if last char is an operator, if not, then just add it in
    else if (operators.indexOf(userInput) != -1) {
      gotDecimal = false;
      if(continueEvaluate) {
        expression = tempNum;
        continueEvaluate = false;
      }
      if (operators.indexOf(expression[expression.length - 1]) != -1) {
        expression = expression.slice(0, -1) + userInput;
        result.textContent = expression.slice(0, -1) + changeInputLook(userInput);
      } 
      else {
        expression += userInput;
        result.textContent += changeInputLook(userInput);
      }
    }
  }

  return expression;
}



function changeInputLook(userInput) {
  if(userInput == "*") {
    return "×";
  }
  else if(userInput == "/") {
    return "÷";
  }
  else if(userInput == "-") {
    return "−"
  }
  return userInput;
}

function reset() {
  expression = "";
  result.textContent = "";
  tempResult.textContent = "";
  tempNum = "";
  isEvaluate = false;
  continueEvaluate = false;
}

function del(expression) {
  return expression.slice(0, -1);
}

function delFunction() {
  // if the user evaluate and press del, it's gonna expand the expression and del
  // if the user evaluate and press buttons other than del, it's gonna reevaluate the expression, del would not go back to the old expression
  if(isEvaluate) {
    isEvaluate = false;
    // not update the expression yet
    result.textContent = tempExpression;
  }
  expression = del(expression);
  result.textContent = del(result.textContent);
  tempResult.textContent = "";
  tempNum = "";

}

function evaluate() {
 
  isEvaluate = true;
  console.log("isEvaluate:", isEvaluate)
  // second answer on the screen 
  // exp: result.textContent, 3 + 6 x 9
  // tempExpression borrows the value from the result context, 
  // in case user clicks on the eval button again
  // empty the tempExpression when the user reset the calc by clicking on the numbers, or continue eval if using the operators
  if(tempExpression != "") {
    return;
  }
  tempExpression = result.textContent;
  result.textContent = tempResult.textContent;
  tempResult.textContent = "";
}

function changeThemes(theme) {
  switch(theme) {
    case "theme1":
      document.documentElement.className = "theme1";
      [title, ...themeNums, logo, result].forEach(el => {
        el.style.color = "var(--color)";
      });
      break;

    case "theme2":
      document.documentElement.className = "theme2";
      [title, ...themeNums, logo, result].forEach(el => {
        el.style.color = "var(--color2)";
      });
      break;

    case "theme3":
      document.documentElement.className = "theme3";
      [title, ...themeNums, logo].forEach(el => {
        el.style.color = "var(--color)";
      });
      break;
  }
}




