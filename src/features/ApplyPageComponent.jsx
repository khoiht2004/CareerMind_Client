import { Check } from "lucide-react";

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

export function ApplyStepper({ currentStep }) {
  const steps = [
    { id: 1, label: "Thông tin cá nhân" },
    { id: 2, label: "Hồ sơ ứng tuyển" },
    { id: 3, label: "Thư giới thiệu" },
  ];

  return (
    <div className="mx-auto mb-8 w-full max-w-2xl px-4">
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="bg-muted-foreground/20 dark:bg-muted/30 absolute top-4 left-0 h-0.5 w-full -translate-y-1/2" />
        {/* Active line */}
        <div
          className="bg-primary absolute top-4 left-0 h-0.5 -translate-y-1/2 transition-all duration-500 ease-in-out"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-500 ${
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                    : isActive
                      ? "border-primary bg-background text-primary ring-primary/10 scale-110 shadow-sm ring-4"
                      : "border-muted-foreground/30 bg-muted text-muted-foreground/50"
                }`}
              >
                {isCompleted ? (
                  <Check className="animate-in zoom-in size-4 stroke-3 duration-300" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`mt-2 text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${
                  isActive
                    ? "text-primary"
                    : isCompleted
                      ? "text-muted-foreground"
                      : "text-muted-foreground/40"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
