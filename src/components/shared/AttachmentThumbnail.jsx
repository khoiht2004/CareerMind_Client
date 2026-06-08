import { X } from "lucide-react";
import ImagePreviewModal from "./ImagePreviewModal";
import CvPreviewDialog from "./CvPreviewDialog";
import { useAttachmentThumbnail } from "@/hooks/useAttachmentThumbnail";

// attachment: { id, category, previewUrl, data, mediaType, name, size }
// onRemove: (id) => void — omit to hide remove button
function AttachmentThumbnail({ attachment, onRemove }) {
  const {
    previewOpen,
    handleOpen,
    handleClose,
    isImage,
    fileConfig,
    imageSrc,
    fileSizeLabel,
    cvProp,
  } = useAttachmentThumbnail(attachment);

  const removeBtn = onRemove && (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onRemove(attachment.id);
      }}
      className="bg-foreground text-background absolute -top-1.5 -right-1.5 flex size-4 cursor-pointer items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100 hover:scale-105"
    >
      <X className="size-2.5" />
    </button>
  );

  if (isImage) {
    return (
      <>
        <div className="group relative shrink-0">
          <img
            src={imageSrc}
            alt={attachment.name ?? ""}
            onClick={handleOpen}
            className="size-12 cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-80"
          />
          {removeBtn}
        </div>

        <ImagePreviewModal
          src={imageSrc}
          alt={attachment.name ?? ""}
          open={previewOpen}
          onClose={handleClose}
        />
      </>
    );
  }

  const { icon: Icon, bg, text, label } = fileConfig;

  return (
    <>
      <div className="group relative shrink-0">
        <button
          type="button"
          onClick={handleOpen}
          className="flex h-12 max-w-[180px] cursor-pointer items-center gap-2 rounded-lg transition-opacity hover:opacity-80"
        >
          {/* Icon */}
          <div
            className={`flex size-8 shrink-0 items-center justify-center rounded-md ${bg}`}
          >
            <Icon className={`size-4 ${text}`} />
          </div>

          {/* Name + size */}
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-xs leading-tight font-medium">
              {attachment.name}
            </p>
            {fileSizeLabel && (
              <p className="text-muted-foreground text-[10px] leading-tight">
                {fileSizeLabel} · {label}
              </p>
            )}
          </div>
        </button>
        {removeBtn}
      </div>

      <CvPreviewDialog open={previewOpen} onClose={handleClose} cv={cvProp} />
    </>
  );
}

export default AttachmentThumbnail;
