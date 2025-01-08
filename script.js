let editor;


require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs" } });
require(["vs/editor/editor.main"], () => {
    editor = monaco.editor.create(document.getElementById("editor-container"), {
        value: "# Write your Python code here\nprint('Hello, World!')",
        language: "python",
        theme: "vs-dark",
        automaticLayout: true,
        tabSize: 4,
        insertSpaces: true,
        folding: true, 
        formatOnSave: true, 
    });

    
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
            {
                label: 'if',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'if condition:',
                documentation: 'If statement syntax',
            },
            {
                label: 'else',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'else:',
                documentation: 'Else statement syntax',
            },
            {
                label: 'def',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'def function_name():',
                documentation: 'Defines a function',
            },
            {
                label: 'import',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'import module_name',
                documentation: 'Imports a module',
            },
            {
                label: 'class',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'class ClassName:',
                documentation: 'Defines a class',
            },
            {
                label: 'return',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'return value',
                documentation: 'Returns a value from a function',
            },
            {
                label: 'try',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'try:',
                documentation: 'Start of a try-except block',
            },
            {
                label: 'except',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'except Exception as e:',
                documentation: 'Exception handling block',
            },
            {
                label: 'lambda',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'lambda arguments: expression',
                documentation: 'Anonymous function',
            },
            {
                label: 'map',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'map(function, iterable)',
                documentation: 'Applies a function to every item of an iterable',
            },
            {
                label: 'filter',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'filter(function, iterable)',
                documentation: 'Filters elements from an iterable based on a condition',
            },
            {
                label: 'reduce',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'reduce(function, iterable)',
                documentation: 'Applies a rolling computation to sequential pairs of values in an iterable',
            },
            {
                label: 'open',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'open(file, mode)',
                documentation: 'Opens a file',
            },
            {
                label: 'close',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'file.close()',
                documentation: 'Closes an open file object',
            },
            {
                label: 'read',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'file.read()',
                documentation: 'Reads the content of a file',
            },
            {
                label: 'write',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'file.write()',
                documentation: 'Writes content to a file',
            },
            {
                label: 'str',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'str()',
                documentation: 'Converts a value to a string',
            },
            {
                label: 'int',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'int()',
                documentation: 'Converts a value to an integer',
            },
            {
                label: 'float',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'float()',
                documentation: 'Converts a value to a float',
            },
            {
                label: 'list',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'list()',
                documentation: 'Creates a list',
            },
            {
                label: 'dict',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'dict()',
                documentation: 'Creates a dictionary',
            },
            {
                label: 'set',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'set()',
                documentation: 'Creates a set',
            },
            {
                label: 'tuple',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'tuple()',
                documentation: 'Creates a tuple',
            },
            {
                label: 'zip',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'zip()',
                documentation: 'Aggregates elements from two or more iterables',
            },
            {
                label: 'enumerate',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'enumerate()',
                documentation: 'Returns an enumerate object',
            },
            {
                label: 'isinstance',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'isinstance(obj, class)',
                documentation: 'Checks if an object is an instance of a class',
            },
            {
                label: 'input',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'input()',
                documentation: 'Gets user input',
            },
            {
                label: 'abs',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'abs()',
                documentation: 'Returns the absolute value of a number',
            },
            {
                label: 'max',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'max()',
                documentation: 'Returns the largest item in an iterable',
            },
            {
                label: 'min',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'min()',
                documentation: 'Returns the smallest item in an iterable',
            },
            {
                label: 'sorted',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'sorted()',
                documentation: 'Returns a sorted list from an iterable',
            },
            {
                label: 'all',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'all()',
                documentation: 'Returns True if all elements in an iterable are true',
            },
            {
                label: 'any',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'any()',
                documentation: 'Returns True if any element in an iterable is true',
            },
            {
                label: 'is',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'is',
                documentation: 'Checks if two objects are the same',
            },
            {
                label: 'and',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'and',
                documentation: 'Logical AND operator',
            },
            {
                label: 'or',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'or',
                documentation: 'Logical OR operator',
            },
            {
                label: 'not',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'not',
                documentation: 'Logical NOT operator',
            },
            {
                label: 'continue',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'continue',
                documentation: 'Skips the current iteration of a loop',
            },
            {
                label: 'break',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'break',
                documentation: 'Breaks out of a loop',
            },
            {
                label: 'pass',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'pass',
                documentation: 'A null statement, used as a placeholder',
            },
            {
                label: 'assert',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'assert condition',
                documentation: 'Used for debugging purposes',
            },
            {
                label: 'os',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import os',
                documentation: 'Provides a portable way of using operating system dependent functionality',
            },
            {
                label: 'sys',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import sys',
                documentation: 'Provides access to some variables used or maintained by the interpreter and to functions that interact with the interpreter',
            },
            {
                label: 'time',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import time',
                documentation: 'Provides functions for working with time',
            },
            {
                label: 'math',
                label: 'math',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import math',
                documentation: 'Provides mathematical functions',
            },
            {
                label: 'random',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import random',
                documentation: 'Generates pseudo-random numbers',
            },
            {
                label: 'datetime',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import datetime',
                documentation: 'Supplies classes for manipulating dates and times',
            },
            {
                label: 're',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import re',
                documentation: 'Provides regular expression matching operations',
            },
            {
                label: 'json',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import json',
                documentation: 'Encodes and decodes JSON data',
            },
            {
                label: 'collections',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import collections',
                documentation: 'Provides alternatives to built-in types',
            },
            {
                label: 'itertools',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import itertools',
                documentation: 'Provides functions that create iterators for efficient looping',
            },
            {
                label: 'socket',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import socket',
                documentation: 'Provides access to network-related functionality',
            },
            {
                label: 'subprocess',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import subprocess',
                documentation: 'Executes and interacts with system processes',
            },
            {
                label: 'sqlite3',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import sqlite3',
                documentation: 'DB-API 2.0 interface for SQLite databases',
            },
            {
                label: 'argparse',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import argparse',
                documentation: 'Provides a way to handle command-line arguments',
            },
            {
                label: 'logging',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import logging',
                documentation: 'Provides a flexible framework for logging in applications',
            },
            {
                label: 'hashlib',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import hashlib',
                documentation: 'Provides a common interface to many secure hash and message digest algorithms',
            },
            {
                label: 'urllib',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import urllib',
                documentation: 'A package for working with URLs (e.g., fetching data from a website)',
            },
            {
                label: 'functools',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import functools',
                documentation: 'Provides higher-order functions that operate on other functions',
            },
            {
                label: 'PIL',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'from PIL import Image',
                documentation: 'Python Imaging Library (PIL) for image processing',
            },
            {
                label: 'numpy',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import numpy as np',
                documentation: 'Library for numerical computing and array handling',
            },
            {
                label: 'pandas',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import pandas as pd',
                documentation: 'Data manipulation and analysis library',
            },
            {
                label: 'scipy',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import scipy',
                documentation: 'Library for scientific and technical computing',
            },
            {
                label: 'matplotlib',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import matplotlib.pyplot as plt',
                documentation: 'Plotting library for data visualization',
            },
            {
                label: 'seaborn',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import seaborn as sns',
                documentation: 'Statistical data visualization library based on matplotlib',
            },
            {
                label: 'sklearn',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import sklearn',
                documentation: 'Machine learning library',
            },
            {
                label: 'tensorflow',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import tensorflow as tf',
                documentation: 'Library for machine learning and neural networks',
            },
            {
                label: 'keras',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import keras',
                documentation: 'High-level neural networks API, running on top of TensorFlow',
            },
            {
                label: 'flask',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import flask',
                documentation: 'A micro web framework for Python',
            },
            {
                label: 'django',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import django',
                documentation: 'A high-level Python web framework for rapid development',
            },
            {
                label: 'requests',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import requests',
                documentation: 'Simple HTTP library for Python',
            },
            {
                label: 'pytest',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'import pytest',
                documentation: 'A testing framework for Python',
            }
        ];
        return { suggestions: suggestions };
    }
});

    
    monaco.languages.registerDiagnostics('python', function(model) {
    const diagnostics = [];
    const code = model.getValue();

    if (code.includes("printt")) {
        diagnostics.push({
            severity: monaco.Severity.Error,
            message: "Typo detected: Did you mean 'print'?",
            range: new monaco.Range(1, 1, 1, 6),
            code: "typo",
        });
    }

    if (code.includes("undefinedVar")) {
        diagnostics.push({
            severity: monaco.Severity.Warning,
            message: "Warning: 'undefinedVar' is not defined.",
            range: new monaco.Range(1, 1, 1, 16),
            code: "undefined-variable",
        });
    }

    const lines = code.split("\n");
    lines.forEach((line, index) => {
        const indentCount = line.search(/\S/);
        if (indentCount % 4 !== 0 && indentCount !== -1) {
            diagnostics.push({
                severity: monaco.Severity.Error,
                message: `Indentation error on line ${index + 1}: Indentation should be a multiple of 4 spaces.`,
                range: new monaco.Range(index + 1, 1, index + 1, line.length),
                code: "indentation-error",
            });
        }
    });

    const undefinedFunctionRegex = /\b([a-zA-Z_]\w*)\s*/g;
    let match;
    while ((match = undefinedFunctionRegex.exec(code)) !== null) {
        const funcName = match[1];
        if (!code.includes(`def ${funcName}`)) {
            diagnostics.push({
                severity: monaco.Severity.Error,
                message: `Function '${funcName}' is called but not defined.`,
                range: new monaco.Range(code.substr(0, match.index).split("\n").length, match.index + 1, code.substr(0, match.index).split("\n").length, match.index + funcName.length + 1),
                code: "undefined-function",
            });
        }
    }

    if (code.includes("==")) {
        diagnostics.push({
            severity: monaco.Severity.Warning,
            message: "Consider using 'is' for comparison with None.",
            range: new monaco.Range(1, 1, 1, 3),
            code: "comparison-warning",
        });
    }

    const importRegex = /import\s+([a-zA-Z_]\w*)/g;
    while ((match = importRegex.exec(code)) !== null) {
        const moduleName = match[1];
        if (!code.includes(`import ${moduleName}`) && !code.includes(`from ${moduleName}`)) {
            diagnostics.push({
                severity: monaco.Severity.Error,
                message: `Module '${moduleName}' is imported but not used.`,
                range: new monaco.Range(1, 1, 1, 15),
                code: "unused-import",
            });
        }
    }

    const unusedVariableRegex = /\b([a-zA-Z_]\w*)\b/g;
    const variableUsages = {};
    while ((match = unusedVariableRegex.exec(code)) !== null) {
        const varName = match[1];
        if (!variableUsages[varName]) {
            variableUsages[varName] = { defined: false, used: false };
        }
        if (code.includes(`= ${varName}`)) {
            variableUsages[varName].defined = true;
        }
        if (code.includes(varName) && !code.includes(`= ${varName}`)) {
            variableUsages[varName].used = true;
        }
    }
    for (const [varName, status] of Object.entries(variableUsages)) {
        if (status.defined && !status.used) {
            diagnostics.push({
                severity: monaco.Severity.Warning,
                message: `Variable '${varName}' is defined but not used.`,
                range: new monaco.Range(1, 1, 1, 1),
                code: "unused-variable",
            });
        }
    }

    const missingReturnRegex = /\bdef\s+([a-zA-Z_]\w*)\s*/g;
    while ((match = missingReturnRegex.exec(code)) !== null) {
        const functionName = match[1];
        const functionBody = code.slice(match.index);
        if (!functionBody.includes('return') && functionBody.includes('def ')) {
            diagnostics.push({
                severity: monaco.Severity.Error,
                message: `Function '${functionName}' may not have a return statement.`,
                range: new monaco.Range(1, 1, 1, 1),
                code: "missing-return",
            });
        }
    }

    if (code.includes("eval(")) {
        diagnostics.push({
            severity: monaco.Severity.Warning,
            message: "Warning: Avoid using eval() for security reasons.",
            range: new monaco.Range(1, 1, 1, 5),
            code: "eval-warning",
        });
    }

    const openBracketRegex = //g;
    const closeBracketRegex = //g;
    let openBrackets = 0;
    let closeBrackets = 0;
    while (openBracketRegex.exec(code)) openBrackets++;
    while (closeBracketRegex.exec(code)) closeBrackets++;
    if (openBrackets !== closeBrackets) {
        diagnostics.push({
            severity: monaco.Severity.Error,
            message: "Mismatched parentheses.",
            range: new monaco.Range(1, 1, 1, 1),
            code: "mismatched-parentheses",
        });
    }

    const unclosedStringRegex = /"(?!.*\\")|'(?!.*\\')/g;
    let unclosedStrings = [];
    while ((match = unclosedStringRegex.exec(code)) !== null) {
        unclosedStrings.push(match.index);
    }
    if (unclosedStrings.length % 2 !== 0) {
        diagnostics.push({
            severity: monaco.Severity.Error,
            message: "Unclosed string literal.",
            range: new monaco.Range(1, 1, 1, 1),
            code: "unclosed-string",
        });
    }

    const improperImportRegex = /from\s+([a-zA-Z_]\w*)\s+import\s+([a-zA-Z_]\w*)/g;
    while ((match = improperImportRegex.exec(code)) !== null) {
        const moduleName = match[1];
        const importedFunction = match[2];
        if (!code.includes(`import ${moduleName}`) && !code.includes(`from ${moduleName} import ${importedFunction}`)) {
            diagnostics.push({
                severity: monaco.Severity.Error,
                message: `Improper import: '${importedFunction}' from '${moduleName}' is not found.`,
                range: new monaco.Range(1, 1, 1, 1),
                code: "improper-import",
            });
        }
    }

    return diagnostics;
});

    
    editor.onDidChangeModelContent((e) => {
        const model = editor.getModel();
        const diagnostics = monaco.languages.getDiagnostics('python', model);
        if (diagnostics.length > 0) {
            console.log(diagnostics[0].message); // Print diagnostics message in the console
        }
    });
});


