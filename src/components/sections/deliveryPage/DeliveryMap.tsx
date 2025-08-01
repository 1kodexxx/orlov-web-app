// src/components/RussiaMap.tsx

// Чтобы TS знал про navigator.msMaxTouchPoints, делаем глобальное расширение:
export {};
declare global {
  interface Navigator {
    /** Для старых IE/Edge */
    msMaxTouchPoints?: number;
  }
}

import { useEffect, useRef, useState } from "react";
import RussiaMapSVG from "@/assets/geo/russianMap.svg?react";
import { deliveryZones } from "@/data/deliveryData/deliveryMap.data";
import type { DeliveryZoneId } from "@/data/deliveryData/deliveryMap.data";

export default function RussiaMap() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hoveredZone, setHoveredZone] = useState<DeliveryZoneId | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Определяем, сенсорное ли устройство (телефон, планшет и т.п.)
  useEffect(() => {
    const touch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator.msMaxTouchPoints ?? 0) > 0;
    setIsTouchDevice(touch);
    setShowHint(touch);
  }, []);

  useEffect(() => {
    const svgEl = svgRef.current;
    const containerEl = containerRef.current;
    if (!svgEl || !containerEl) return;
    const cleanups: (() => void)[] = [];

    const clearAllRegions = () =>
      svgEl
        .querySelectorAll<SVGElement>(
          ".custom-map path, .custom-map polygon, .custom-map rect"
        )
        .forEach((el) => (el.style.fill = "transparent"));

    const calcMousePos = (x: number, y: number) => {
      const rect = containerEl.getBoundingClientRect();
      const offsetX = x - rect.left;
      const offsetY = y - rect.top;
      const maxX = rect.width - 400;
      const maxY = rect.height - 120;
      return {
        x: Math.min(Math.max(offsetX, 0), maxX),
        y: Math.min(Math.max(offsetY, 0), maxY),
      };
    };

    const calcTouchPos = (regionEl: SVGElement) => {
      const regionRect = regionEl.getBoundingClientRect();
      const contRect = containerEl.getBoundingClientRect();
      const scrollX = containerEl.scrollLeft;
      const tooltipW = 350;
      const rawX =
        regionRect.left -
        contRect.left +
        scrollX +
        regionRect.width / 2 -
        tooltipW / 2;
      const minX = scrollX;
      const maxX = scrollX + contRect.width - tooltipW;
      const x = Math.min(Math.max(rawX, minX), maxX);
      const y = regionRect.top - contRect.top + regionRect.height + 8;
      return { x, y };
    };

    Object.keys(deliveryZones).forEach((zoneId) => {
      const regionEl = svgEl.querySelector<SVGElement>(`#${zoneId}`);
      if (!regionEl) return;
      regionEl.style.pointerEvents = "all";
      regionEl.style.transition = "fill 0.3s ease";

      if (!isTouchDevice) {
        // Десктоп: hover + move + leave
        const onEnter = (e: MouseEvent) => {
          clearAllRegions();
          setHoveredZone(zoneId as DeliveryZoneId);
          regionEl.style.fill = "#EFE393";
          setTooltipPos(calcMousePos(e.clientX, e.clientY));
        };
        const onMove = (e: MouseEvent) =>
          setTooltipPos(calcMousePos(e.clientX, e.clientY));
        const onLeave = () => {
          setHoveredZone(null);
          regionEl.style.fill = "transparent";
        };

        regionEl.addEventListener("mouseenter", onEnter);
        regionEl.addEventListener("mousemove", onMove);
        regionEl.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          regionEl.removeEventListener("mouseenter", onEnter);
          regionEl.removeEventListener("mousemove", onMove);
          regionEl.removeEventListener("mouseleave", onLeave);
        });
      } else {
        // Тачевые: touchstart
        const onTouchStart = (e: TouchEvent) => {
          e.stopPropagation();
          clearAllRegions();
          setHoveredZone(zoneId as DeliveryZoneId);
          regionEl.style.fill = "#EFE393";
          setTooltipPos(calcTouchPos(regionEl));
          setShowHint(false);
        };
        regionEl.addEventListener("touchstart", onTouchStart);
        cleanups.push(() =>
          regionEl.removeEventListener("touchstart", onTouchStart)
        );
      }
    });

    if (isTouchDevice) {
      const onDocTouch = () => {
        setHoveredZone(null);
        clearAllRegions();
      };
      document.addEventListener("touchstart", onDocTouch);
      cleanups.push(() =>
        document.removeEventListener("touchstart", onDocTouch)
      );

      const onContainerScroll = () => setShowHint(false);
      containerEl.addEventListener("scroll", onContainerScroll);
      cleanups.push(() =>
        containerEl.removeEventListener("scroll", onContainerScroll)
      );
    }

    return () => cleanups.forEach((fn) => fn());
  }, [isTouchDevice]);

  const scrollLeft = () =>
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <div
      ref={containerRef}
      id="deliveryMap"
      className="w-full md:max-w-[1245px] mx-auto relative mb-12 pt-10 md:pt-4 pb-20 md:pb-4"
      style={{
        height: isTouchDevice ? "calc(100vh - 7.5rem)" : "700px",
        overflowX: isTouchDevice ? "auto" : "visible",
        overflowY: "hidden",
      }}>
      {isTouchDevice && showHint && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-md z-20">
          Проведите пальцем или используйте стрелки, чтобы перемещать карту
        </div>
      )}

      <div
        className={
          isTouchDevice ? "relative touch-pan-x touch-pan-y" : "w-full relative"
        }>
        <svg
          ref={svgRef}
          viewBox="0 100 1200 650"
          style={{
            width: isTouchDevice ? "200%" : "100%",
            maxWidth: isTouchDevice ? "none" : "100%",
            height: "100%",
          }}
          preserveAspectRatio="xMidYMid meet"
          className="h-auto block touch-none">
          <style>{`
            .custom-map path,
            .custom-map polygon,
            .custom-map rect {
              fill: transparent;
              stroke: #EFE393;
              stroke-width: 1;
              transition: fill 0.3s ease;
            }
          `}</style>
          <g className="custom-map">
            <RussiaMapSVG />
          </g>
        </svg>

        {hoveredZone && (
          <div
            className="absolute z-10 pointer-events-none opacity-90 bg-[#1e1e1e] text-white border-2 border-[#EFE393] px-4 py-3 rounded min-w-[350px] max-w-[400px] whitespace-normal"
            style={{ top: tooltipPos.y, left: tooltipPos.x }}>
            <h4 className="text-lg font-semibold">{hoveredZone}</h4>
            <p className="text-sm">{deliveryZones[hoveredZone]}</p>
          </div>
        )}
      </div>

      {isTouchDevice && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 bg-[#1e1e1e] bg-opacity-70 flex items-center justify-center rounded-full">
            ←
          </button>
          <button
            onClick={scrollRight}
            className="w-10 h-10 bg-[#1e1e1e] bg-opacity-70 flex items-center justify-center rounded-full">
            →
          </button>
        </div>
      )}
    </div>
  );
}
