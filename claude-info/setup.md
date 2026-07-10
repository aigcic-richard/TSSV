# Setting Up Claude Code in the TSSV Project

This document covers the one-time setup required to start using Claude Code in the TSSV repository.

---

## Prerequisites

- **Node.js** — already required for TSSV, no additional installation needed

---

## 1. Install the Claude Code CLI

```bash
npm install -g @anthropic-ai/claude-code
```

---

## 2. Install the VS Code Extension

Install the **Claude Code** extension by Anthropic from the VS Code Extensions marketplace, then connect it to your Claude Code account following the extension's sign-in prompts.

---

## 3. Install Verible (optional — required for `engine: 'verible'` formatting)

Verible provides the `verible-verilog-format` binary used by TSSV's body formatter.

**macOS ARM64**

Verible is distributed via a custom Homebrew tap. Make sure your Xcode Command Line Tools are up to date first (`xcode-select --install`), then:

```bash
brew tap chipsalliance/verible
brew install verible
```

Verify the install:

```bash
verible-verilog-format --version
```

Expected output (version may differ):

```
Version v0.0-3946-g851d3ff4
Commit-Timestamp        2025-02-17T07:27:44Z
Built   2025-02-17T07:27:44Z
```

**Linux**

Download the pre-built binary for your architecture from the [Verible GitHub releases page](https://github.com/chipsalliance/verible/releases) and place `verible-verilog-format` somewhere on your `PATH`.

**Custom binary path**

If the binary is not on `PATH`, pass its location via `FormatterConfig`:

```ts
Module.setFormatterConfig({
  engine: 'verible',
  veriblePath: '/path/to/verible-verilog-format'
})
```
This path should be common for all users to prevent errors.

---

## 4. Initialize Claude in the TSSV Directory

Open the TSSV directory in VS Code, then run the `/init` command. Claude will analyze the codebase and generate a `CLAUDE.md` file at the repo root.

`CLAUDE.md` is automatically loaded into Claude's context at the start of every session — it contains project-specific guidance (build commands, architecture overview, simulation workflow) so Claude can be productive immediately without re-explaining the project each time.
