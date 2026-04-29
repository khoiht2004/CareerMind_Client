const BOLD_REGEX = /(\*\*.*?\*\*)/g;

function renderText(text) {
  return text
    .split(BOLD_REGEX)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return (
          <span key={i} className="font-bold">
            {part.slice(2, -2)}
          </span>
        );
      return <span key={i}>{part}</span>;
    });
}

export default renderText;
