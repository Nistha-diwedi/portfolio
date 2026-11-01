# Portfolio

Single page portfolio for Nistha Diwedi. Plain HTML, CSS and JavaScript, no build step and no dependencies.

## Files

```
portfolio/
  index.html                 markup and content
  styles.css                 theme, layout, responsive rules
  script.js                  theme toggle, mobile nav, scroll reveal
  assets/
    Nistha_Diwedi_Resume.pdf  the file served by the Resume buttons
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy on GitHub Pages

1. Create a repository, for example `portfolio`.
2. Copy the contents of this folder into the repository root, so `index.html` sits at the top level.
3. Push to `main`.
4. In the repository, open Settings, then Pages, then set Source to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. The site appears at `https://<username>.github.io/portfolio/`.

For a user site, name the repository `<username>.github.io` and the site appears at `https://<username>.github.io/`.

## Editing

- Content lives directly in `index.html`. Project entries are `article.card.project` blocks, so copy one and change the text, tags and links.
- Colors, spacing and type scale are CSS variables at the top of `styles.css`. The dark theme overrides them under `html[data-theme="dark"]`.
- The resume download points to `assets/Nistha_Diwedi_Resume.pdf`. Replace that file with the resume version you want to share, keeping the same name, or update both links in `index.html`.
- The theme choice is saved in `localStorage` under `nd-theme`.

## Notes

- Works without JavaScript: content stays visible and all links still work.
- Respects `prefers-reduced-motion` and `prefers-color-scheme`.
- Tested at 390 px, 768 px, 1024 px and 1440 px widths.
