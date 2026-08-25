# Book covers

Place portrait cover art at:

```text
public/books/<book-id>/cover.jpg
```

The current files came from [Open Library Covers](https://openlibrary.org/dev/docs/api/covers). You can replace a cover with your own scan or licensed artwork. Keep the same filename and the shelf will load it through `coverImage` in `components/books/catalog.ts`.
