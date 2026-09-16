---
title: Connect Claude & Codex
description: Connect Claude Code, Claude Desktop, and Codex to your FoundKeep library over MCP — no token, just a browser sign-in.
---

Connect an AI assistant and your FoundKeep library becomes a tool it can read,
search, and organize. It works with **Claude Code**, **Claude Desktop**, and
**Codex** over MCP.

:::note
[foundkeep.app/connect](https://foundkeep.app/connect) is the canonical, always
up-to-date install page. This guide mirrors it — if anything differs, trust the
connect page.
:::

## No token — you sign in through your browser

FoundKeep's MCP server is remote and OAuth-enabled. **There's nothing to copy or
paste.** The first time a client connects, it opens a browser page for you to
authorize; after that it reconnects silently.

You can **revoke access anytime** at **foundkeep.app → Settings → Agent
connections**.

## Claude Code

Add the marketplace, then install the plugin:

```
/plugin marketplace add notpritam/foundkeep-claude
/plugin install foundkeep
```

That gives you the `foundkeep` MCP server plus a couple of slash commands
(`/foundkeep-save`, `/foundkeep-recall`) and a skill that teaches Claude the full
FoundKeep tool set. On first use, Claude prompts you to authorize the connection
in your browser.

## Claude Desktop

1. Download **`foundkeep.mcpb`** from the connect page (or the project's latest
   GitHub release).
2. Double-click it — Claude Desktop installs the extension.
3. The first run opens your browser to authorize.

Requires Node.js 18+ (the bundle uses `mcp-remote` under the hood).

## Codex

Add this block to `~/.codex/config.toml`:

```toml
[mcp_servers.foundkeep]
command = "npx"
args = ["-y", "mcp-remote", "https://foundkeep.app/api/mcp"]
```

Then start Codex. The first run opens your browser to authorize; after you
approve, the tokens are cached locally and later runs connect silently. Requires
Node.js 18+.

## What your agent can do

Once connected, Claude or Codex can search your library, read individual saves and
files, create new saves, and help organize what's there — tagging, grouping, and
linking. Because it works from what *you* chose to keep, its answers are grounded
in your own sources. See [A second brain for agents](/usecase-second-brain-for-agents/).

## A note on safety

Saved content, filenames, and metadata are treated as untrusted data. Claude and
Codex are instructed never to follow instructions found *inside* saved items, and
to act only on your explicit requests. Sharing, deletion, and other consequential
actions require your intent. More in [Privacy](/privacy/).
