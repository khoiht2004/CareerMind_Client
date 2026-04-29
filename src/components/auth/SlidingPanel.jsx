const STATS = [
  { value: "12k+", label: "Công ty đối tác" },
  { value: "85%", label: "Tỷ lệ thành công" },
];

function SlidingPanel() {
  return (
    <div className="bg-foreground text-background relative flex h-full flex-col justify-between overflow-hidden p-10">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-background/5 absolute -top-16 -right-16 h-72 w-72 rotate-12 rounded-3xl" />
        <div className="bg-background/5 absolute -bottom-10 -left-10 h-48 w-48 -rotate-12 rounded-3xl" />
        <div className="bg-background/3 absolute top-1/2 left-1/3 h-32 w-32 rotate-45 rounded-2xl" />
      </div>

      {/* Branding */}
      <div className="relative space-y-6">
        <span className="border-background/20 bg-background/10 inline-flex items-center rounded-full border px-4 py-1 text-xs font-bold tracking-widest uppercase">
          Smart Recruit Assistants
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl leading-tight font-black">
            Kết nối tiềm năng với sự nghiệp xứng tầm.
          </h1>
          <p className="text-background/60 text-sm leading-relaxed">
            Khám phá những cơ hội việc làm độc quyền và lộ trình thăng tiến được
            cá nhân hóa cho bạn.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="relative grid grid-cols-2 gap-3">
        {STATS.map(({ value, label }) => (
          <div key={label} className="bg-background/10 rounded-2xl p-5">
            <p className="text-2xl font-black">{value}</p>
            <p className="text-background/60 mt-1 text-xs font-semibold tracking-wider uppercase">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlidingPanel;
