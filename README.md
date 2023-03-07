# Frontend Mentor - Calculator app solution
Link here :D : [Calculator](https://teoh4770.github.io/fm-calculator/)
...took me a day to finish it :P

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathmatical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference
- **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

### Screenshot
~Still Got issue here :D~ Now the bug is fixed :D
![mobile1](https://user-images.githubusercontent.com/98545971/218294813-c87a7ec4-baa3-4654-a404-b8fe412d6177.png)
![mobile2](https://user-images.githubusercontent.com/98545971/218294819-b69a9f09-9fac-4528-8527-fc558bdb49cf.png)
![mobile3](https://user-images.githubusercontent.com/98545971/218294831-a12a3bba-77bd-435e-b248-78071323e0d0.png)
![desktop](https://user-images.githubusercontent.com/98545971/218294877-592264f9-909b-48ad-95b1-9b5790a983a7.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- HTML
- CSS Custom Properties for Theme Switching
- JS, Mostly DOM, and also the logic parts :D
- CSS Grid
- Mobile-first workflow

### What I learned

```html
<h1>Some HTML I'm proud off </h1>
<div class="wrapper number-grid">
  <button class="number" value="7">7</button>
  <button class="number" value="8">8</button>
  <button class="number" value="9">9</button>
  <button class="" value="DEL">DEL</button>
  <button class="number" value="4">4</button>
  <button class="number" value="5">5</button>
  <button class="number" value="6">6</button>
  <button class="number" value="+">+</button>
  <button class="number" value="1">1</button>
  <button class="number" value="2">2</button>
  <button class="number" value="3">3</button>
  <button class="number" value="-">−</button>
  <button class="number" value=".">.</button>
  <button class="number" value="0">0</button>
  <button class="number" value="/">÷</button>
  <button class="number" value="*">×</button>
  <button class="" value="RESET">RESET</button>
  <button class="" value="=">=</button>
</div>

<div class="switch-toggle">
  <p class="title">Theme</p>
  <div class="wrapper">
    <div class="numbers">
      <span>1</span>
      <span>2</span>
      <span>3</span>
    </div>
    <div class="radio-wrapper">
      <input type="radio" name="theme" id="theme1" checked />
      <label for="theme1"></label>
      <input type="radio" name="theme" id="theme2" />
      <label for="theme2"></label>
      <input type="radio" name="theme" id="theme3" />
      <label for="theme3"></label>
    </div>
  </div>
</div>
```
```css
:root {
  --min-width-screen: 600px;

  /*** default theme ***/
  /** bg **/
  --main-bg: hsl(0, 0%, 90%);
  --toggle-bg: hsl(0, 5%, 81%);
  --keypad-bg: hsl(0, 5%, 81%);
  --screen-bg: hsl(0, 0%, 93%);

  /** keys **/

  /* third section */
  /* color for the numbers */
  --key-bg: hsl(45, 7%, 89%);
  --key-shadow: hsl(35, 11%, 61%);

  /* second section */
  /* color for the equal and the toggle button */
  --key-bg2: hsl(25, 98%, 40%);
  --key-shadow2: hsl(25, 99%, 27%);

  /* first section - for background 3*/
  /* color for the delete and reset*/
  --key-bg3: hsl(185, 42%, 37%);
  --key-shadow3: hsl(185, 58%, 25%);

  /** text **/
  --color: hsl(60,10%, 19%);
  --color2: hsl(0, 0%, 100%);
}
```

```js
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
```
Think a lot about what the variables that are suitable for calculator, experiment a lot with Google Calculator, to try to achieve all the little, but nice function it has. One of the examples are when user clicks on the '=' button, and wanna del it, the screen shows the history of the expression.

Also, I'm been impressed by how I never discovered the Function() method before, similar to eval() method that are used to evaluate any logic in string, allowed me to get the result of the calculation easily, without needing to reinvent the order of operations rules, create the operations function.

### Continued development

- there are a bit minor bugs that can be fixed. But it is ok for now.
- maybe use it as a practice for frontend framework like Vue or Angular? 

### Useful resources

- [eval() vs Function() in JavaScript](https://www.educative.io/answers/eval-vs-function-in-javascript)
- Google Calculator as a Sample
- [Speed Coding|HTML,CSS,JS - Calculator](https://youtu.be/JDiurjhpOXA) <- Give me an idea of how eval works, which help me find the Function() method

## Author
- Frontend Mentor - [@teoh4770]([https://www.frontendmentor.io/profile/teoh4770])

## Acknowledgments
Kevin Powell
