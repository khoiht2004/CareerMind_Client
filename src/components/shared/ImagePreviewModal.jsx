import { Dialog, DialogContent } from "@/components/ui/dialog";

function ImagePreviewModal({ src, alt = "", open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="p-0 [&>button]:text-white"
        showCloseButton={false}
      >
        <div className="flex items-center justify-center">
          <img
            src={src}
            alt={alt}
            className="size-full rounded-lg object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImagePreviewModal;
