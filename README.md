# Duplicate selection or line

Duplicate functionality like you are used to.

## Features

It adds *duplicate text* functionality to `vscode` similar to Sublime Text or Resharper.

* When nothing is selected, the whole line is duplicated, and the caret is placed on the lower line
* When text is selected, the selection is duplicated, and the new copy is selected
* Works with multiple selections

## Keyboard shortcuts

This extension provides bindings for `ctrl+d` (Windows/Linux) and `cmd+d` (MacOS). To customize keyboard shortcuts `Preferences -> Keyboard Shortcuts`:

```json
{
    "mac": "cmd+d",
    "key": "ctrl+d",
    "command": "geeebe.duplicateText",
    "when": "editorTextFocus"
}
```

Since version 1.0.4, it also supports separate copy and paste commands. This functionality is similar to SlickEdit, where you may configure a smart copy:" If nothing is selected, the whole line is copied. Later, if a whole line is copied, it is pasted after the current line, and the cursor position is set on the new line.

Note: If the key binding isn't working, it may be because something is already bound to that key combination. Please search for other bindings and delete them.

Bind it this way (Mac example; feel free to choose your own keys):
```json
    {
        "key": "ctrl+c",
        "command": "geeebe.copyText",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+v",
        "command": "geeebe.pasteText",
        "when": "editorTextFocus"
    }
```

## Release Notes

### 1.0.0
Initial release.

### 1.0.1
Added icon image

### 1.0.2
Transitional version
Minor adaptations to newer npm and newer vscode  version

### 1.0.3
Added split functionality for copy and past; the original functionality was left untouched

### 1.0.4
Minor fixes of 1.0.3
A LICENSE.MD file was added.

**Enjoy!**
