import { Label } from "@/components/ui/label";

function JobFormField({ label, required, hint, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-foreground text-xs font-semibold uppercase tracking-wider">
        {label}
        {required && (
          <span className="text-destructive ml-0.5">*</span>
        )}
      </Label>
      {children}
      {hint && (
        <p className="text-muted-foreground text-xs">{hint}</p>
      )}
    </div>
  );
}

export default JobFormField;
