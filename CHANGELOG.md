See also [https://github.com/stkb/vscode-rewrap/releases](https://github.com/stkb/vscode-rewrap/releases)


### 0.6.3

- Added """-comments for Python (previously only supported ''') (#15)
- Added # markers for ini files (includes other types of config files, eg .gitconfig)
- Fixed an error caused by empty comments (#11, #14)

Upgraded to TypeScript 2.0; vscode v1.6+ is now required.


### 0.6.2

Fixed a bug where the last line of comment sections of some types of files wouldn't be included in the wrapping (#12).

Types affected: dockerfile, ini, makefile, perl, r, rust, shellscript, vb, yaml


### 0.6.1

No longer hard-wraps very long words, eg URLs (#10)


## 0.6.0

Changed the default keybinding to Alt+Q (#5)

- Old keybinding (Ctrl+K Ctrl+W) still works for those used to that one.
- For those with a custom binding set, nothing changes.

Added AutoHotKey (.ahk) file support

Bug fixes:
- Fixed wrapping on unsaved files (#8)
- Fixed alignment of end-comment marker (#9)


### 0.5.3

Fixed problems with extensionless filenames.


### 0.5.2

VSCode v1.1.0 broke Rewrap. This release fixes it.


### 0.5.1

Fixed a filename issue, causing the extension not to work on Mac & Linux.


## 0.5.0

This release adds a markdown feature to all document types: You can end a line with 2 spaces to force a mid-paragraph line break after it.

```js
// This line ends with 2 spaces˽˽
// Because I want this to be on a new line
```

Speaking of markdown, the main new feature for this release is full markdown support. You can safely ctrl+a and then wrap a whole document at once to reformat all paragraphs appropriately without messing anything up.

Lastly, the selection moving/expanding after wrapping has been fixed (#4)


### 0.4.2

- If file is an unknown type, still provide plain text wrapping.
- Adds some better paragraph detection for markdown.
  - Mid-pararaph line breaks (2 trailing spaces)
  - List items


## 0.4.0

Now wraps to the correct visual column when using tabbed indents. (#2)


## 0.3.0

Skipping a version number because this version adds two new features.

- Doc comments: you can now run the command on a whole doc comment and now worry about param tags, code examples etc getting messed up. Rewrap now preserves these.
- Plain text: If you select something other than a comment it will be re-wrapped as plain text instead. Useful for text, markdown or html files etc, but works on any type of file.


## 0.1.0

Add support for many more languages:

bat, groovy, less, objective-c, sass, shaderlab, swift, coffeescript,
dockerfile, makefile, perl, perl6, r, shellscript, yaml, fsharp, haskell,
elm, purescript, ini, jade, lua, perl6, php, powershell, python, rust, sql, vb


## 0.0.2

First release.