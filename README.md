# OmniInteract

Project website for **OmniInteract: Towards Unified Whole-Body Interaction Control for Dual Humanoids**.

Website: https://calvinyhli.github.io/omniinteract.github.io/

## Editing

- `site-config.js`: authors, abstract, media sources, descriptions, research links and BibTeX.
- `index.html`: page shell, cover capability labels and interaction pipeline labels.
- `styles.css`: appearance and responsive layout.
- `assets/`: paper, videos, figures, captions and logos.

Use relative asset paths such as `assets/demos/example.mp4`. Preserve file-name capitalization. Keep individual files below GitHub's 100 MiB limit.

## Hosting

This is a static website with no build step or package installation. Configure GitHub Pages to deploy from `main`, `/(root)`. The `.nojekyll` file keeps assets available without Jekyll processing.

## Website analytics

Cloudflare Web Analytics is installed near the end of `index.html`. It loads only on `calvinyhli.github.io/omniinteract.github.io/`; local previews and other project paths are excluded.

To view page views and visits, sign in to Cloudflare and open **Observability → Analytics → Web analytics → calvinyhli.github.io**. The beacon token in the page is a public site identifier, not an account API key. Statistics begin after installation; earlier visits are unavailable.

## Credits

The visual layout was inspired by [PredActor](https://masteryip.github.io/predactor.github.io/). Institution logo source URLs are recorded in `LOGO_SOURCES.json`.
