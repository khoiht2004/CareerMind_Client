import { User, FileText, MessageSquare, CheckCircle2 } from "lucide-react";

export function FieldLabel({ children }) {
  return (
    <p className="text-muted-foreground mb-1.5 text-xs font-bold tracking-wider uppercase">
      {children}
    </p>
  );
}

export function StepHeader({ icon, title }) {
  const Icon = icon;
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="bg-foreground text-background flex size-9 shrink-0 items-center justify-center rounded-xl">
        <Icon className="size-5" />
      </div>
      <h3 className="text-base font-bold">{title}</h3>
    </div>
  );
}

const STEPS = [
  { step: 1, label: "Thông tin cá nhân", icon: User },
  { step: 2, label: "Hồ sơ & Tài liệu", icon: FileText },
  { step: 3, label: "Thư giới thiệu", icon: MessageSquare },
  { step: 4, label: "Xác nhận & Gửi", icon: CheckCircle2 },
];

// 1. Stepper Indicator
export function ApplyStepperIndicator({ currentStep, handleBackToStep }) {
  return (
    <div className="relative my-8 px-4">
      {/* Progress Line */}
      <div className="bg-muted/60 absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 sm:top-1/3" />
      <div
        className="bg-primary absolute top-1/2 left-0 h-0.5 -translate-y-1/2 transition-all duration-300 sm:top-1/3"
        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
      />

      {/* Step circles */}
      <div className="relative flex justify-between">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isCompleted = currentStep > s.step;
          const isActive = currentStep === s.step;
          return (
            <div key={s.step} className="flex flex-col items-center">
              <button
                type="button"
                disabled={currentStep < s.step}
                onClick={() => handleBackToStep(s.step)}
                className={`flex size-10 items-center justify-center rounded-full border-2 transition-all ${
                  isCompleted
                    ? "bg-primary border-primary text-background cursor-pointer"
                    : isActive
                      ? "bg-background border-primary text-primary scale-110 font-bold shadow-[0_0_0_4px_rgba(var(--primary-rgb),0.1)]"
                      : "bg-muted border-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <Icon className="size-5" />
                )}
              </button>
              <span
                className={`mt-2 hidden text-xs font-semibold sm:block ${
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
