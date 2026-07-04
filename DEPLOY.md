# Deploy to GitHub Pages

The site builds to static files (`dist/`) and is deployed by GitHub Actions
([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) on every push to
`main`. You never build or upload by hand.

---

## ⚠️ Choose the URL type first — it changes the config

This project's header builds root-absolute links on the client (`/projects`,
`/ru/`, …). That means:

| Where the site lives                          | `base` needed? | Works out of the box? |
| --------------------------------------------- | -------------- | --------------------- |
| `https://<user>.github.io` (repo `<user>.github.io`) | no      | ✅ yes                 |
| Custom domain (`konov.dev`)                   | no             | ✅ yes                 |
| `https://<user>.github.io/<repo>/` (project page) | yes (`/repo/`) | ⚠️ needs code changes |

**Recommended: deploy at the root** (a `<user>.github.io` repo or a custom
domain). Then no `base` is required and the header links just work.

If you must use a project page under a sub-path, see
[Sub-path deployment](#sub-path-deployment-advanced) at the bottom.

---

## One-time setup

### 1. Set `site` in `astro.config.mjs`

Used for canonical URLs / sitemaps. Replace with your real URL:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://<user>.github.io", // or "https://your-custom-domain"
});
```

### 2. Create the repo and push

```bash
cd /home/konstantin/Yandex.Disk/portfolio
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin git@github.com:<user>/<repo>.git
git push -u origin main
```

> For a user site, `<repo>` **must** be exactly `<user>.github.io`.

### 3. Enable Pages → GitHub Actions

On GitHub: **Settings → Pages → Build and deployment → Source = "GitHub
Actions"**. (Not "Deploy from a branch".) That's it — the included workflow
takes over.

### 4. Watch the deploy

**Actions** tab → the "Deploy to GitHub Pages" run. When green, the site is live
at the `site` URL. First deploy can take a couple of minutes.

---

## Everyday workflow

```bash
# edit content in src/content/pages/** or components, then:
git add .
git commit -m "Update writing"
git push
```

Push to `main` → Actions rebuilds and redeploys automatically. Nothing else.

Preview locally before pushing:

```bash
npm run dev      # http://localhost:4321
npm run build && npm run preview   # verify the production build
```

---

## Custom domain (optional)

1. **Settings → Pages → Custom domain** → enter the domain, Save.
   This commits a `CNAME` file to the repo — keep it.
2. DNS at your registrar:
   - Apex (`konov.dev`): four `A` records → `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - Subdomain (`www.konov.dev`): one `CNAME` → `<user>.github.io`.
3. Set `site` in `astro.config.mjs` to the custom domain.
4. Tick **Enforce HTTPS** once the certificate is issued (can take a few
   minutes to an hour).

---

## Sub-path deployment (advanced)

Only if the site lives at `https://<user>.github.io/<repo>/`.

1. In `astro.config.mjs`:
   ```js
   export default defineConfig({
     site: "https://<user>.github.io",
     base: "/<repo>/",
   });
   ```
2. **Code changes are required** — the hand-written links don't know about
   `base`:
   - `src/components/Header.astro`: the nav `href`s and the `localizeHeader`
     script build paths from `/`. They must be prefixed with `import.meta.env.BASE_URL`.
   - Any other absolute `/...` link.

   Ask me and I'll refactor the header to be `base`-aware. Until then, use a
   root deployment.

---

## Troubleshooting

- **404 / blank page on a project sub-path** → you deployed under `/<repo>/`
  without setting `base`. Use a root deployment or follow the section above.
- **CSS/links missing after adding a custom domain** → make sure `site` matches
  the live URL and the `CNAME` file wasn't deleted.
- **Workflow fails at "Deploy to GitHub Pages"** → Pages Source isn't set to
  "GitHub Actions" (step 3).
