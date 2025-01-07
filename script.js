let editor; // Monaco Editor instance

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
    const code = editor.getValue();
    const outputConsole = document.getElementById("output-console");
    outputConsole.textContent = "Running...\n";

    Sk.configure({
        output: (text) => (outputConsole.textContent += text),
        read: (filename) => {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][filename] === undefined) {
                throw `File not found: '${filename}'`;
            }
            return Sk.builtinFiles["files"][filename];
        },
    });

    try {
        Sk.misceval
            .asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true))
            .then(() => {
                outputConsole.textContent += "\nExecution finished.";
            })
            .catch((err) => {
                outputConsole.textContent = `Error:\n${err.toString()}`;
            });
    } catch (error) {
        outputConsole.textContent = `Unexpected Error:\n${error.toString()}`;
    }
});

// Open File
document.getElementById("open-file").addEventListener("click", async () => {
    if (!window.showOpenFilePicker) {
        alert("Your browser does not support this feature.");
        return;
    }

    try {
        const [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const content = await file.text();
        editor.setValue(content);
    } catch (error) {
        console.error("Failed to open file:", error);
    }
});

// Save File
document.getElementById("save-file").addEventListener("click", async () => {
    if (!window.showSaveFilePicker) {
        alert("Your browser does not support this feature.");
        return;
    }

    try {
        const options = {
            types: [
                {
                    description: "Python Files",
                    accept: { "text/plain": [".py"] },
                },
            ],
        };
        const handle = await window.showSaveFilePicker(options);
        const writable = await handle.createWritable();
        await writable.write(editor.getValue());
        await writable.close();
        alert("File saved successfully!");
    } catch (error) {
        console.error("Failed to save file:", error);
    }
});

// Theme Switcher
document.getElementById("theme-switcher").addEventListener("change", (e) => {
    monaco.editor.setTheme(e.target.value);
});
