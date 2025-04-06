"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
let copiedContent = null;
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('geeebe.copyText', copyText), vscode.commands.registerCommand('geeebe.pasteText', pasteText), vscode.commands.registerCommand('geeebe.duplicateText', duplicateText));
}
exports.activate = activate;
const LINE_ENDINGS = ['', '\n', '\r\n'];
/**
 * Copy selected text or current line (without inserting).
 */
function copyText() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const selections = editor.selections;
    if (selections.length === 0) {
        return;
    }
    const selection = selections[0];
    if (selection.isEmpty) {
        // Copy whole line
        const text = editor.document.lineAt(selection.start.line).text + LINE_ENDINGS[editor.document.eol];
        copiedContent = { text, fullLine: true };
    }
    else {
        // Copy selection
        const text = editor.document.getText(selection);
        copiedContent = { text, fullLine: false };
    }
}
/**
 * Paste copied content at cursor or after line, depending on copy type.
 */
function pasteText() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !copiedContent) {
        return;
    }
    const selections = editor.selections;
    const { text, fullLine } = copiedContent;
    editor.edit(textEdit => {
        selections.forEach(selection => {
            if (fullLine) {
                // Paste full line before current line
                textEdit.insert(new vscode.Position(selection.start.line, 0), text);
            }
            else {
                // Paste selection at cursor
                textEdit.insert(selection.start, text);
            }
        });
    });
}
/**
 * Old behavior: copy+paste immediately.
 */
function duplicateText() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const selections = editor.selections;
    editor.edit(textEdit => {
        selections.forEach(selection => {
            if (selection.isEmpty) {
                // Duplicate line
                const text = editor.document.lineAt(selection.start.line).text;
                textEdit.insert(new vscode.Position(selection.start.line, 0), `${text}${LINE_ENDINGS[editor.document.eol]}`);
            }
            else {
                // Duplicate selection
                const text = editor.document.getText(selection);
                textEdit.insert(selection.start, text);
            }
        });
    });
}
