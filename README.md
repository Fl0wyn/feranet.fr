# Feranet

A collection of useful tips, tricks and tools for developers, sysadmins and creators — built with **Next.js 16**, React 19 and Tailwind CSS 4.

- **Landing page** — `/`
- **Wiki** — `/wiki`, generated from the Markdown files in [`content/wiki`](content/wiki)
- **Tools** — `/tools`, data in [`lib/tools.ts`](lib/tools.ts)
- **Ticketing** — `/tickets`, a small help desk (list & kanban board, priorities, comments, activity log)

## Getting started

```sh
git clone https://github.com/Fl0wyn/feranet.fr.git
cd feranet.fr
pnpm install
cp .env.example .env.local
pnpm dev
```

Then open <http://localhost:3000>. Press <kbd>Ctrl</kbd> + <kbd>K</kbd> anywhere to search the wiki and tools.

## Languages (EN / FR)

The interface is available in English and French. Like the dark mode, the language follows the browser
preference (`Accept-Language`) until the visitor picks one with the header toggle (stored in the `locale` cookie).
URLs stay the same: [`proxy.ts`](proxy.ts) rewrites each request to `app/[lang]/…`, so every page is prerendered
in both languages. `/fr/...` or `/en/...` links force a language and redirect to the plain URL.

UI strings live in [`lib/i18n/dictionaries.ts`](lib/i18n/dictionaries.ts) and tool descriptions in
[`lib/tools-fr.ts`](lib/tools-fr.ts). Wiki articles stay in English.

## Writing wiki pages

Add a Markdown file to `content/wiki/<section>/<slug>.md` (sections: `linux`, `windows`, `glpi`, `archives`).
The first `# Heading` becomes the page title and the first paragraph its description. GitHub Flavored Markdown,
syntax highlighting (Shiki) and `::: info` / `::: tip` / `::: warning` callouts are supported.

## Ticketing configuration

| Variable              | Description                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------- |
| `TICKETS_PASSWORD`    | Access password. **Required in production** (the desk stays locked without it). Optional in dev. |
| `DATABASE_URL`        | libSQL URL. Defaults to `file:./data/tickets.db` (local SQLite file).                          |
| `DATABASE_AUTH_TOKEN` | Auth token when using a remote [Turso](https://turso.tech) database.                           |

Serverless hosts such as Vercel have a read-only file system: use a Turso database
(`DATABASE_URL=libsql://…` + `DATABASE_AUTH_TOKEN`) in production. The schema is created automatically on first use.

## Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start the dev server     |
| `pnpm build` | Production build         |
| `pnpm start` | Serve the production build |
| `pnpm lint`  | Type-check the project   |
