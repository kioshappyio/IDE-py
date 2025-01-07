let editor;

// Load Monaco Editor
require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs" } });
require(["vs/editor/editor.main"], () => {
    editor = monaco.editor.create(document.getElementById("editor-container"), {
        value: "# Write your Python code here\nprint('Hello, World!')",
        language: "python",
        theme: "vs-dark",
        automaticLayout: true,
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
                throw `File not found: '${filename}'`;
            }
            return Sk.builtinFiles["files"][filename];
        },
    });

    // Execute Python code
    try {
        Sk.misceval
            .asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true))
            .then(() => {
                outputConsole.textContent += "\nExecution finished."; // Indicate completion
            })
            .catch((err) => {
                outputConsole.textContent = `Error:\n${err.toString()}`; // Display error
            });
    } catch (error) {
        outputConsole.textContent = `Unexpected Error:\n${error.toString()}`; // Handle unexpected errors
    }
});

// Open File (Fallback)
document.getElementById("open-file").addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".py, text/plain";
    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const content = await file.text();
            editor.setValue(content);
        }
    };
    fileInput.click();
});

// Save File (Fallback)
document.getElementById("save-file").addEventListener("click", () => {
    const blob = new Blob([editor.getValue()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code.py";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Theme Switcher
document.getElementById("theme-switcher").addEventListener("change", (e) => {
    monaco.editor.setTheme(e.target.value);
});
