import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('geeebe.duplicateText', duplicateText)
  );
}

const LINE_ENDINGS = ['', '\n', '\r\n',];

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
