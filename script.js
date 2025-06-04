// Custom error class
class CalculatorError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CalculatorError';
    }
}

// Sample data for console demonstrations
const sampleData = {
    users: [
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Jane', age: 25 },
        { id: 3, name: 'Bob', age: 35 }
    ],
    complexObject: {
        nested: {
            array: [1, 2, 3],
            object: { a: 1, b: 2 }
        }
    }
};

// Initialize button functionality
document.addEventListener('DOMContentLoaded', () => {
    // Track page load
    if (window.TrackJS) {
        TrackJS.track('Page loaded');
    }

    const buttons = document.querySelectorAll('#error-btns > button');
    
    // Console Log Demo
    buttons[0].addEventListener('click', () => {
        console.log('This is a console.log demonstration', sampleData.users);
        if (window.TrackJS) {
            TrackJS.track('Console Log Demo clicked');
        }
    });

    // Console Error Demo
    buttons[1].addEventListener('click', () => {
        console.error('This is a console.error demonstration', new Error('Sample error'));
        if (window.TrackJS) {
            TrackJS.track('Console Error Demo clicked');
        }
    });

    // Console Table Demo
    buttons[10].addEventListener('click', () => {
        console.table(sampleData.users);
        if (window.TrackJS) {
            TrackJS.track('Console Table Demo clicked');
        }
    });

    // Console Dir Demo
    buttons[6].addEventListener('click', () => {
        console.dir(sampleData.complexObject);
        if (window.TrackJS) {
            TrackJS.track('Console Dir Demo clicked');
        }
    });

    // Console DirXML Demo
    buttons[7].addEventListener('click', () => {
        console.dirxml(document.body);
        if (window.TrackJS) {
            TrackJS.track('Console DirXML Demo clicked');
        }
    });

    // Console Group Start
    buttons[8].addEventListener('click', () => {
        console.group('Grouped Information');
        console.log('First item in group');
        console.log('Second item in group');
        if (window.TrackJS) {
            TrackJS.track('Console Group Start clicked');
        }
    });

    // Console Group End
    buttons[9].addEventListener('click', () => {
        console.groupEnd();
        if (window.TrackJS) {
            TrackJS.track('Console Group End clicked');
        }
    });

    // Start Timer
    buttons[11].addEventListener('click', () => {
        console.time('operationTimer');
        if (window.TrackJS) {
            TrackJS.track('Start Timer clicked');
        }
    });

    // End Timer
    buttons[12].addEventListener('click', () => {
        console.timeEnd('operationTimer');
        if (window.TrackJS) {
            TrackJS.track('End Timer clicked');
        }
    });

    // Console Trace
    buttons[13].addEventListener('click', () => {
        function first() {
            second();
        }
        function second() {
            third();
        }
        function third() {
            console.trace('Trace demonstration');
        }
        first();
        if (window.TrackJS) {
            TrackJS.track('Console Trace clicked');
        }
    });

    // Trigger Global Error
    buttons[14].addEventListener('click', () => {
        try {
            // Intentionally cause an error
            const nonExistentElement = document.querySelector('#non-existent');
            nonExistentElement.innerHTML = 'This will fail';
        } catch (error) {
            console.error('Caught error:', error);
            if (window.TrackJS) {
                TrackJS.track('Global Error triggered');
            }
        }
    });

    // Calculator form error handling
    const form = document.querySelector('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const output = document.querySelector('output');
        const firstNum = document.querySelector('#first-num').value;
        const secondNum = document.querySelector('#second-num').value;
        const operator = document.querySelector('#operator').value;

        try {
            // Input validation
            if (!firstNum || !secondNum) {
                throw new CalculatorError('Please enter both numbers');
            }

            if (isNaN(firstNum) || isNaN(secondNum)) {
                throw new CalculatorError('Please enter valid numbers');
            }

            if (operator === '/' && secondNum === '0') {
                throw new CalculatorError('Cannot divide by zero');
            }

            const result = eval(`${firstNum} ${operator} ${secondNum}`);
            output.innerHTML = result;
            if (window.TrackJS) {
                TrackJS.track('Calculation successful', { firstNum, secondNum, operator, result });
            }
        } catch (error) {
            if (error instanceof CalculatorError) {
                output.innerHTML = `Error: ${error.message}`;
            } else {
                output.innerHTML = 'An unexpected error occurred';
            }
            console.error('Calculator error:', error);
            if (window.TrackJS) {
                TrackJS.track('Calculator error', { error: error.message });
            }
        }
    });
});

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Global error caught:', {
        message,
        source,
        lineno,
        colno,
        error
    });
    if (window.TrackJS) {
        TrackJS.track('Global error caught', { message, source, lineno, colno });
    }
    return true; // Prevents the default browser error handling
}; 