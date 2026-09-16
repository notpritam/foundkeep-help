// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

// https://astro.build/config
export default defineConfig({
  site: 'https://help.foundkeep.app',
  // Static output (default). Served by Caddy file_server from /var/www/foundkeep-help.
  output: 'static',
  integrations: [
    starlight({
      title: 'FoundKeep Help',
      description:
        'Guides and tips for FoundKeep — a private place to keep the things worth keeping, and find them again.',
      logo: {
        src: './src/assets/foundkeep-mark.svg',
        alt: 'FoundKeep',
        replacesTitle: false,
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/foundkeep.css'],
      plugins: [starlightLinksValidator()],
      // Default to dark; light mode still available via the theme toggle.
      components: {
        ThemeProvider: './src/components/ThemeProvider.astro',
        Footer: './src/components/Footer.astro',
      },
      social: [
        { icon: 'external', label: 'FoundKeep', href: 'https://foundkeep.app' },
        { icon: 'puzzle', label: 'Connect agents', href: 'https://foundkeep.app/connect' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/notpritam/foundkeep-help' },
      ],
      // Starlight ships a built-in client-side search (Pagefind) for static builds.
      pagination: true,
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Welcome', slug: 'index' },
            { label: 'Getting started', slug: 'getting-started' },
            { label: 'Save from anywhere', slug: 'save-from-anywhere' },
          ],
        },
        {
          label: 'Organize',
          items: [
            { label: 'Folders & tags', slug: 'folders-and-tags' },
            { label: 'Search & filters', slug: 'search-and-filters' },
            { label: 'Link saves & the graph', slug: 'link-saves-and-graph' },
            { label: 'Collections & sharing', slug: 'collections' },
          ],
        },
        {
          label: 'Use cases',
          items: [
            { label: 'A research library', slug: 'usecase-research-library' },
            { label: "A reading list you'll finish", slug: 'usecase-reading-list' },
            { label: 'An inspiration board', slug: 'usecase-inspiration-board' },
            { label: 'A second brain for agents', slug: 'usecase-second-brain-for-agents' },
            { label: 'Keep tweets forever', slug: 'usecase-keep-tweets-forever' },
          ],
        },
        {
          label: 'Power',
          items: [
            { label: 'Connect Claude & Codex', slug: 'connect-claude-codex' },
            { label: 'Tips & shortcuts', slug: 'tips-and-shortcuts' },
            { label: 'Plans & storage', slug: 'plans-and-storage' },
            { label: 'Privacy', slug: 'privacy' },
          ],
        },
      ],
    }),
  ],
});
