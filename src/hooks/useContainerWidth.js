import { useEffect, useState } from "react";

function useContainerWidth(ref) {
      const [width, setWidth] = useState(0);
      useEffect(() => {
            if (!ref.current) return;
            const observer = new ResizeObserver(([entry]) => {
                  setWidth(Math.floor(entry.contentRect.width));
            });
            observer.observe(ref.current);
            setWidth(Math.floor(ref.current.getBoundingClientRect().width));
            return () => observer.disconnect();
      }, [ref]);
      return width;
}

export default useContainerWidth;