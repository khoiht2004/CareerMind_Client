const ID_TOKEN_REGEX = /(\[ID:[a-zA-Z0-9_-]+\])/g;

// Parse content into ordered segments: { type: "text" | "jobs", content?, ids? }
// Consecutive [ID:xxx] tokens (even separated by whitespace-only) are grouped
// into a single "jobs" segment so they render side-by-side in a flex container.
function parseContent(raw) {
  const parts = raw.split(ID_TOKEN_REGEX).filter(Boolean);
  const segments = [];
  let textBuffer = "";
  let idBuffer = [];

  for (const part of parts) {
    const idMatch = part.match(/^\[ID:([a-zA-Z0-9_-]+)\]$/);
    if (idMatch) {
      if (textBuffer) {
        segments.push({ type: "text", content: textBuffer.trimEnd() });
        textBuffer = "";
      }
      idBuffer.push(idMatch[1]);
    } else {
      if (idBuffer.length > 0) {
        // Whitespace-only between IDs (e.g. "\n") — keep grouping
        if (part.trim() === "") continue;
        segments.push({ type: "jobs", ids: idBuffer });
        idBuffer = [];
        textBuffer = part.replace(/^\n+/, "");
      } else {
        textBuffer += part;
      }
    }
  }

  if (idBuffer.length > 0) segments.push({ type: "jobs", ids: idBuffer });
  if (textBuffer.trim()) segments.push({ type: "text", content: textBuffer });

  return segments;
}

export { parseContent };
