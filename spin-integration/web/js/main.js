document.addEventListener('DOMContentLoaded', function() {
    // Get UI elements
    const runButton = document.getElementById('run-button');
    const outputElement = document.getElementById('output');
    const loadingElement = document.getElementById('loading');
    
    // Run button click handler
    runButton.addEventListener('click', async function() {
        // Clear previous output
        outputElement.textContent = '';
        
        // Show loading indicator
        loadingElement.classList.remove('hidden');
        
        try {
            // Get code from Monaco editor
            const swiftCode = editor.getValue();
            
            // Send the Swift code to the Spin backend for execution
            const result = await executeSwiftCode(swiftCode);
            
            // Display output
            if (result.success) {
                outputElement.textContent = result.output;
            } else {
                outputElement.textContent = `Error: ${result.error || "Unknown error"}`;
            }
        } catch (error) {
            console.error('Error running Swift code:', error);
            outputElement.textContent = `Error: ${error.message}`;
        } finally {
            // Hide loading indicator
            loadingElement.classList.add('hidden');
        }
    });
    
    // Create example Swift files
    createExampleFiles();
});

// Function to execute Swift code using the Spin backend
async function executeSwiftCode(code) {
    // Define the API endpoint (adjust if your Spin app is hosted elsewhere)
    const endpoint = '/execute';
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });
        
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            error: `Failed to execute code: ${error.message}`,
            output: ''
        };
    }
}

// Function to create example Swift files
async function createExampleFiles() {
    const examples = {
        'hello.swift': `// Hello World example
print("Hello, Swift WebAssembly!")
`,
        'fibonacci.swift': `// Fibonacci Sequence example
func fibonacci(n: Int) -> [Int] {
    var sequence = [0, 1]
    
    guard n > 1 else {
        return Array(sequence.prefix(n + 1))
    }
    
    for i in 2...n {
        let next = sequence[i-1] + sequence[i-2]
        sequence.append(next)
    }
    
    return sequence
}

let fib = fibonacci(n: 9)
print("Fibonacci Sequence:")
print(fib.map { String($0) }.joined(separator: ", "))
`
    };
    
    // In a real implementation, these would be actual files
    // We're mocking the file loading in the loadExample function
    console.log('Example files created in memory');
}