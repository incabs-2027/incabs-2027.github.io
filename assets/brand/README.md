# Brand assets — source files

Original, full-resolution logo files as supplied. Not served by the site
directly — these are the source of truth for regenerating web-optimized
versions if a different size/crop is ever needed.

- `incabs-original.png` — inCABS 2027 conference badge
- `gystai-original.png` — GYST-AI (Global Youth AI & STEM Foundation) logo

The actual web-served versions (cropped tight to content, resized, and
palette-optimized for file size) live in `public/images/` and
`src/app/icon.png`. They were generated from these originals with Pillow
(crop to content bounding box, resize to a 320px max dimension, quantize
to a ~128-160 color palette). Regenerate them the same way if the source
art changes.
