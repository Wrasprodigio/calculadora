const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) { //constructor:  é um método especial para criar e inicializar um objeto criado a partir de uma classe
        this.previousOperationText = previousOperationText; // é o valor que está na tela
        this.currentOperationText = currentOperationText; // é o valor que está na tela
        this.currentOperation = ""; // é o valor que está digitando agora
    }

    // add digt to calculator screen
    addDigit(digit) {
        // check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // Process all calculator operations
    processOperation(operation) {
        // Check if current is empty        
        if (this.currentOperationText.innerText === "" && operation !== "C"){
            // Change operation
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // Get current and prevous value
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0]; // split: divide uma String em uma lista ordenada de substrings, coloca essas substrings EM UM ARRAY E RETORNA UM ARRAY.
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperation();
                break;
            default:
                return;
        }
    }

    // Change values of the calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
    ) {

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
             // Check if value is zero, if it is just add current value
             if(previous === 0) {
                operationValue = current;
             }

             // Add current value to previous
             this.previousOperationText.innerText = `${operationValue} ${operation}`
             this.currentOperationText.innerText = "";
        }
    }


    //  Change math operation
    changeOperation(operation) {

        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation; // Slice: retorna uma cópia de parte de um array a partir de um subarray criado entre as posições início e fim (fim não é incluído) de um array original.
    }

    // Delete the last digit
    processDelOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    // Clear current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // Clear all operation
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Process equal operation
    processEqualOperation() {
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}


const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => { //forEach: ação de iteração que executa uma função para cada elemento.
    btn.addEventListener("click", (e) => { //eventlistener: é a maneira de registrar uma espera de evento como especificada no W3C DOM
        const value = e.target.innerText; //innerText: usa para pegar botão(input) - value: usa para pegar os input

        if (+value >= 0 || value === ".") { //+value: vai converter o valor de texto em número
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});