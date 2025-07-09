import { useEffect, useRef, useState } from "react";
import RussiaMapSVG from "@/assets/geo/russianMap.svg?react";
import { deliveryZones } from "@/data/delivery";
import type { DeliveryZoneId } from "@/data/delivery";

export default function RussiaMap() {
  const [hoveredZone, setHoveredZone] = useState<DeliveryZoneId | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const cleanups: (() => void)[] = [];

    Object.keys(deliveryZones).forEach((zoneId) => {
      const regionEl = svgEl.querySelector<SVGElement>(`#${zoneId}`);
      if (!regionEl) return;

      regionEl.style.pointerEvents = "all";
      regionEl.style.transition = "fill 0.3s ease";

      const handleMouseEnter = (e: MouseEvent) => {
        setHoveredZone(zoneId as DeliveryZoneId);
        regionEl.style.fill = "#EFE393";

        // вычисляем позицию подсказки относительно контейнера
        const rect = containerRef.current!.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        // ограничиваем по правой и нижней границам
        const maxX = rect.width - 300; // допустим ширина тултипа ~300px
        const maxY = rect.height - 120; // высота ~120px

        setTooltipPos({
          x: Math.min(offsetX, maxX),
          y: Math.min(offsetY, maxY),
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        // динамически обновляем позицию при движении мыши внутри региона
        const rect = containerRef.current!.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const maxX = rect.width - 300;
        const maxY = rect.height - 120;
        setTooltipPos({
          x: Math.min(offsetX, maxX),
          y: Math.min(offsetY, maxY),
        });
      };

      const handleMouseLeave = () => {
        setHoveredZone(null);
        regionEl.style.fill = "transparent";
      };

      regionEl.addEventListener("mouseenter", handleMouseEnter);
      regionEl.addEventListener("mousemove", handleMouseMove);
      regionEl.addEventListener("mouseleave", handleMouseLeave);

      cleanups.push(() => {
        regionEl.removeEventListener("mouseenter", handleMouseEnter);
        regionEl.removeEventListener("mousemove", handleMouseMove);
        regionEl.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      id="deliveryMap"
      className="w-full md:max-w-[1245px] mx-auto relative mb-12 pt-10 md:pt-4 pb-20 md:pb-4"
      style={{
        height: isMobile ? "calc(100vh - 20px)" : "700px",
        overflow: isMobile ? "auto" : "visible",
      }}>
      <div className="w-full relative touch-pan-x touch-pan-y touch-pinch-zoom md:touch-none">
        <svg
          ref={svgRef}
          viewBox="0 100 1200 650"
          width="100%"
          height={isMobile ? undefined : "100%"}
          preserveAspectRatio="xMidYMid meet"
          className="max-w-full h-auto block">
          <style>
            {`
              .custom-map path,
              .custom-map polygon,
              .custom-map rect {
                fill: transparent;
                stroke: #EFE393;
                stroke-width: 1;
                transition: fill 0.3s ease;
              }
            `}
          </style>
          <g className="custom-map">
            <RussiaMapSVG />
          </g>
        </svg>

        {!isMobile && hoveredZone && (
          <div
            className="absolute z-10 pointer-events-none opacity-90 max-w-[300px] bg-[#1e1e1e] text-white border-2 border-[#EFE393] px-4 py-3 rounded"
            style={{
              top: tooltipPos.y,
              left: tooltipPos.x,
            }}>
            <h4 className="text-lg font-semibold">{hoveredZone}</h4>
            <p className="text-sm">{deliveryZones[hoveredZone]}</p>
          </div>
        )}
      </div>
    </div>
  );
}
