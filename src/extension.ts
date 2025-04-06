import * as vscode from 'vscode';

let copiedContent: { text: string, fullLine: boolean } | null = null;

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('geeebe.copyText', copyText),
    vscode.commands.registerCommand('geeebe.pasteText', pasteText),
    vscode.commands.registerCommand('geeebe.duplicateText', duplicateText),
  );
}

const LINE_ENDINGS = ['', '\n', '\r\n'];

/**
 * Copy selected text or current line (without inserting).
 */
function copyText() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) { return; }

  const selections = editor.selections;

  if (selections.length === 0) {
    return;
  }

  const selection = selections[0];
  if (selection.isEmpty) {
    // Copy whole line
    const text = editor.document.lineAt(selection.start.line).text + LINE_ENDINGS[editor.document.eol];
    copiedContent = { text, fullLine: true };
  } else {
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
  if (!editor || !copiedContent) { return; }

  const selections = editor.selections;
  const { text, fullLine } = copiedContent;

  editor.edit(textEdit => {
    selections.forEach(selection => {
      if (fullLine) {
        // Paste full line before current line
        textEdit.insert(new vscode.Position(selection.start.line, 0), text);
      } else {
        // Paste selection at cursor
        textEdit.insert(selection.start, text);
      }
    });
  });
}

/**
 * Original behavior: copy+paste immediately.
 */
function duplicateText() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) { return; }

  const selections = editor.selections;

  editor.edit(textEdit => {
    selections.forEach((selection) => {
      if (selection.isEmpty) {
        //Duplicate line
        const text = editor.document.lineAt(selection.start.line).text;
        textEdit.insert(new vscode.Position(selection.start.line, 0), `${text}${LINE_ENDINGS[editor.document.eol]}`);
      } else {
        //Duplicate selection
        const text = editor.document.getText(selection);
        textEdit.insert(selection.start, text);
      }
    });
  });
}
