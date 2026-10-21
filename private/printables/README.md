# Printables

Email-gated PDFs live here, outside `/public`, so nothing on the site can link
to them directly. The only way to fetch one is through
`/api/printables/download` with a signed token that the signup form hands out
after a valid email is recorded.

To add or replace a printable:

1. Put the PDF in this folder. Keep the file name that `src/data/printables.ts`
   expects, for example `thanksgiving-cleaning-checklist-printable.pdf`.
2. If it is a new printable, add an entry to `src/data/printables.ts`.
3. On the post that offers it, set `printable: { id, title, blurb, buttonLabel,
   beforeStep }` in `src/data/posts.ts`.
4. Commit and push. The build bundles this folder with the download route.
