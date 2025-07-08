import { useEffect, useRef, useState } from "react";
import RussiaMapSVG from "@/assets/geo/russiaMap.svg?react";
import { deliveryZones } from "@/data/delivery";
import type { DeliveryZoneId } from "@/data/delivery";

export default function RussiaMap() {
  const [hoveredZone, setHoveredZone] = useState<DeliveryZoneId | null>(null);
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

      const handleMouseEnter = () => {
        setHoveredZone(zoneId as DeliveryZoneId);
        regionEl.style.fill = "#EFE393";
      };

      const handleMouseLeave = () => {
        setHoveredZone(null);
        regionEl.style.fill = "transparent";
      };

      regionEl.addEventListener("mouseenter", handleMouseEnter);
      regionEl.addEventListener("mouseleave", handleMouseLeave);

      cleanups.push(() => {
        regionEl.removeEventListener("mouseenter", handleMouseEnter);
        regionEl.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [isMobile]);

  return (
    <div
      id="deliveryMap"
      className="w-full relative mb-12 pt-10 md:pt-4 pb-20 md:pb-4"
      style={{
        height: isMobile ? "calc(100vh - 20px)" : "auto",
        overflow: isMobile ? "auto" : "visible",
      }}>
      <div className="w-full relative touch-pan-x touch-pan-y touch-pinch-zoom md:touch-none">
        <svg
          ref={svgRef}
          viewBox="0 100 1200 650"
          width="100%"
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
          <div className="fixed top-[90px] left-[20px] z-10 pointer-events-none opacity-90 max-w-[400px] bg-[#1e1e1e] text-white border-2 border-[#EFE393] px-6 py-4">
            <h4 className="text-lg font-semibold">{hoveredZone}</h4>
            <p className="text-sm">{deliveryZones[hoveredZone]}</p>
          </div>
        )}
      </div>
    </div>
  );
}
