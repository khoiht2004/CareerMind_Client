import { useState, useCallback, useMemo } from "react";
import { FILE_ICONS } from "@/config/constants/attachment.constants";
import { formatFileSize } from "@/utils/helper";

export function useAttachmentThumbnail(attachment) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleOpen = useCallback(() => setPreviewOpen(true), []);
  const handleClose = useCallback(() => setPreviewOpen(false), []);

  const isImage =
    attachment.category === "image" ||
    attachment.type?.startsWith("image/") ||
    attachment.mediaType?.startsWith("image/");

  const fileConfig = useMemo(
    () => (isImage ? null : (FILE_ICONS[attachment.category] ?? FILE_ICONS.default)),
    [isImage, attachment.category],
  );

  const imageSrc = useMemo(
    () =>
      attachment.previewUrl ??
      `data:${attachment.mediaType};base64,${attachment.data}`,
    [attachment.previewUrl, attachment.mediaType, attachment.data],
  );

  const fileSizeLabel = useMemo(
    () => (!isImage && attachment.size ? formatFileSize(attachment.size) : null),
    [isImage, attachment.size],
  );

  const cvProp = useMemo(() => {
    if (isImage) return null;
    return {
      name: attachment.name,
      fileUrl: `data:${attachment.mediaType};base64,${attachment.data}`,
      fileType: attachment.category === "excel" ? "xlsx" : attachment.category,
      fileSize: attachment.size,
      createdAt: null,
      isLocalBlob: true,
    };
  }, [isImage, attachment]);

  return {
    previewOpen,
    handleOpen,
    handleClose,
    isImage,
    fileConfig,
    imageSrc,
    fileSizeLabel,
    cvProp,
  };
}
