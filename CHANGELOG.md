## 0.1.0-alpha.1 (Jul 25, 2023)

The following changes were made for all packages

- Updated README.md
- Updated LICENSE
- Updated author in package.json

## 0.1.0-alpha.0 (Jul 24, 2023)

Complete project overhaul!

Photon Terminal now resides within a monorepo.

- CLI: All existing code has been moved to code/lib/cli
- Lexer: Added lexical analysis tool
- Parser: Added syntax analysis tool
- Shared: Added common utilities and resources

---

## 0.0.5 (Dec 16, 2021)

### Features

- Added indenting to `.showLog()`.
- Added states to style rules making the parser more accurate.
- Added the `width` style rule.
- Re-introduced the ability to only set element type (`new Photon.Element('p')`) when creating a new Element instance.

### Changes

- Changed `instruction.value` type from `string` to `number | string`.

---

## 0.0.4 (Dec 8, 2021)

A quick fix for documentation not matching the current release.  
Many changes were made to the repository in preparation for adding new contributors.

### Features

- Added Issue templates to repository.
- Added LICENCE to repository.

### Fixes

- Updated documentation so it applies to the current release.

---

## 0.0.3 (Dec 8, 2021)

### Features

- Added `Element.showInstructions()` to display the instructions array.
- Added a new class to hold the instructions stack.
- Added styling rules: `paddingLeft`, `paddingRight`.

### Changes

- Improved `Element.showLog()`
- Improved documentation.
- Margin styling-rule value now accepts `'none'`.
- Content must be defined when creating a new Element instance.

### Fixes

- Properly implemented margin styling rules for `'p'` Elements.

---

## 0.0.2 (Dec 6, 2021)

### Changes

- Implemented the `Instruction` class.
- Improved `Element` logs.

---

## 0.0.1 (Dec 6, 2021)

The first pre-release of Photon Terminal.