let inputQueue = [];
let currentInputPromise = null;
const DB_NAME = "TerminalData";
const STORE_NAME = "SessionData";

// Fungsi untuk membuka IndexedDB
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

// Fungsi untuk menyimpan data ke IndexedDB
async function saveToDatabase(data) {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.add(data);
    transaction.onerror = (event) => console.error("Error saving to DB:", event.target.error);
}

// Fungsi untuk mengambil semua data dari IndexedDB
async function loadFromDatabase() {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

// Fungsi untuk menampilkan data di terminal
async function displaySavedData(outputConsole) {
    const savedData = await loadFromDatabase();
    savedData.forEach((entry) => {
        const outputLine = document.createElement("div");
        outputLine.textContent = entry.content;
        outputLine.style.color = entry.type === "input" ? "#00ff00" : "#ffffff"; // Hijau untuk input, putih untuk output
        outputLine.style.fontFamily = "monospace";
        outputConsole.appendChild(outputLine);
    });
}

// Fungsi customInput dengan penyimpanan data
function customInput(prompt) {
    return new Promise((resolve) => {
        inputQueue.push({ prompt, resolve });
        processInputQueue();
    });
}

// Proses Input Terminal
function processInputQueue() {
    if (inputQueue.length > 0 && !currentInputPromise) {
        const { prompt, resolve } = inputQueue[0];
        const outputConsole = document.getElementById("output-console");
        if (!outputConsole) {
            console.error("Output console element not found!");
            return;
        }

        const inputContainer = document.createElement("div");
        inputContainer.style.display = "flex";
        inputContainer.style.alignItems = "center";

        const promptText = document.createElement("span");
        promptText.textContent = prompt + " ";
        promptText.style.color = "#00ff00"; // Hijau seperti terminal
        promptText.style.fontFamily = "monospace";

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.style.backgroundColor = "black";
        inputField.style.color = "#00ff00";
        inputField.style.border = "none";
        inputField.style.outline = "none";
        inputField.style.fontFamily = "monospace";
        inputField.style.flexGrow = "1";

        inputContainer.appendChild(promptText);
        inputContainer.appendChild(inputField);
        outputConsole.appendChild(inputContainer);

        // Fokus ke input field
        inputField.focus();

        // Scroll otomatis ke bawah
        outputConsole.scrollTop = outputConsole.scrollHeight;

        currentInputPromise = new Promise((inputResolve) => {
            inputField.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    const userInput = inputField.value;
                    inputField.disabled = true; // Nonaktifkan input setelah submit
                    inputField.style.border = "none"; // Hapus garis bawah

                    // Simpan input ke database
                    saveToDatabase({ type: "input", content: `${prompt} ${userInput}` });

                    resolve(userInput);
                    inputResolve();
                    inputQueue.shift(); // Remove from queue
                    currentInputPromise = null;
                    processInputQueue(); 
                }
            });
        });
    }
}


