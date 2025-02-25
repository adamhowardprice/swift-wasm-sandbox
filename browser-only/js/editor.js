// Initialize the Monaco editor
let editor;

function initEditor() {
    require.config({
        paths: {
            'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs'
        }
    });

    require(['vs/editor/editor.main'], function() {
        // Register Swift language
        monaco.languages.register({ id: 'swift' });
        
        // Define Swift syntax highlighting
        monaco.languages.setMonarchTokensProvider('swift', {
            tokenizer: {
                root: [
                    // Keywords
                    [/\b(if|else|for|while|switch|case|default|break|continue|return|func|class|struct|enum|protocol|extension|import|var|let|self|super|init|deinit|throw|throws|try|catch|guard|defer|repeat|where|in|as|is|public|private|internal|open|fileprivate|static|dynamic|final|required|convenience|lazy|weak|unowned|override|mutating|nonmutating|associatedtype|typealias|subscript|operator|precedencegroup|inout|indirect|any|async|await|some|actor)\b/, 'keyword'],
                    
                    // Types
                    [/\b(Int|Double|Float|Bool|String|Character|Optional|Array|Dictionary|Set|Void)\b/, 'type'],
                    
                    // String literals
                    [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
                    
                    // Numbers
                    [/\b[0-9]+\b/, 'number'],
                    [/\b0[xX][0-9a-fA-F]+\b/, 'number.hex'],
                    [/\b0[oO][0-7]+\b/, 'number.octal'],
                    [/\b0[bB][01]+\b/, 'number.binary'],
                    [/\b[0-9]+\.[0-9]+([eE][\-+]?[0-9]+)?\b/, 'number.float'],
                    
                    // Comments
                    [/\/\/.*$/, 'comment'],
                    [/\/\*/, { token: 'comment.quote', bracket: '@open', next: '@comment' }],
                ],
                string: [
                    [/[^"\\]+/, 'string'],
                    [/\\./, 'string.escape'],
                    [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
                ],
                comment: [
                    [/[^\/*]+/, 'comment'],
                    [/\/\*/, { token: 'comment.quote', bracket: '@open', next: '@push' }],
                    [/\*\//, { token: 'comment.quote', bracket: '@close', next: '@pop' }],
                    [/[\/*]/, 'comment'],
                ],
            }
        });

        // Create the editor instance
        editor = monaco.editor.create(document.getElementById('editor'), {
            value: 'print("Hello, Swift WebAssembly!")',
            language: 'swift',
            theme: 'vs-dark',
            minimap: {
                enabled: false
            },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            fontSize: 14,
            tabSize: 2
        });

        // Add keyboard shortcut for running code
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, function() {
            document.getElementById('run-button').click();
        });
    });
}

// Load example code
async function loadExample(name) {
    try {
        const response = await fetch(`examples/${name}.swift`);
        if (response.ok) {
            const code = await response.text();
            editor.setValue(code);
        } else {
            console.error(`Failed to load example: ${name}`);
        }
    } catch (error) {
        console.error('Error loading example:', error);
    }
}

// Initialize editor when the page loads
document.addEventListener('DOMContentLoaded', initEditor);

// Setup example selector
document.getElementById('example-selector').addEventListener('change', function(e) {
    const selectedExample = e.target.value;
    if (selectedExample) {
        loadExample(selectedExample);
    }
});