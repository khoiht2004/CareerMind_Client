import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";

const MAX_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

function fileToAttachment(file) {
  return new Promise((resolve, reject) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      reject(new Error(`Định dạng "${file.type}" không được hỗ trợ`));
      return;
    }
    if (file.size > MAX_SIZE) {
      reject(new Error(`Ảnh "${file.name}" vượt quá 4MB`));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const fullDataUrl = e.target.result;
      const base64 = fullDataUrl.split(",")[1];
      resolve({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        previewUrl: fullDataUrl,
        data: base64,
        mediaType: file.type,
        name: file.name,
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
  return results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);
}

export function useAttachments() {
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const addFiles = useCallback(async (files) => {
    const valid = await processFiles(files);
    if (valid.length) setAttachments((prev) => [...prev, ...valid]);
  }, []);

  const removeAttachment = useCallback((id) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }, []);

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
