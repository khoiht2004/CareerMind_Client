import { CheckCircle2, FileText } from "lucide-react";
import { formatFileSize } from "@/utils/helper";
import { StepHeader } from "@/features/ApplyPageComponent";

export default function ApplyReviewSummaryStep({ formData, selectedCv, manualCvUrl }) {
  return (
    <article className="bg-primary/10 rounded-2xl p-6 space-y-6 animate-fade-in">
      <StepHeader icon={CheckCircle2} title="Xác nhận thông tin ứng tuyển" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card rounded-xl border p-5">
        {/* Personal Info Summary */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-primary uppercase tracking-wider">Thông tin cá nhân</h4>
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground font-medium">Họ và tên:</span> {formData.name}</p>
            <p><span className="text-muted-foreground font-medium">Email:</span> {formData.email}</p>
            <p><span className="text-muted-foreground font-medium">Số điện thoại:</span> {formData.phone}</p>
            <p><span className="text-muted-foreground font-medium">LinkedIn:</span> {formData.linkedin || <span className="text-muted-foreground italic">Chưa cung cấp</span>}</p>
          </div>
        </div>

        {/* CV Summary */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-primary uppercase tracking-wider">Hồ sơ đính kèm</h4>
          <div className="flex items-start gap-3 rounded-lg border bg-muted/40 p-3">
            <FileText className="text-primary size-8 shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              {selectedCv ? (
                <>
                  <p className="truncate text-sm font-semibold">{selectedCv.name}</p>
                  <div className="text-muted-foreground text-xs flex items-center gap-1.5 mt-0.5">
                    <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                      {selectedCv.fileType || "pdf"}
                    </span>
                    <span>{formatFileSize(selectedCv.fileSize)}</span>
                  </div>
                </>
              ) : manualCvUrl.trim() ? (
                <>
                  <p className="truncate text-sm font-semibold">Tài liệu liên kết ngoài</p>
                  <p className="text-muted-foreground text-xs truncate">{manualCvUrl}</p>
                </>
              ) : (
                <p className="text-muted-foreground text-sm italic">Chưa chọn CV</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Letter Summary */}
      <div className="bg-card rounded-xl border p-5 space-y-3">
        <h4 className="font-bold text-sm text-primary uppercase tracking-wider">Thư giới thiệu (Cover Letter)</h4>
        {formData.coverLetter?.trim() ? (
          <div className="bg-muted/30 border text-muted-foreground rounded-lg p-4 text-sm whitespace-pre-wrap max-h-60 overflow-y-auto scrollbar-thin">
            {formData.coverLetter}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm italic">Không có thư giới thiệu đính kèm</p>
        )}
      </div>
    </article>
  );
}
