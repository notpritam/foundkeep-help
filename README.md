# FoundKeep Help

The help & guides site for [FoundKeep](https://foundkeep.app) — a private place to
keep the things worth keeping, and find them again. Built with
[Astro Starlight](https://starlight.astro.build/), output as a **static** site and
served at **help.foundkeep.app**.

- Dark theme by default (light mode available via the toggle), emerald FoundKeep
  accent.
- Built-in client-side search (Starlight / Pagefind).
- Broken internal links fail the build (`starlight-links-validator`).

## Prerequisites on this box

nvm's node/npx are broken here. Use:

```bash
export PATH="$HOME/.bun/bin:$PATH"   # bun / bunx
# system node is v26 at /usr/bin/node if you ever need it directly
```

## Develop

```bash
bun install
bunx astro dev        # http://localhost:4321
```

## Build (static)

```bash
bunx astro build      # -> dist/
bunx astro preview    # serve the built dist/ locally
```

`dist/` is a plain static site (`index.html` + one folder per article). No SSR, no
server adapter — it's served by Caddy `file_server`.

## Author an article

1. Add a Markdown/MDX file under `src/content/docs/`, e.g.
   `src/content/docs/my-new-guide.md`.
2. Give it frontmatter:

   ```md
   ---
   title: My new guide
   description: One line describing the page (used for SEO and search).
   ---

   Real prose goes here. Use numbered lists for steps and link related guides
   with root-relative links like [Getting started](/getting-started/).
   ```

3. Add it to the sidebar in `astro.config.mjs` under the right group, referencing
   it by `slug` (the filename without extension).
4. Run `bunx astro build` — the link validator will flag any broken cross-links.

### Where things live

| Path | What |
|---|---|
| `src/content/docs/` | the articles |
| `astro.config.mjs` | site config, sidebar groups, social links, theme hooks |
| `src/styles/foundkeep.css` | brand theme (colours, dark default) |
| `src/components/ThemeProvider.astro` | makes dark the default |
| `src/components/Footer.astro` | footer links back to foundkeep.app |
| `src/assets/foundkeep-mark.svg` | logo (also `public/favicon.svg`) |

## Deploy

`deploy/deploy.sh` runs `bun install` → `bunx astro build` → `rsync` of `dist/`
into `/var/www/foundkeep-help/`.

> **The `/var/www` write and the Caddy vhost need sudo and are run by the
> operator, not by an agent.** `deploy/Caddyfile.help` contains the vhost block;
> adding it to `/etc/caddy/Caddyfile` must follow the shared Caddy safety ritual
> (back up the file, verify every existing vhost is still present before and
> after, `caddy validate`, then reload). This repo never edits Caddy for you.

Cloudflare: add a `help` CNAME → `foundkeep.app` (proxied), SSL mode Full.

## License / ownership

`notpritam/foundkeep-help`. Commits authenticate as
`notpritam <notpritamsharma@gmail.com>`.
