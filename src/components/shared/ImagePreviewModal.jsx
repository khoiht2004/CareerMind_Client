import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

function ImagePreviewModal({ src, alt = "", open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="p-0 [&>button]:text-primary-foreground"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Xem ảnh</DialogTitle>
        <DialogDescription className="sr-only">
          Xem trước ảnh phóng to.
        </DialogDescription>
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
