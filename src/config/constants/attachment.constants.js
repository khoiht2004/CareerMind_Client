import { FileText, Sheet, FileType } from "lucide-react";

export const IMAGE_MAX_SIZE = 4 * 1024 * 1024; // 4MB

export const ACCEPTED_ATTACHMENT_TYPES = {
  "image/jpeg": { category: "image", maxSize: IMAGE_MAX_SIZE },
  "image/png": { category: "image", maxSize: IMAGE_MAX_SIZE },
  "image/gif": { category: "image", maxSize: IMAGE_MAX_SIZE },
  "image/webp": { category: "image", maxSize: IMAGE_MAX_SIZE },
  "application/pdf": { category: "pdf", maxSize: 10 * 1024 * 1024 },
  "application/msword": { category: "doc", maxSize: 5 * 1024 * 1024 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    category: "doc",
    maxSize: 5 * 1024 * 1024,
  },
  "application/vnd.ms-excel": { category: "excel", maxSize: 5 * 1024 * 1024 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    category: "excel",
    maxSize: 5 * 1024 * 1024,
  },
};

export const ATTACHMENT_SIZE_LABELS = {
  image: "4MB",
  pdf: "10MB",
  doc: "5MB",
  excel: "5MB",
};

export const FILE_INPUT_ACCEPT =
  "image/jpeg,image/png,image/gif,image/webp,application/pdf,.doc,.docx,.xls,.xlsx";

export const FILE_ICONS = {
  pdf: { icon: FileType, bg: "bg-destructive/10", text: "text-destructive", label: "PDF" },
  doc: { icon: FileText, bg: "bg-[var(--status-reviewing-bg)]", text: "text-[var(--status-reviewing-text)]", label: "DOC" },
  excel: { icon: Sheet, bg: "bg-[var(--status-accepted-bg)]", text: "text-[var(--status-accepted-text)]", label: "XLS" },
  default: { icon: FileText, bg: "bg-muted", text: "text-muted-foreground", label: "FILE" },
};

export const FILE_TYPE_CONFIG = {
  pdf: {
    label: "PDF",
    iconClass: "text-destructive",
    bgClass: "bg-destructive/10",
    badgeClass: "bg-destructive/10 text-destructive",
  },
  docx: {
    label: "DOCX",
    iconClass: "text-[var(--status-reviewing-text)]",
    bgClass: "bg-[var(--status-reviewing-bg)]",
    badgeClass: "bg-[var(--status-reviewing-bg)] text-[var(--status-reviewing-text)]",
  },
  doc: {
    label: "DOC",
    iconClass: "text-[var(--status-reviewing-text)]",
    bgClass: "bg-[var(--status-reviewing-bg)]",
    badgeClass: "bg-[var(--status-reviewing-bg)] text-[var(--status-reviewing-text)]",
  },
};

export const DEFAULT_TYPE_CONFIG = {
  label: "FILE",
  iconClass: "text-primary",
  bgClass: "bg-primary/10",
  badgeClass: "bg-muted text-muted-foreground",
};
