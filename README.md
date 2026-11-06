# session-board-page

The public, data-free page of a personal Session board, served by GitHub Pages at
https://gabrieldelacruz.github.io/session-board-page/.

The data (`board.json`) lives in the private repo `gabrieldelacruz/session-board`.
The page reads it through the GitHub API with a fine-grained token that the viewer
pastes once per browser; the token stays in that browser's local storage and is sent
only to `api.github.com`. Without a token the page shows setup instructions and nothing else.

Updates to the data show on the next refresh; nothing here redeploys when the data changes.

## Local preview

```bash
node ~/.claude/session-board-page/serve.mjs
```

Then open http://localhost:8765/?source=local, which reads `board.json` from the clone at
`~/.claude/session-board` instead of the API.
