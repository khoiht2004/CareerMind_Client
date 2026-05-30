import CopyBlock from "./CopyBlock";

const BOLD_REGEX = /(\*\*.*?\*\*)/g;
const HEADING_REGEX = /^(#{1,6})\s+(.+)$/;
const SEPARATOR_REGEX = /^[\s]*[-=─—]{2,}[\s]*$/;

function renderInline(text) {
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

function renderText(text) {
  const lines = String(text || "")
    .replace(/\r\n/g, "\n")
    .split("\n");
  const blocks = [];
  let quoteBuffer = [];
  let paragraphBuffer = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    blocks.push({ type: "paragraph", content: paragraphBuffer.join("\n") });
    paragraphBuffer = [];
  };

  const flushQuote = () => {
    if (!quoteBuffer.length) return;
    blocks.push({ type: "quote", content: quoteBuffer.join("\n") });
    quoteBuffer = [];
  };

  lines.forEach((line) => {
    if (SEPARATOR_REGEX.test(line)) return;

    const quoteMatch = line.match(/^>\s?(.*)$/);
    if (quoteMatch) {
      flushParagraph();
      quoteBuffer.push(quoteMatch[1]);
      return;
    }

    flushQuote();

    const headingMatch = line.match(HEADING_REGEX);
    if (headingMatch) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level: Math.min(headingMatch[1].length, 3),
        content: headingMatch[2],
      });
      return;
    }

    paragraphBuffer.push(line);
  });

  flushQuote();
  flushParagraph();

  return blocks.map((block, index) => {
    if (block.type === "quote") {
      return <CopyBlock key={index} text={block.content} />;
    }

    if (block.type === "heading") {
      const className =
        block.level === 1
          ? "mt-2 mb-1 text-base font-bold"
          : "mt-2 mb-1 text-sm font-bold";
      return (
        <div key={index} className={className}>
          {renderInline(block.content)}
        </div>
      );
    }

    return (
      <span key={index} className="whitespace-pre-wrap">
        {renderInline(block.content)}
      </span>
    );
  });
}

export default renderText;