document.getElementById("run-code").addEventListener("click", async () => {
    inputQueue = [];
    currentInputPromise = null;

    const outputConsole = document.getElementById("output-console");
    if (!outputConsole) {
        console.error("Output console element not found!");
        return;
    }

    outputConsole.innerHTML = ""; 
    await displaySavedData(outputConsole); 

    const code = editor.getValue(); 
    outputConsole.textContent = "Running...\n"; 

    Sk.configure({
        output: (text) => {
            const outputLine = document.createElement("div");
            outputLine.textContent = text;
            outputLine.style.color = "#ffffff";
            outputLine.style.fontFamily = "monospace";
            outputConsole.appendChild(outputLine);

            
            saveToDatabase({ type: "output", content: text });

            outputConsole.scrollTop = outputConsole.scrollHeight; 
        },
        read: (filename) => {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][filename] === undefined) {
                console.error(`File not found: '${filename}'`); 
                throw `File not found: '${filename}'`;
            }
            return Sk.builtinFiles["files"][filename];
        },
        inputfun: customInput, // Set input fungsi custom
    });

    Sk.misceval
        .asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true)) 
        .then(() => {
            const finishedLine = document.createElement("div");
            finishedLine.textContent = "Execution finished.";
            finishedLine.style.color = "#00ff00"; 
            finishedLine.style.fontFamily = "monospace";
            outputConsole.appendChild(finishedLine);

            
            saveToDatabase({ type: "output", content: "Execution finished." });

            outputConsole.scrollTop = outputConsole.scrollHeight;
        })
        .catch((err) => {
            const errorLine = document.createElement("div");
            errorLine.textContent = `Error:\n${err.message}`;
            errorLine.style.color = "#ff0000"; 
            errorLine.style.fontFamily = "monospace";
            outputConsole.appendChild(errorLine);

            // Simpan error ke database
            saveToDatabase({ type: "output", content: `Error:\n${err.message}` });

            outputConsole.scrollTop = outputConsole.scrollHeight;
        });
});

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


document.getElementById("save-file").addEventListener("click", () => {
    const blob = new Blob([editor.getValue()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "main.py"; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});


document.getElementById("theme-switcher").addEventListener("change", (e) => {
    monaco.editor.setTheme(e.target.value); 
});
