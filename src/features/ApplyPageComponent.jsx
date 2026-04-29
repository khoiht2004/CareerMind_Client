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
