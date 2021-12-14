function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    if (b === 0) {
        return "ERROR";
    }
    return a/b;
}

function operate(a,b, operator) {
    b = parseFloat(b);
    switch (operator){
        case "+" : 
            return add(a,b); 
        case "-":
            return subtract(a,b);
        case "x":
            return multiply(a,b);
        case "÷":
            return divide(a,b);
    }
}

const initialCurrentValue = 0;
const initialCurrentOperator = '';
const initialNumberInput = '';

let currentValue = 0;
let currentOperator = '';
let numberInput = '';

function addNumberInput(e) {
    numberInput += this.value; 
    bottomDisplay.textContent = numberInput;
} 

function deleteNumberInput(e){
    numberInput = numberInput.slice(0, numberInput.length-2);
    bottomDisplay.textContent = numberInput;
}

function clearNumberInput(e){
    if (numberInput === bottomDisplay.textContent) {
        bottomDisplay.textContent = "";
    }
    numberInput = "";
}

function clearAll(e) {
    numberInput = initialNumberInput;
    currentOperator = initialCurrentOperator;
    currentValue = initialCurrentValue;
    bottomDisplay.textContent = currentValue;
    topDisplay.textContent = "";
}

function updateOperator(e){
    if (numberInput && currentOperator) {
        currentValue = operate(currentValue, numberInput, currentOperator);
    } else if(numberInput) {
        currentValue = parseFloat(numberInput);
    }
    currentOperator = this.value;
    if (currentValue === "ERROR") {
        topDisplay.textContent = currentValue + ". Resetting to zero.";
        currentValue = 0;
    } else {
        topDisplay.textContent = currentValue + " " + currentOperator;
    }
    numberInput = "";
    bottomDisplay.textContent = numberInput;
}

function displayEqual(e){
    if (numberInput && currentOperator) {
        topDisplay.textContent += " " + numberInput + " =";  
        currentValue = operate(currentValue, numberInput, currentOperator);
    } else if (numberInput) {
        currentValue = parseFloat(numberInput);
        topDisplay.textContent = currentValue + " =";
    }
    if (currentValue === "ERROR") {
        bottomDisplay.textContent = currentValue + ". Resetting to zero.";
        currentValue = 0;
    } else {
        bottomDisplay.textContent = currentValue;
    }
    numberInput = "";
    currentOperator = "";
    
}

function addDecimalNumberInput(e) {
    if (!numberInput.includes(".")) {
        numberInput += ".";
        bottomDisplay.textContent = numberInput;
    }
}

function toggleNegation(e) {
    if(numberInput.includes("-")) {
        numberInput = numberInput.slice(1,);
    } else {
        numberInput = "-" + numberInput;
    }
    bottomDisplay.textContent = numberInput;
}

function processKeyboardInput(e) {
    const button = document.querySelector(`input[data-key="${e.keyCode}"]`);
    if (!button){
        return;
    }
    button.click();
}

window.addEventListener('keydown', processKeyboardInput);
const numbers = document.querySelectorAll(".number");
const topDisplay = document.querySelector(".top");
const bottomDisplay = document.querySelector(".bottom");
const deleteButton = document.querySelector(".delete");
const clearLineButton = document.querySelector(".clear-line");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const dotButton = document.querySelector(".dot");
const negateButton = document.querySelector(".negate");
numbers.forEach(num => num.addEventListener("click", addNumberInput));
deleteButton.addEventListener("click", deleteNumberInput);
clearLineButton.addEventListener("click", clearNumberInput);
operatorButtons.forEach(operator => operator.addEventListener("click", updateOperator));
equalButton.addEventListener("click", displayEqual);
clearButton.addEventListener("click", clearAll);
bottomDisplay.textContent = currentValue;
dotButton.addEventListener("click", addDecimalNumberInput);
negateButton.addEventListener("click", toggleNegation);