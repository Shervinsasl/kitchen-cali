"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent
} from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";

type TooltipPosition = {
  x: number;
  y: number;
};

type CaliforniaCountiesMapProps = {
  selectedCounty?: string | null;
  onSelectCounty: (name: string | null) => void;
};

export default function CaliforniaCountiesMap({
  selectedCounty,
  onSelectCounty
}: CaliforniaCountiesMapProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);
  const [selectedInternal, setSelectedInternal] = useState<string | null>(
    selectedCounty ?? null
  );
  const [tooltipPos, setTooltipPos] = useState<TooltipPosition>({
    x: 0,
    y: 0
  });
  const [features, setFeatures] = useState<FeatureCollection<Geometry> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Keep internal selection in sync with parent, but allow this component
  // to drive highlight logic locally as well.
  useEffect(() => {
    setSelectedInternal(selectedCounty ?? null);
  }, [selectedCounty]);

  // Load local TopoJSON/GeoJSON and normalize to a FeatureCollection
  useEffect(() => {
    let isMounted = true;

    const loadGeo = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/geo/ca-counties.topo.json");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        let fc: FeatureCollection<Geometry>;

        if (data.type === "Topology") {
          const topo = data as any;
          const objects = topo.objects || {};
          if (!objects.counties) {
            throw new Error("Expected objects.counties in Topology");
          }
          const topoFeature = feature(topo, objects.counties) as
            | Feature<Geometry>
            | FeatureCollection<Geometry>;
          if (topoFeature.type !== "FeatureCollection") {
            throw new Error("Expected FeatureCollection from Topology");
          }
          fc = topoFeature;
        } else if (data.type === "FeatureCollection") {
          fc = data as FeatureCollection<Geometry>;
        } else {
          throw new Error(`Unsupported geo data type: ${data.type}`);
        }

        if (!isMounted) return;

        setFeatures(fc);
        setLoading(false);
      } catch (err: unknown) {
        console.error("Failed to load California counties TopoJSON:", err);
        if (!isMounted) return;
        setError(
          err instanceof Error ? err.message : "Unknown error loading geo data"
        );
        setLoading(false);
      }
    };

    void loadGeo();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateTooltipPosition = useCallback(
    (clientX: number, clientY: number) => {
      const wrapper = wrapperRef.current;
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

  const handleWrapperPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    updateTooltipPosition(event.clientX, event.clientY);
  };

  const handleWrapperPointerLeave = () => {
    setHoveredCounty(null);
  };

  const handleCountyPointerMove = (
    event: ReactPointerEvent<SVGPathElement>,
    name: string
  ) => {
    setHoveredCounty(name);
    updateTooltipPosition(event.clientX, event.clientY);
  };

  const handleCountyPointerLeave = () => {
    setHoveredCounty(null);
  };

  const handleCountyClick = (name: string) => {
    setSelectedInternal(name);
    onSelectCounty(name);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("selectedCounty", name);
    }
  };

  const handleCountyKeyDown = (
    event: React.KeyboardEvent<SVGPathElement>,
    name: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCountyClick(name);
    } else if (event.key === "Escape") {
      event.stopPropagation();
      setSelectedInternal(null);
      onSelectCounty(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("selectedCounty");
      }
      (event.target as HTMLElement | null)?.blur();
    }
  };

  const getFillForCounty = (name: string) => {
    const base = "#D8D8D8";
    const hover = "#C4C4C4";
    const selected = "#C77A5A";

    if (selectedInternal && name === selectedInternal) return selected;
    if (hoveredCounty && name === hoveredCounty) return hover;
    return base;
  };

  return (
    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-[720px]">
      <div
        ref={wrapperRef}
        className="relative w-full h-[320px] md:h-[420px] lg:h-[520px]"
        onPointerMove={handleWrapperPointerMove}
        onPointerLeave={handleWrapperPointerLeave}
      >
        {loading && !error && (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-deep-green/60">
            Loading map…
          </div>
        )}

        {error && (
          <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs text-red-700">
            Failed to load counties: {error}
          </div>
        )}

        {!loading && !error && !features && (
          <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs text-deep-green/60">
            No county data available.
          </div>
        )}

        {!loading && !error && features && (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 2500,
              center: [-119.5, 37.2]
            }}
            className="h-full w-full"
          >
            <Geographies geography={features as unknown as any}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const rawName =
                    (geo.properties as any).NAME ??
                    (geo.properties as any).name ??
                    "";
                  if (!rawName) return null;

                  // Normalize to "X County" form
                  const name = rawName.endsWith("County")
                    ? rawName
                    : `${rawName} County`;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      tabIndex={0}
                      role="button"
                      aria-label={name}
                      onPointerMove={(e) => handleCountyPointerMove(e, name)}
                      onPointerLeave={handleCountyPointerLeave}
                      onClick={() => handleCountyClick(name)}
                      onKeyDown={(e) => handleCountyKeyDown(e, name)}
                      style={{
                        default: {
                          fill: getFillForCounty(name),
                          stroke: "#1F3D2B",
                          strokeWidth: 0.75,
                          outline: "none",
                          transition: "fill 0.18s ease-out"
                        },
                        hover: {
                          fill: getFillForCounty(name),
                          stroke: "#1F3D2B",
                          strokeWidth: 0.8,
                          outline: "none",
                          cursor: "pointer"
                        },
                        pressed: {
                          fill: getFillForCounty(name),
                          stroke: "#1F3D2B",
                          strokeWidth: 0.8,
                          outline: "none"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        )}

        {hoveredCounty && (
          <div
            ref={tooltipRef}
            className="pointer-events-none absolute z-30 rounded-full bg-cream px-3 py-1 text-xs font-medium text-deep-green shadow-soft"
            style={{ left: tooltipPos.x, top: tooltipPos.y }}
          >
            {hoveredCounty}
          </div>
        )}
      </div>
    </div>
  );
}

