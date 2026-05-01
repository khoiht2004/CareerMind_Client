import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import {
  ACCEPTED_ATTACHMENT_TYPES,
  ATTACHMENT_SIZE_LABELS,
} from "@/config/constants/attachment.constants";

function fileToAttachment(file) {
  return new Promise((resolve, reject) => {
    const typeConfig = ACCEPTED_ATTACHMENT_TYPES[file.type];
    if (!typeConfig) {
      reject(new Error(`Định dạng không được hỗ trợ: "${file.name}"`));
      return;
    }
    if (file.size > typeConfig.maxSize) {
      reject(
        new Error(`"${file.name}" vượt quá ${ATTACHMENT_SIZE_LABELS[typeConfig.category]}`),
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const fullDataUrl = e.target.result;
      resolve({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        previewUrl: typeConfig.category === "image" ? fullDataUrl : null,
        data: fullDataUrl.split(",")[1],
        mediaType: file.type,
        name: file.name,
        size: file.size,
        category: typeConfig.category,
      });
    };
    reader.onerror = () => reject(new Error(`Không thể đọc file "${file.name}"`));
    reader.readAsDataURL(file);
  });
}

async function processFiles(files) {
  const results = await Promise.allSettled([...files].map(fileToAttachment));
  results
    .filter((r) => r.status === "rejected")
    .forEach((r) => toast.error(r.reason.message));
  return results.filter((r) => r.status === "fulfilled").map((r) => r.value);
}

export function useAttachments() {
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const addFiles = useCallback(async (files) => {
    const valid = await processFiles(files);
    if (valid.length) setAttachments((prev) => [...prev, ...valid]);
  }, []);

  const removeAttachment = useCallback(
    (id) => setAttachments((prev) => prev.filter((a) => a.id !== id)),
    [],
  );

  const clearAttachments = useCallback(() => setAttachments([]), []);

  const triggerFileInput = useCallback(() => fileInputRef.current?.click(), []);

  const handleFileInputChange = useCallback(
    (e) => {
      if (e.target.files?.length) {
        addFiles(e.target.files);
        e.target.value = "";
      }
    },
    [addFiles],
  );

  const handlePaste = useCallback(
    (e) => {
      const imageFiles = [...(e.clipboardData?.items ?? [])]
        .filter((item) => item.kind === "file" && item.type.startsWith("image/"))
        .map((item) => item.getAsFile())
        .filter(Boolean);
      if (imageFiles.length) {
        e.preventDefault();
        addFiles(imageFiles);
      }
    },
    [addFiles],
  );

  return {
    attachments,
    fileInputRef,
    triggerFileInput,
    handleFileInputChange,
    handlePaste,
    removeAttachment,
    clearAttachments,
  };
}
