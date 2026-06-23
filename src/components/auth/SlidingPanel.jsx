const STATS = [
  { value: "12k+", label: "Công ty đối tác" },
  { value: "85%", label: "Tỷ lệ thành công" },
];

function SlidingPanel() {
  return (
    <div className="bg-background text-foreground relative flex h-full flex-col justify-between overflow-hidden border p-6 lg:p-10">
      {/* Apple-style Ambient Mesh Gradient Decor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80 transition-opacity duration-1000 dark:opacity-50">
        <div className="bg-mesh-cyan/40 absolute -top-[10%] -left-[10%] size-[400px] rounded-full mix-blend-multiply blur-[100px] dark:mix-blend-screen" />
        <div className="bg-mesh-blue/30 absolute top-[20%] -right-[10%] size-[500px] rounded-full mix-blend-multiply blur-[100px] dark:mix-blend-screen" />
        <div className="bg-mesh-purple/30 absolute -bottom-[10%] left-[20%] size-[600px] rounded-full mix-blend-multiply blur-[120px] dark:mix-blend-screen" />
      </div>

      {/* Branding */}
      <div className="relative space-y-6">
        <span className="border-border bg-card/50 text-foreground inline-flex items-center rounded-full border px-4 py-1 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
          CareerMind
        </span>
        <div className="space-y-4">
          <h1 className="text-foreground text-3xl leading-tight font-semibold tracking-tight lg:text-4xl">
            Kết nối tiềm năng với sự nghiệp xứng tầm.
          </h1>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Khám phá những cơ hội việc làm độc quyền và lộ trình thăng tiến được
            cá nhân hóa cho bạn.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="relative grid grid-cols-2 gap-3">
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="bg-card/40 border-border/50 rounded-[18px] border p-4 backdrop-blur-md lg:p-5"
          >
            <p className="text-foreground text-2xl font-semibold">{value}</p>
            <p className="text-muted-foreground mt-1 text-[11px] font-semibold tracking-wider uppercase">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlidingPanel;
