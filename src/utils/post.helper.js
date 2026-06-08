import DOMPurify from "dompurify";
import { POST_BANNER_PLACEHOLDER } from "@/config/constants/post.constant";

export const getPostImage = (coverUrl) => coverUrl || POST_BANNER_PLACEHOLDER;

export const stripHtml = (html = "") => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

export const createHeadingId = (text, index) => {
  const slug = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug ? `${slug}-${index}` : `section-${index}`;
};

export const buildPostContent = (html = "") => {
  const cleanHtml = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });
  const doc = new DOMParser().parseFromString(cleanHtml, "text/html");
  const headings = Array.from(doc.body.querySelectorAll("h1, h2, h3"));
  const usedIds = new Set();
  const toc = headings.map((heading, index) => {
    const text = heading.textContent?.trim() || `Phần ${index + 1}`;
    let id = heading.id || createHeadingId(text, index + 1);
    while (usedIds.has(id)) id = `${id}-${index + 1}`;
    usedIds.add(id);
    heading.id = id;
    return {
      id,
      text,
      level: Number(heading.tagName.replace("H", "")),
    };
  });

  return { html: doc.body.innerHTML, toc };
};
