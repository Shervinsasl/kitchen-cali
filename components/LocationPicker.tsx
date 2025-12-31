"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { slugify } from "../lib/slugify";

type County = {
  name: string;
  cities: string[];
};

const counties: County[] = [
  {
    name: "Los Angeles",
    cities: [
      "Los Angeles",
      "Long Beach",
      "Santa Monica",
      "Pasadena",
      "Glendale",
      "Burbank",
      "Torrance",
      "Inglewood"
    ]
  },
  {
    name: "Orange",
    cities: [
      "Irvine",
      "Anaheim",
      "Santa Ana",
      "Huntington Beach",
      "Costa Mesa",
      "Newport Beach",
      "Fullerton",
      "Laguna Beach"
    ]
  },
  {
    name: "San Diego",
    cities: [
      "San Diego",
      "La Jolla",
      "Encinitas",
      "Chula Vista",
      "Carlsbad",
      "Oceanside",
      "Escondido",
      "Coronado"
    ]
  },
  {
    name: "Santa Clara",
    cities: [
      "San Jose",
      "Palo Alto",
      "Mountain View",
      "Sunnyvale",
      "Cupertino",
      "Santa Clara",
      "Los Altos",
      "Milpitas"
    ]
  },
  {
    name: "San Francisco",
    cities: [
      "San Francisco",
      "Daly City",
      "South San Francisco",
      "Pacifica",
      "Treasure Island",
      "Bayview",
      "Sunset",
      "Richmond"
    ]
  },
  {
    name: "Alameda",
    cities: [
      "Oakland",
      "Berkeley",
      "Fremont",
      "Hayward",
      "Alameda",
      "Livermore",
      "Pleasanton",
      "Dublin"
    ]
  },
  {
    name: "Sacramento",
    cities: [
      "Sacramento",
      "Elk Grove",
      "Citrus Heights",
      "Folsom",
      "Rancho Cordova",
      "Roseville",
      "Davis",
      "West Sacramento"
    ]
  },
  {
    name: "Riverside",
    cities: [
      "Riverside",
      "Palm Springs",
      "Temecula",
      "Murrieta",
      "Corona",
      "Moreno Valley",
      "Indio",
      "La Quinta"
    ]
  },
  {
    name: "San Bernardino",
    cities: [
      "San Bernardino",
      "Ontario",
      "Rancho Cucamonga",
      "Redlands",
      "Fontana",
      "Victorville",
      "Chino",
      "Big Bear Lake"
    ]
  },
  {
    name: "Ventura",
    cities: [
      "Ventura",
      "Oxnard",
      "Thousand Oaks",
      "Camarillo",
      "Simi Valley",
      "Carpinteria",
      "Santa Paula",
      "Ojai"
    ]
  }
];

const transition = { duration: 0.28, ease: "easeOut" };

export default function LocationPicker() {
  const router = useRouter();
  const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const list = useMemo(
    () => (selectedCounty ? selectedCounty.cities : counties.map((c) => c.name)),
    [selectedCounty]
  );

  const selectedCountyName = selectedCounty?.name ?? null;

  const title = selectedCounty ? "Great choice. Now choose a city" : "Choose your county";
  const subtitle = selectedCounty
    ? `Showing cities in ${selectedCounty.name}`
    : "Then pick a city to continue";

  return (
    <div className="flex w-full max-w-[360px] flex-col items-center gap-4 text-center sm:max-w-[400px]">
      <div className="space-y-1">
        <p className="text-[11px] font-medium tracking-[0.18em] text-deep-green/60 sm:text-xs">
          {subtitle}
        </p>
        <h2 className="text-lg font-medium text-deep-green sm:text-xl">
          {title}
        </h2>
      </div>

      <div className="w-full">
        <AnimatePresence mode="wait">
          {selectedCounty ? (
            <motion.div
              key="cities"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={transition}
              className="flex w-full flex-col items-center gap-3"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedCounty(null);
                  setSelectedCity(null);
                }}
                className="text-xs font-medium text-deep-green/70 transition hover:text-deep-green"
              >
                Back
              </button>
              <div className="kc-scroll flex max-h-[300px] w-full flex-col gap-2 overflow-y-auto pr-1 sm:max-h-[360px]">
                {list.map((city) => {
                  const isSelected = selectedCity === city;
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        if (!selectedCounty) return;
                        setSelectedCity(city);
                        router.push(
                          `/${slugify(selectedCounty.name)}/${slugify(city)}`
                        );
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-2 text-sm font-medium text-deep-green/80 transition ${
                        isSelected
                          ? "bg-deep-green/12 text-deep-green shadow-soft"
                          : "bg-deep-green/5 hover:scale-[1.01] hover:bg-deep-green/10"
                      }`}
                    >
                      <span>{city}</span>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isSelected ? "bg-deep-green" : "bg-deep-green/30"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="counties"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={transition}
              className="kc-scroll flex max-h-[300px] w-full flex-col gap-2 overflow-y-auto pr-1 sm:max-h-[360px]"
            >
              {list.map((countyName) => {
                const isSelected = selectedCountyName === countyName;
                return (
                  <button
                    key={countyName}
                    type="button"
                    onClick={() => {
                      const county = counties.find((c) => c.name === countyName) ?? null;
                      setSelectedCounty(county);
                      setSelectedCity(null);
                    }}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-2 text-sm font-medium text-deep-green/80 transition ${
                      isSelected
                        ? "bg-deep-green/12 text-deep-green shadow-soft"
                        : "bg-deep-green/5 hover:scale-[1.01] hover:bg-deep-green/10"
                    }`}
                  >
                    <span>{countyName}</span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isSelected ? "bg-deep-green" : "bg-deep-green/30"
                      }`}
                    />
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
