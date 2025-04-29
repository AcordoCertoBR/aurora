import { useEffect, useRef } from 'react';

type ScrollbarProps = {
  pages: number[][];
  pageToEnterIndex: number;
};

export const Scrollbar = ({ pageToEnterIndex, pages }: ScrollbarProps) => {
  const scrollTrail = useRef<HTMLDivElement>(null);
  const scrollbar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollTrail.current || !scrollbar.current) return;
    const trailSize = scrollTrail.current.offsetWidth;
    const barSize = scrollbar.current.offsetWidth;
    const availableScrollSpace = trailSize - barSize;

    const currentPercentage = (pageToEnterIndex + 1) / pages.length;
    const scrollDistance = currentPercentage * availableScrollSpace;

    const barTranslate = pageToEnterIndex === 0 ? 0 : scrollDistance;
    scrollbar.current.style.transform = `translateX(${barTranslate}px)`;
  }, [pages, pageToEnterIndex]);

  return (
    <div className="au-carousel__scrollbar" ref={scrollTrail}>
      <div className="au-carousel__scrollbar-scroll" ref={scrollbar}></div>
    </div>
  );
};
