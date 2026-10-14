/**
 * TipTap JSON → React renderer.
 *
 * Pure recursive renderer (no hooks) — works in both server and client
 * components. Covers the subset of TipTap extensions used by the blog
 * editor: paragraphs, headings (H1-H3), text + bold/italic/link marks,
 * bullet/ordered lists, blockquote, horizontal rule, inline image,
 * hard break.
 *
 * Anything not in this list silently renders nothing. If the blog editor
 * ever adds a new extension (e.g. code blocks), mirror it here.
 *
 * Security: we only read known node/mark types. Text content is inserted
 * via React's text interpolation, so no XSS risk — unlike dangerouslySet-
 * InnerHTML-based approaches. Links with unsafe schemes are filtered.
 */

import Link from "next/link";
import styles from "@/app/site.module.css";

// ── TipTap node type definitions (minimal, just what we render) ───────

type TipTapMark =
  | { type: "bold" }
  | { type: "italic" }
  | { type: "link"; attrs: { href: string } };

type TipTapTextNode = {
  type: "text";
  text: string;
  marks?: TipTapMark[];
};

type TipTapBlockNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: Array<TipTapTextNode | TipTapBlockNode>;
};

type TipTapDoc = {
  type: "doc";
  content?: Array<TipTapBlockNode>;
};

// ── Public API ────────────────────────────────────────────────────────

export default function TipTapRenderer({ json }: { json: string | undefined }) {
  const doc = parseDoc(json);
  if (!doc) return null;
  return <>{(doc.content ?? []).map((node, i) => renderBlock(node, i))}</>;
}

function parseDoc(json: string | undefined): TipTapDoc | null {
  if (!json) return null;
  try {
    const parsed = JSON.parse(json);
    if (parsed && parsed.type === "doc") return parsed as TipTapDoc;
    return null;
  } catch {
    return null;
  }
}

// ── Block-level nodes ────────────────────────────────────────────────

function renderBlock(node: TipTapBlockNode, key: number): React.ReactNode {
  const children = (node.content ?? []).map((child, i) => {
    if (child.type === "text") return renderTextNode(child as TipTapTextNode, i);
    return renderBlock(child as TipTapBlockNode, i);
  });

  switch (node.type) {
    case "paragraph":
      // Empty paragraphs (no content) still render to create spacing.
      return (
        <p key={key} className={styles.postPara}>
          {children.length > 0 ? children : <>&nbsp;</>}
        </p>
      );

    case "heading": {
      const level = Math.min(Math.max((node.attrs?.level as number) ?? 2, 1), 3);
      // Explicit mapping — CSS Modules can't tree-shake dynamic template keys
      const headingClass =
        level === 1 ? styles.postHeading1
        : level === 2 ? styles.postHeading2
        : styles.postHeading3;
      if (level === 1) return <h1 key={key} className={headingClass}>{children}</h1>;
      if (level === 2) return <h2 key={key} className={headingClass}>{children}</h2>;
      return <h3 key={key} className={headingClass}>{children}</h3>;
    }

    case "bulletList":
      return <ul key={key} className={styles.postList}>{children}</ul>;

    case "orderedList":
      return <ol key={key} className={styles.postListOrdered}>{children}</ol>;

    case "listItem":
      return <li key={key}>{children}</li>;

    case "blockquote":
      return (
        <blockquote key={key} className={styles.postQuote}>
          {children}
        </blockquote>
      );

    case "horizontalRule":
      return <hr key={key} className={styles.postHr} />;

    case "hardBreak":
      return <br key={key} />;

    case "image": {
      const src = node.attrs?.src as string | undefined;
      const alt = (node.attrs?.alt as string | undefined) ?? "";
      if (!src) return null;
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img
          key={key}
          src={src}
          alt={alt}
          className={styles.postImage}
          loading="lazy"
        />
      );
    }

    default:
      // Unknown block — silently skip rather than crashing the post.
      return null;
  }
}

// ── Inline text + marks ──────────────────────────────────────────────

function renderTextNode(node: TipTapTextNode, key: number): React.ReactNode {
  let el: React.ReactNode = node.text;
  const marks = node.marks ?? [];

  for (const mark of marks) {
    if (mark.type === "bold") el = <strong>{el}</strong>;
    else if (mark.type === "italic") el = <em>{el}</em>;
    else if (mark.type === "link") {
      const href = (mark as { attrs: { href: string } }).attrs?.href ?? "";
      if (!isSafeHref(href)) continue;
      // Next.js <Link> for internal links, <a> with target=_blank for external
      if (href.startsWith("/")) {
        el = <Link href={href}>{el}</Link>;
      } else {
        el = (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {el}
          </a>
        );
      }
    }
  }

  return <span key={key}>{el}</span>;
}

function isSafeHref(href: string): boolean {
  if (!href) return false;
  // Allow relative, http, https, mailto, tel. Block javascript: / data:
  return (
    href.startsWith("/") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}
