/**
 * TipTap/ProseMirror JSON renderer — no TipTap deps.
 *
 * The staff portal's TipTap editor saves documents as serialized
 * ProseMirror JSON. We render it to React without pulling in the TipTap
 * React package (and its ~15 extension subpackages) so the public bundle
 * stays small.
 *
 * Covers the node and mark types the staff editor emits (StarterKit +
 * Link + Image). An unknown node type renders as its children or a plain
 * fallback so the page doesn't blank out when staff add a new feature
 * before this renderer catches up.
 */
import * as React from "react";

type Mark = {
  type: string;
  attrs?: Record<string, unknown>;
};

type Node = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: Node[];
  text?: string;
  marks?: Mark[];
};

export default function TipTapRenderer({ json }: { json: string }) {
  const doc = React.useMemo<Node | null>(() => {
    try {
      const parsed = JSON.parse(json) as Node;
      return parsed;
    } catch {
      return null;
    }
  }, [json]);

  if (!doc || !doc.content) return null;
  return <>{doc.content.map((n, i) => renderNode(n, String(i)))}</>;
}

function renderNode(node: Node, key: string): React.ReactNode {
  const children = node.content?.map((c, i) => renderNode(c, `${key}.${i}`)) ?? null;

  switch (node.type) {
    case "paragraph":
      return <p key={key}>{children}</p>;

    case "heading": {
      const level = Number(node.attrs?.level ?? 2);
      const Tag = (`h${Math.min(6, Math.max(1, level))}`) as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return <Tag key={key}>{children}</Tag>;
    }

    case "bulletList":
      return <ul key={key}>{children}</ul>;

    case "orderedList":
      return <ol key={key}>{children}</ol>;

    case "listItem":
      return <li key={key}>{children}</li>;

    case "blockquote":
      return <blockquote key={key}>{children}</blockquote>;

    case "codeBlock": {
      const lang = typeof node.attrs?.language === "string" ? node.attrs.language : undefined;
      return (
        <pre key={key}>
          <code className={lang ? `language-${lang}` : undefined}>{children}</code>
        </pre>
      );
    }

    case "horizontalRule":
      return <hr key={key} />;

    case "hardBreak":
      return <br key={key} />;

    case "image": {
      const src = typeof node.attrs?.src === "string" ? node.attrs.src : "";
      const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "";
      const title = typeof node.attrs?.title === "string" ? node.attrs.title : undefined;
      if (!src) return null;
      // eslint-disable-next-line @next/next/no-img-element
      return <img key={key} src={src} alt={alt} title={title} />;
    }

    case "text":
      return renderText(node, key);

    default:
      // Unknown nodes render their children if they have any, else nothing.
      // Keeps the page functional when staff use a node type we haven't
      // taught this renderer about yet.
      return children ? <React.Fragment key={key}>{children}</React.Fragment> : null;
  }
}

function renderText(node: Node, key: string): React.ReactNode {
  const text = node.text ?? "";
  if (!node.marks || node.marks.length === 0) {
    return <React.Fragment key={key}>{text}</React.Fragment>;
  }

  // Apply marks innermost-out so the final element is the outermost
  // wrapper. Order doesn't matter semantically, but we keep it stable.
  let element: React.ReactNode = text;
  for (const mark of node.marks) {
    element = wrapWithMark(mark, element);
  }
  return <React.Fragment key={key}>{element}</React.Fragment>;
}

function wrapWithMark(mark: Mark, children: React.ReactNode): React.ReactNode {
  switch (mark.type) {
    case "bold":
    case "strong":
      return <strong>{children}</strong>;
    case "italic":
    case "em":
      return <em>{children}</em>;
    case "strike":
      return <s>{children}</s>;
    case "underline":
      return <u>{children}</u>;
    case "code":
      return <code>{children}</code>;
    case "subscript":
      return <sub>{children}</sub>;
    case "superscript":
      return <sup>{children}</sup>;
    case "link": {
      const href = typeof mark.attrs?.href === "string" ? mark.attrs.href : "#";
      const target = typeof mark.attrs?.target === "string" ? mark.attrs.target : undefined;
      const rel = target === "_blank" ? "noopener noreferrer" : undefined;
      return (
        <a href={href} target={target} rel={rel}>
          {children}
        </a>
      );
    }
    default:
      return children;
  }
}
