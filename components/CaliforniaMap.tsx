/* eslint-disable @next/next/no-img-element */
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent
} from "react";
import { motion } from "framer-motion";

type TooltipPosition = {
  x: number;
  y: number;
};

type CaliforniaMapProps = {
  selectedRegionName?: string | null;
  onRegionSelect: (name: string | null) => void;
};

const mapVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.25 } }
};

export default function CaliforniaMap({
  selectedRegionName,
  onRegionSelect
}: CaliforniaMapProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<TooltipPosition>({
    x: 0,
    y: 0
  });

  const updateTooltipPosition = useCallback(
    (clientX: number, clientY: number) => {
      const wrapper = wrapRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      const tooltipWidth = tooltipEl?.offsetWidth ?? 0;
      const tooltipHeight = tooltipEl?.offsetHeight ?? 0;

      const padding = 12;
      let x = clientX - rect.left + 12;
      let y = clientY - rect.top + 16;

      const maxX = rect.width - tooltipWidth - padding;
      const maxY = rect.height - tooltipHeight - padding;

      x = Math.max(padding, Math.min(x, maxX));
      y = Math.max(padding, Math.min(y, maxY));

      setTooltipPos({ x, y });
    },
    []
  );

  // Load the SVG as inline markup so we can bind events to regions
  useEffect(() => {
    let isMounted = true;

    const loadSvg = async () => {
      try {
        const res = await fetch("/assets/kitchen-cali/california.svg");
        if (!res.ok) return;
        const text = await res.text();
        if (isMounted) {
          setSvgMarkup(text);
        }
      } catch {
        // fail silently – map just won't render
      }
    };

    loadSvg();

    return () => {
      isMounted = false;
    };
  }, []);

  // Attach interactivity to each county path once SVG is in the DOM
  useEffect(() => {
    if (!svgMarkup) return;
    const container = wrapRef.current;
    if (!container) return;

    const svg = container.querySelector("svg");
    if (!svg) return;

    // Ensure SVG scales with its wrapper instead of intrinsic size
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.style.display = "block";

    const regions = Array.from(
      svg.querySelectorAll<SVGGraphicsElement>("path[id], polygon[id]")
    );

    const cleanupFns: Array<() => void> = [];

    regions.forEach((regionEl) => {
      const id = regionEl.id;
      const humanName =
        regionEl.getAttribute("data-name") ?? `${id} County`.trim();

      regionEl.setAttribute("data-region", "true");
      regionEl.setAttribute("data-name", humanName);
      regionEl.setAttribute("tabindex", "0");
      regionEl.setAttribute("role", "button");
      regionEl.setAttribute("aria-label", humanName);
      regionEl.style.pointerEvents = "all";

      const handleFocus = () => {
        setHoveredName(humanName);
        setHoveredId(id || humanName);
        const rect = regionEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const topY = rect.top + 12;
        updateTooltipPosition(centerX, topY);
      };

      const handleBlur = () => {
        setHoveredName((prev) => (prev === humanName ? null : prev));
        setHoveredId((prev) => (prev === id ? null : prev));
      };

      const handleClick = () => {
        onRegionSelect(humanName);
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onRegionSelect(humanName);
        } else if (event.key === "Escape") {
          event.stopPropagation();
          onRegionSelect(null);
          (event.target as HTMLElement | null)?.blur();
        }
      };

      regionEl.addEventListener("focus", handleFocus);
      regionEl.addEventListener("blur", handleBlur);
      regionEl.addEventListener("click", handleClick);
      regionEl.addEventListener("keydown", handleKeyDown);

      cleanupFns.push(() => {
        regionEl.removeEventListener("focus", handleFocus);
        regionEl.removeEventListener("blur", handleBlur);
        regionEl.removeEventListener("click", handleClick);
        regionEl.removeEventListener("keydown", handleKeyDown);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [svgMarkup, onRegionSelect, updateTooltipPosition]);

  // Keep selection in sync with DOM via data attributes
  useEffect(() => {
    const container = wrapRef.current;
    if (!container) return;
    const svg = container.querySelector("svg");
    if (!svg) return;

    const regions = Array.from(
      svg.querySelectorAll<SVGGraphicsElement>('[data-region="true"]')
    );

    regions.forEach((regionEl) => {
      const name =
        regionEl.getAttribute("data-name") ?? `${regionEl.id} County`.trim();
      if (selectedRegionName && name === selectedRegionName) {
        regionEl.setAttribute("data-region-selected", "true");
        regionEl.setAttribute("aria-pressed", "true");
      } else {
        regionEl.removeAttribute("data-region-selected");
        regionEl.setAttribute("aria-pressed", "false");
      }
    });
  }, [selectedRegionName]);

  useEffect(() => {
    const container = wrapRef.current;
    if (!container) return;
    const svg = container.querySelector("svg");
    if (!svg) return;

    const regions = Array.from(
      svg.querySelectorAll<SVGGraphicsElement>('[data-region="true"]')
    );

    regions.forEach((regionEl) => {
      const isHovered =
        hoveredId &&
        (regionEl.id === hoveredId ||
          regionEl.getAttribute("data-name") === hoveredId);
      if (isHovered) {
        regionEl.setAttribute("data-region-hovered", "true");
      } else {
        regionEl.removeAttribute("data-region-hovered");
      }
    });
  }, [hoveredId]);

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    updateTooltipPosition(event.clientX, event.clientY);

    const wrapper = wrapRef.current;
    if (!wrapper) return;

    const elements = document.elementsFromPoint(
      event.clientX,
      event.clientY
    );
    let countyEl: Element | null = null;

    for (const el of elements) {
      if (!wrapper.contains(el as Node)) continue;
      const match = (el as Element).closest("[data-name]");
      if (match && wrapper.contains(match)) {
        countyEl = match;
        break;
      }
    }

    if (!countyEl) {
      setHoveredName(null);
      setHoveredId(null);
      return;
    }

    const name = countyEl.getAttribute("data-name");
    if (!name) {
      setHoveredName(null);
      setHoveredId(null);
      return;
    }

    const id = countyEl.getAttribute("id") ?? name;
    setHoveredName(name);
    setHoveredId(id);
  };

  const handleLeave = () => {
    setHoveredName(null);
    setHoveredId(null);
  };

  return (
    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-[720px]">
      <motion.div
        className="relative w-full"
        initial="hidden"
        animate="visible"
        variants={mapVariants}
      >
        <div
          ref={wrapRef}
          className="relative w-full aspect-[3/5] [&>svg]:h-full [&>svg]:w-full [&>svg]:drop-shadow-md"
          aria-label="Map of California counties"
          role="img"
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
        />

        {hoveredName && (
          <div
            ref={tooltipRef}
            className="pointer-events-none absolute z-30 rounded-full bg-cream px-3 py-1 text-xs font-medium text-deep-green shadow-soft"
            style={{ left: tooltipPos.x, top: tooltipPos.y }}
          >
            {hoveredName}
          </div>
        )}
      </motion.div>
    </div>
  );
}
