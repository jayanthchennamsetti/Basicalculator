document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    let input = '';
    let result = 0; // Store the result
    display.style.backgroundColor="silver";

    document.querySelectorAll(".digit").forEach(button => {
        button.addEventListener("click", function() {
            input += button.value;
            display.textContent = input;
        });
    });

    document.querySelectorAll(".operator").forEach(button => {
        button.addEventListener("click", function() {
            if (input !== '' && !isNaN(input[input.length - 1])) {
                // If the last character of input is a number
                input += button.value;
                display.textContent = input;
            } else if (!isNaN(input)) {
                // If the last input was a number, add the result to the input
                input = result + button.value;
                display.textContent = input;
            }
        });
    });

    document.getElementById("decimal").addEventListener("click", function() {
        if (!input.includes('.') && input !== '') {
            input += '.';
            display.textContent = input;
        }
    });

    document.getElementById("clear").addEventListener("click", function() {
        input = '';
        display.textContent = '0';
    });

    document.getElementById("backspace").addEventListener("click", function() {
        if (input.length > 0) {
            input = input.slice(0, -1);
            display.textContent = input === '' ? '0' : input;
        }
    });

    document.getElementById("equals").addEventListener("click", calculate);

    // Keyboard Support
    document.addEventListener("keydown", function(event) {
        const key = event.key;
        if (!isNaN(key) || key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
            input += key;
            display.textContent = input;
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Backspace') {
            if (input.length > 0) {
                input = input.slice(0, -1);
                display.textContent = input === '' ? '0' : input;
            }
        }
    });

    function calculate() {
        try {
            result = eval(input);
            display.textContent = result;
            input = result.toString(); // Update input to store the result
        } catch (error) {
            display.textContent = 'Enter Valid Input';
            setTimeout(function() {
                display.textContent = '0';
                input = '';
            }, 1000); 
        }
    }
});
