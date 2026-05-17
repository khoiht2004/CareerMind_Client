import { FEATURED_EMPLOYERS, FEATURED_INDUSTRIES } from "@/config/constants/home.constant";
import HomeSectionHeader from "./HomeSectionHeader";

function FeaturedIndustrySection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-4">
        <HomeSectionHeader title="Top ngành nghề nổi bật" showAll={false} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_INDUSTRIES.map(({ label, count, icon: Icon }) => (
            <div key={label} className="rounded-lg bg-slate-100 px-5 py-8 text-center">
              <Icon className="mx-auto size-12 text-primary" />
              <h3 className="mt-5 line-clamp-1 font-bold text-slate-800">{label}</h3>
              <p className="mt-2 text-sm font-semibold text-primary">{count}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-9 mb-5 text-2xl font-bold text-primary">
          Nhà tuyển dụng nổi bật
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {FEATURED_EMPLOYERS.map((name) => (
            <div key={name} className="relative grid h-44 place-items-center rounded-lg border bg-white">
              <span className="absolute top-3 left-3 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                TOP
              </span>
              <span className="text-2xl font-black text-slate-700">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedIndustrySection;
