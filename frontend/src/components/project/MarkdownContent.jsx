function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-slate-800"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

export default function MarkdownContent({ content }) {
  const lines = String(content || "").split("\n");
  const blocks = [];
  let codeBuffer = null;

  lines.forEach((line, index) => {
    if (line.trim().startsWith("```")) {
      if (codeBuffer) {
        blocks.push({ type: "code", text: codeBuffer.join("\n") });
        codeBuffer = null;
      } else {
        codeBuffer = [];
      }
      return;
    }

    if (codeBuffer) {
      codeBuffer.push(line);
      return;
    }

    if (!line.trim()) {
      blocks.push({ type: "space", key: index });
      return;
    }

    if (/^[-*]\s+/.test(line.trim())) {
      blocks.push({ type: "li", text: line.trim().replace(/^[-*]\s+/, "") });
      return;
    }

    blocks.push({ type: "p", text: line });
  });

  if (codeBuffer) {
    blocks.push({ type: "code", text: codeBuffer.join("\n") });
  }

  return (
    <div className="space-y-3 text-[15px] leading-7 text-slate-700">
      {blocks.map((block, index) => {
        if (block.type === "space") return <div key={index} className="h-1" />;

        if (block.type === "code") {
          return (
            <pre
              key={index}
              className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-sm leading-6 text-slate-100"
            >
              <code>{block.text}</code>
            </pre>
          );
        }

        if (block.type === "li") {
          return (
            <p key={index} className="pl-4 before:mr-2 before:content-['-']">
              {renderInline(block.text)}
            </p>
          );
        }

        return <p key={index}>{renderInline(block.text)}</p>;
      })}
    </div>
  );
}
