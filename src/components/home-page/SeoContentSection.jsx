import {
  HOME_TAG_CLOUD,
  POPULAR_KEYWORD_COLUMNS,
  SEO_PARAGRAPHS,
} from "@/config/constants/home.constant";

function SeoContentSection() {
  return (
    <section className="bg-white pt-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="space-y-5 text-sm leading-6 text-slate-800">
          {SEO_PARAGRAPHS.map((item) => (
            <div key={item.title}>
              <h3 className="font-bold">{item.title}</h3>
              <p className="mt-1">{item.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-8 mb-5 text-xl font-bold text-slate-900">
          Từ khoá tìm việc làm phổ biến tại TopCV
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {POPULAR_KEYWORD_COLUMNS.map((column) => (
            <div key={column.title} className="rounded-lg bg-slate-100 p-5">
              <h3 className="mb-3 font-bold text-slate-900">{column.title}</h3>
              <div className="max-h-72 overflow-y-auto pr-2 [scrollbar-width:none] hover:[scrollbar-width:thin]">
                {column.items.map((item) => (
                  <div
                    key={item}
                    className="border-b border-slate-200 py-3 text-sm text-slate-800"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SeoContentSection;
