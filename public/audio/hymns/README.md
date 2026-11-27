# Instrumental hymn recordings

Place approved, correctly matched instrumental recordings in this folder.

## File naming

Use the hymn number as the filename, for example:

- `1.mp3` for hymn 1
- `2.mp3` for hymn 2

Then add the matching entry to `instrumentalTunes` in
`src/components/InstrumentalPlayer.tsx`, for example:

```ts
const instrumentalTunes: Record<number, string> = {
  1: "/audio/hymns/1.mp3",
  2: "/audio/hymns/2.mp3",
};
```

Only add a mapping after confirming that the recording follows the correct tune
for that hymn. Use recordings and arrangements that the project has permission
to distribute. Prefer compressed MP3 files with clear instrumental audio.
