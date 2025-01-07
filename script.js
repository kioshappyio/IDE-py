let editor;

// Load Monaco Editor
require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs" } });
require(["vs/editor/editor.main"], () => {
    editor = monaco.editor.create(document.getElementById("editor-container"), {
        value: "# Write your Python code here\nprint('Hello, World!')",
        language: "python",
        theme: "vs-dark",
        automaticLayout: true,
        tabSize: 4,
        insertSpaces: true,
        folding: true, // Enable code folding
        formatOnSave: true, // Enable auto-formatting on save
    });

    // Autocomplete for Python code
    monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: function (model, position) {
            const suggestions = [
                {
                    label: 'print',
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: 'print()',
                    documentation: 'Prints the specified message to the console',
                },
                {
                    label: 'len',
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: 'len()',
                    documentation: 'Returns the length of an object',
                },
                {
                    label: 'range',
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: 'range()',
                    documentation: 'Generates a range of numbers',
                },
                {
                    label: 'for',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: 'for i in range():',
                    documentation: 'For loop syntax',
                },
                // Add more suggestions as needed
            ];
            return { suggestions: suggestions };
        }
    });

    // Error detection and diagnostics
    monaco.languages.registerDiagnostics('python', function(model) {
        const diagnostics = [];
        const code = model.getValue();

        // Simple check for a typo or syntax error (for example)
        if (code.includes("printt")) {
            diagnostics.push({
                severity: monaco.Severity.Error,
                message: "Typo detected: Did you mean 'print'?",
                range: new monaco.Range(1, 1, 1, 6),
                code: "typo",
            });
        }

        return diagnostics;
    });

    // Provide feedback for diagnostics
    editor.onDidChangeModelContent((e) => {
        const model = editor.getModel();
        const diagnostics = monaco.languages.getDiagnostics('python', model);
        if (diagnostics.length > 0) {
            console.log(diagnostics[0].message); // Print diagnostics message in the console
        }
    });
});

// Run Python Code
document.getElementById("run-code").addEventListener("click", () => {
    const code = editor.getValue(); // Get the Python code from the editor
    const outputConsole = document.getElementById("output-console");
    outputConsole.textContent = "Running...\n"; // Clear console and show "Running..."

    // Configure Skulpt
    Sk.configure({
        output: (text) => {
            outputConsole.textContent += text; // Append output to the console
        },
        read: (filename) => {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][filename] === undefined) {
                console.error(`File not found: '${filename}'`); // Log missing file
                throw `File not found: '${filename}'`;
            }
            return Sk.builtinFiles["files"][filename];
        },
    });

    // Execute Python code using Skulpt
    Sk.misceval
        .asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true)) // Execute Python code
        .then(() => {
            outputConsole.textContent += "\nExecution finished."; // Indicate completion
        })
        .catch((err) => {
            outputConsole.textContent = `Error:\n${err.toString()}`; // Display error in console
            console.error("Error during execution:", err); // Log error to browser console
        });
});

// Open File (Fallback for Android)
document.getElementById("open-file").addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".py, text/plain";
    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const content = await file.text();
            editor.setValue(content); // Load file content into the editor
        }
    };
    fileInput.click();
});

// Save File (Fallback for Android)
document.getElementById("save-file").addEventListener("click", () => {
    const blob = new Blob([editor.getValue()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code.py"; // Save file with the name 'code.py'
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Theme Switcher
document.getElementById("theme-switcher").addEventListener("change", (e) => {
    monaco.editor.setTheme(e.target.value); // Change Monaco Editor theme
});
