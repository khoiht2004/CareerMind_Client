import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME_BANNER_SLIDES } from "@/config/constants/home.constant";
import { cn } from "@/lib/utils";
import { MOBILE_BREAKPOINT } from "@/config/constants/constants";

// Component hiển thị từng slide đơn lẻ với thiết kế gradient premium, hover effect mượt mà
function SlideBox({ slide }) {
  return (
    <div
      className={cn(
        "text-primary-foreground border-primary-foreground/10 group relative flex h-48 min-w-0 cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border bg-linear-to-br p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
        slide.className,
      )}
    >
      {/* Phông nền trang trí động nhẹ nhàng */}
      <div className="bg-foreground/10 absolute inset-0 transition-opacity duration-300 group-hover:bg-transparent" />

      <p className="text-primary-foreground/80 relative z-10 text-xs font-bold tracking-widest uppercase">
        {slide.title}
      </p>
      <h3 className="relative z-10 mt-2 text-lg leading-tight font-black tracking-tight drop-shadow-xs transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
        {slide.subtitle}
      </h3>
      <span className="bg-primary-foreground/20 group-hover:bg-primary-foreground group-hover:text-primary relative z-10 mt-4 w-fit rounded-full px-3.5 py-1 text-[10px] font-black tracking-wider uppercase backdrop-blur-md transition-colors duration-300">
        Khám phá ngay
      </span>
    </div>
  );
}

function SlideBannerSection() {
  // Khởi tạo state ngay từ đầu để tránh giật layout (flicker) trên mobile
  const [slidesPerPage, setSlidesPerPage] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT) return 1;
    return 3;
  });

  const TOTAL_SLIDES = HOME_BANNER_SLIDES.length;
  const totalPages = Math.ceil(TOTAL_SLIDES / slidesPerPage);

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerPage(window.innerWidth < MOBILE_BREAKPOINT ? 1 : 3);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Chia slides thành các trang
  const originalPages = [];
  for (let i = 0; i < totalPages; i++) {
    originalPages.push(
      HOME_BANNER_SLIDES.slice(i * slidesPerPage, (i + 1) * slidesPerPage),
    );
  }

  // Clone trang cuối đưa lên đầu, clone trang đầu đưa xuống cuối để tạo infinite loop seamless
  // Mảng pages sẽ có dạng: [Trang 2 (clone), Trang 0, Trang 1, Trang 2, Trang 0 (clone)]
  const pages = [
    originalPages[totalPages - 1],
    ...originalPages,
    originalPages[0],
  ];

  // Khởi tạo các state quản lý slideshow
  const [currentIndex, setCurrentIndex] = useState(1); // Mặc định hiển thị Trang 0 (index 1)
  const [isTransitionActive, setIsTransitionActive] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  // Tính chỉ số trang đang active thực tế (0, 1, hoặc 2) để làm pagination dots
  const activePageIndex = (currentIndex - 1 + totalPages) % totalPages;

  // Next Slide
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitionActive(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  // Previous Slide
  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitionActive(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Autoplay
  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      handleNext();
    }, 3000); // 3s
  }, [handleNext]);

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetAutoPlay = () => {
    stopAutoPlay();
    startAutoPlay();
  };

  // Khởi chạy autoplay khi mount và dọn dẹp khi unmount
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay]);

  // Tái kích hoạt transition sau khi jump biên không có transition
  useEffect(() => {
    if (!isTransitionActive) {
      const timer = setTimeout(() => {
        setIsTransitionActive(true);
      }, 50); // Khoảng chờ nhỏ đủ để trình duyệt nhận diện sự thay đổi transform mà không gây giật
      return () => clearTimeout(timer);
    }
  }, [isTransitionActive]);

  // Xử lý sự kiện transition kết thúc để jump biên vô hạn
  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (currentIndex === pages.length - 1) {
      // Đang ở clone của Trang 0 -> Nhảy tức thời về Trang 0 gốc (index 1)
      setIsTransitionActive(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      // Đang ở clone của Trang cuối -> Nhảy tức thời về Trang cuối gốc (index 3)
      setIsTransitionActive(false);
      setCurrentIndex(totalPages);
    }
  };

  // Xử lý khi click vào pagination dot
  const handleDotClick = (pageIndex) => {
    if (isTransitioning) return;
    setIsTransitionActive(true);
    setIsTransitioning(true);
    setCurrentIndex(pageIndex + 1);
    resetAutoPlay();
  };

  return (
    <section className="group/section bg-background relative py-8">
      <div className="relative mx-auto flex max-w-6xl items-center gap-4 px-4">
        {/* Nút điều khiển Prev */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            handlePrev();
            resetAutoPlay();
          }}
          className="border-border bg-card/90 hover:bg-card absolute -left-1 z-20 hidden size-10 shrink-0 rounded-full opacity-0 shadow-md backdrop-blur-xs transition-all duration-300 group-hover/section:opacity-100 hover:scale-110 active:scale-95 md:-left-2 md:inline-flex"
        >
          <ChevronLeft className="text-foreground size-5" />
        </Button>

        {/* Viewport chứa slider */}
        <div
          className="relative min-w-0 flex-1 overflow-hidden rounded-2xl"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          <div
            className="flex"
            style={{
              transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
              transition: isTransitionActive
                ? "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {pages.map((page, pageIdx) => (
              <div
                key={pageIdx}
                className="grid w-full shrink-0 grid-cols-1 gap-4 px-1 md:grid-cols-3"
              >
                {page.map((slide, slideIdx) => (
                  <SlideBox
                    key={`${pageIdx}-${slideIdx}-${slide.title}`}
                    slide={slide}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Nút điều khiển Next */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            handleNext();
            resetAutoPlay();
          }}
          className="border-border bg-card/90 hover:bg-card absolute -right-1 z-20 hidden size-10 shrink-0 rounded-full opacity-0 shadow-md backdrop-blur-xs transition-all duration-300 group-hover/section:opacity-100 hover:scale-110 active:scale-95 md:-right-2 md:inline-flex"
        >
          <ChevronRight className="text-foreground size-5" />
        </Button>
      </div>

      {/* Bộ chấm điều hướng (Pagination Dots) */}
      <div className="mt-5 flex justify-center gap-2">
        {originalPages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={cn(
              "h-2 cursor-pointer rounded-full transition-all duration-500",
              activePageIndex === idx
                ? "bg-primary shadow-primary/50 w-8 shadow-xs"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2",
            )}
            aria-label={`Đi tới trang ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default SlideBannerSection;
