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

  console.log(`tempExpression: ${tempExpression}`);
  console.log(`result content: ${result.textContent}`);

  
}

function changeThemes(theme) {
  let style = document.documentElement.style;
  switch(theme) {
    case "theme1":
      style.setProperty("--main-bg", "hsl(0, 0%, 90%)");
      style.setProperty("--toggle-bg", "hsl(0, 5%, 81%)");
      style.setProperty("--keypad-bg", "hsl(0, 5%, 81%)");
      style.setProperty("--screen-bg", "hsl(0, 0%, 93%)");

      style.setProperty("--key-bg", "hsl(45, 7%, 89%);");
      style.setProperty("--key-shadow", " hsl(35, 11%, 61%)");

      style.setProperty("--key-bg2", "hsl(25, 98%, 40%)");
      style.setProperty("--key-shadow2", "hsl(25, 99%, 27%)");

      style.setProperty("--key-bg3", "hsl(185, 42%, 37%)");
      style.setProperty("--key-shadow3", "hsl(185, 58%, 25%)");
      
      style.setProperty("--color", "hsl(60,10%, 19%)");
      style.setProperty("--color2", "hsl(0, 0%, 100%)");

      [title, ...themeNums, logo, result].forEach(el => {
        el.style.color = "var(--color1)";
      })
      break;

    case "theme2":
      style.setProperty("--main-bg", "hsl(222, 26%, 31%)");
      style.setProperty("--toggle-bg", "hsl(223, 31%, 20%)");
      style.setProperty("--keypad-bg", "hsl(223, 31%, 20%)");
      style.setProperty("--screen-bg", "hsl(224, 36%, 15%)");

      style.setProperty("--key-bg", "hsl(30, 25%, 89%)");
      style.setProperty("--key-shadow", "hsl(28, 16%, 65%)");
      style.setProperty("--key-bg2", "hsl(6, 63%, 50%)");
      style.setProperty("--key-shadow2", "hsl(6, 70%, 34%)");
      style.setProperty("--key-bg3", "hsl(225, 21%, 49%)");
      style.setProperty("--key-shadow3", "hsl(224, 28%, 35%)");

      style.setProperty("--color", "hsl(221, 14%, 31%)");
      style.setProperty("--color2", "hsl(0, 0%, 100%)");
      
      [title, ...themeNums, logo, result].forEach(el => {
        el.style.color = "var(--color2)";
      });
      break;

    case "theme3":
      style.setProperty("--main-bg", "hsl(268, 75%, 9%)");
      style.setProperty("--toggle-bg", "hsl(268, 71%, 12%)");
      style.setProperty("--keypad-bg", "hsl(268, 71%, 12%)");
      style.setProperty("--screen-bg", "hsl(268, 71%, 12%)");

      style.setProperty("--key-bg", "hsl(268, 47%, 21%)");
      style.setProperty("--key-shadow", "hsl(290, 70%, 36%)");
      style.setProperty("--key-bg2", "hsl(176, 100%, 44%)");
      style.setProperty("--key-shadow2", "hsl(177, 92%, 70%)");
      style.setProperty("--key-bg3", "hsl(281, 89%, 26%)");
      style.setProperty("--key-shadow3", "hsl(285, 91%, 52%)");

      style.setProperty("--color", "hsl(52, 100%, 62%)");
      style.setProperty("--color2", "white");

      [title, ...themeNums, logo].forEach(el => {
        el.style.color = "var(--color)";
      });


      break;
  }
}




