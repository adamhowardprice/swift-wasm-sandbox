document.addEventListener('DOMContentLoaded', function() {
    // Get UI elements
    const runButton = document.getElementById('run-button');
    const outputElement = document.getElementById('output');
    const loadingElement = document.getElementById('loading');
    
    // Initialize the Swift WebAssembly environment
    swiftRunner.init().catch(error => {
        console.error('Failed to initialize Swift WebAssembly:', error);
        outputElement.textContent = 'Error: Failed to initialize Swift WebAssembly runtime. Check console for details.';
    });
    
    // Run button click handler
    runButton.addEventListener('click', async function() {
        // Clear previous output
        outputElement.textContent = '';
        
        // Show loading indicator
        loadingElement.classList.remove('hidden');
        
        try {
            // Get code from Monaco editor
            const swiftCode = editor.getValue();
            
            // Run the code
            const result = await swiftRunner.runCode(swiftCode);
            
            // Display output
            outputElement.textContent = result;
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
    // For this PoC, we'll mock the file loading in the loadExample function
    console.log('Example files created in memory');
}