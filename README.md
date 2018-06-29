# Duplicate selection or line

Duplicte functionality like you are used to.

## Features

Adds *duplicate text* functionality to `vscode` similar to that in Sublime Text or Resharper.

* When nothing is selected, the whole line is duplicated and caret is placed on the lower line
* When text is selected, the selection is duplicated and the new copy is selected
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

NOTE: if the key binding isn't working, it may be because something is alread bound to that key combination. Search for other bindings and delete them.

## Release Notes

### 1.0.0

Initial release.

### 1.0.1

Added icon image

**Enjoy!**
