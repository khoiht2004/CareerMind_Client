import { ChevronLeft, ChevronRight, Loader2, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplyFooterActions({
  currentStep,
  agreedToTerms,
  setAgreedToTerms,
  isLoading,
  handleBack,
  handleNext,
  handleSaveDraft,
  companyName,
}) {
  return (
    <div className="mt-6 flex flex-col gap-4 border-t pt-5">
      {currentStep === 4 && (
        <label className="flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 cursor-pointer"
          />
          <span className="text-muted-foreground text-xs leading-relaxed">
            Tôi đồng ý với các điều khoản và bảo mật thông tin của CareerPartner
            & {companyName}.
          </span>
        </label>
      )}

      <div className="flex items-center justify-between gap-4">
        {/* Back button */}
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isLoading}
            className="cursor-pointer"
          >
            <ChevronLeft />
            Quay lại
          </Button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* Next / Submit buttons */}
        <div className="ml-auto flex flex-col gap-3 sm:flex-row sm:items-center">
          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="cursor-pointer"
            >
              Tiếp tục
              <ChevronRight />
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isLoading}
                className="w-full cursor-pointer sm:w-auto"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                Lưu nháp
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !agreedToTerms}
                className="w-full cursor-pointer sm:w-auto"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                Nộp hồ sơ ngay
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
