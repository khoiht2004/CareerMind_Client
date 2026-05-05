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
  pdf: { icon: FileType, bg: "bg-red-100", text: "text-red-600", label: "PDF" },
  doc: { icon: FileText, bg: "bg-blue-100", text: "text-blue-600", label: "DOC" },
  excel: { icon: Sheet, bg: "bg-green-100", text: "text-green-600", label: "XLS" },
  default: { icon: FileText, bg: "bg-muted", text: "text-muted-foreground", label: "FILE" },
};

export const FILE_TYPE_CONFIG = {
  pdf: {
    label: "PDF",
    iconClass: "text-rose-600 dark:text-rose-400",
    bgClass: "bg-rose-100 dark:bg-rose-900/30",
    badgeClass: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  },
  docx: {
    label: "DOCX",
    iconClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-900/30",
    badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  doc: {
    label: "DOC",
    iconClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-900/30",
    badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
};

export const DEFAULT_TYPE_CONFIG = {
  label: "FILE",
  iconClass: "text-primary",
  bgClass: "bg-primary/10",
  badgeClass: "bg-muted text-muted-foreground",
};
