# Deploy Stress Happens on GitHub Pages

The deployable root is this Direction B folder. Publish its contents at the repository root on `main`, with GitHub Pages set to **Deploy from a branch → main → / (root)**. The site uses relative paths and includes an empty `.nojekyll` file.

## Deployment status

- **Repository** — [bjj911027-ux/infant-stress-support](https://github.com/bjj911027-ux/infant-stress-support)
- **Live website** — [Stress Happens](https://bjj911027-ux.github.io/infant-stress-support/)
- **Pages source** — Deploy from a branch, `main`, `/ (root)`
- **First published** — November 13, 2026

## Publish and verify

1. Create or use the public `infant-stress-support` repository. Commit the contents of this folder to `main` and push.
2. Open **Settings → Pages**. Select **Deploy from a branch**, **main**, and **/ (root)**. Save and wait for the Pages deployment to finish.
3. Open the URL shown in Pages settings. Check mobile navigation, the scenario results, external resources, and the sound controls.
4. In a scenario, play the included **No. 9 Esther’s Waltz** recording at volume `0.22`. Verify that playback carries through scenario steps and stops when leaving for Home, Quick Guide, or You Matter, Too.

[GitHub Pages publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Local HTTP preview

From `concepts/`, run `python -m http.server 8000 --bind 127.0.0.1` and open [Direction B](http://127.0.0.1:8000/direction-b/). The subpath exercises the same relative paths as a GitHub Pages repository site.
