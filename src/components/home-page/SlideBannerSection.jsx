import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME_BANNER_SLIDES } from "@/config/constants/home.constant";
import { cn } from "@/lib/utils";

function SlideBox({ slide }) {
  return (
    <div
      className={cn(
        "flex h-44 min-w-0 flex-1 flex-col justify-end rounded-xl bg-linear-to-br p-6 text-white shadow-sm",
        slide.className,
      )}
    >
      <p className="text-sm font-semibold uppercase tracking-wide">{slide.title}</p>
      <h3 className="mt-2 text-xl font-black">{slide.subtitle}</h3>
      <span className="mt-3 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
        Thay ảnh tại đây
      </span>
    </div>
  );
}

function SlideBannerSection() {
  return (
    <section className="bg-white py-7">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4">
        <Button variant="outline" size="icon" className="hidden size-9 shrink-0 rounded-full md:inline-flex">
          <ChevronLeft className="size-4" />
        </Button>
        <div className="grid min-w-0 flex-1 gap-4 md:grid-cols-3">
          {HOME_BANNER_SLIDES.map((slide) => (
            <SlideBox key={slide.title} slide={slide} />
          ))}
        </div>
        <Button variant="outline" size="icon" className="hidden size-9 shrink-0 rounded-full md:inline-flex">
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}

export default SlideBannerSection;
