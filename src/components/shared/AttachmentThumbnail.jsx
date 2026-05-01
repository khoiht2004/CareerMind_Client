import { useState } from "react";
import { X } from "lucide-react";
import ImagePreviewModal from "./ImagePreviewModal";

// attachment: { id, previewUrl, name, data?, mediaType? }
// onRemove: (id) => void — if undefined, no remove button shown
function AttachmentThumbnail({ attachment, onRemove }) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const src =
    attachment.previewUrl ??
    `data:${attachment.mediaType};base64,${attachment.data}`;

  return (
    <>
      <div className="group relative shrink-0">
        <img
          src={src}
          alt={attachment.name ?? ""}
          onClick={() => setPreviewOpen(true)}
          className="border-border size-12 cursor-pointer rounded-lg border object-cover transition-opacity hover:opacity-80"
        />
        {onRemove && (
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
        )}
      </div>

      <ImagePreviewModal
        src={src}
        alt={attachment.name ?? ""}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
}

export default AttachmentThumbnail;
