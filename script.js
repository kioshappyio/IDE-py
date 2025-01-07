let editor; // Monaco editor instance

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

// Run Code using Skulpt
document.getElementById("run-code").addEventListener("click", () => {
    const code = editor.getValue();
    const outputConsole = document.getElementById("output-console");
    outputConsole.textContent = "";

    Sk.configure({
        output: (text) => (outputConsole.textContent += text),
        read: (x) => {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
                throw `File not found: '${x}'`;
            }
            return Sk.builtinFiles["files"][x];
        },
    });

    Sk.misceval
        .asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true))
        .catch((err) => {
            outputConsole.textContent = err.toString();
        });
});

// Switch Theme
document.getElementById("theme-switcher").addEventListener("change", (e) => {
    monaco.editor.setTheme(e.target.value);
});

// Open File
document.getElementById("open-file").addEventListener("click", async () => {
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const content = await file.text();
    editor.setValue(content);
});

// Save File
document.getElementById("save-file").addEventListener("click", async () => {
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
});
