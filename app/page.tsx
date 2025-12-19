"use client";

import { motion } from "framer-motion";
import IntroGate from "../components/IntroGate";
import LocationPicker from "../components/LocationPicker";

const headlineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const foliageFloat = {
  animate: { y: [-6, 6, -6], transition: { duration: 16, repeat: Infinity } }
};

export default function Page() {
  return (
    <IntroGate>
      <main className="relative min-h-screen overflow-hidden bg-linen">
        <div className="pointer-events-none absolute inset-0">
          <motion.img
            src="/assets/kitchen-cali/pizza.svg"
            alt=""
            aria-hidden
            className="absolute -right-40 -top-32 hidden w-[560px] rotate-6 opacity-[0.1] sm:block md:w-[620px] lg:w-[700px]"
            {...foliageFloat}
            transition={{ duration: 13, repeat: Infinity }}
          />
          <motion.img
            src="/assets/kitchen-cali/tomato.svg"
            alt=""
            aria-hidden
            className="absolute -left-12 top-24 w-[180px] -rotate-6 opacity-[0.14] sm:w-[220px] lg:w-[260px]"
            {...foliageFloat}
            transition={{ duration: 11, repeat: Infinity }}
          />
          <motion.img
            src="/assets/kitchen-cali/tomato.svg"
            alt=""
            aria-hidden
            className="absolute bottom-10 right-10 hidden w-[160px] rotate-[10deg] opacity-[0.12] md:block lg:w-[200px]"
            {...foliageFloat}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.img
            src="/assets/kitchen-cali/basil.svg"
            alt=""
            aria-hidden
            className="absolute left-4 bottom-28 w-[160px] rotate-[14deg] opacity-[0.18] sm:w-[190px]"
            {...foliageFloat}
            transition={{ duration: 10.5, repeat: Infinity }}
          />
          <motion.img
            src="/assets/kitchen-cali/basil.svg"
            alt=""
            aria-hidden
            className="absolute right-14 top-[58%] hidden w-[140px] -rotate-[8deg] opacity-[0.16] md:block lg:w-[170px]"
            {...foliageFloat}
            transition={{ duration: 12.5, repeat: Infinity }}
          />
        </div>

        <header className="relative w-full px-6 pt-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-3 items-center">
            <div className="justify-self-start -mt-1 pl-1 text-sm uppercase tracking-[0.24em] text-deep-green/80">
              Kitchen Cali
            </div>
            <div className="justify-self-center" />
            <div className="justify-self-end">
              <div className="rounded-full bg-white/50 px-3 py-1 text-xs text-deep-green/70 shadow-soft backdrop-blur">
                California • Catering Directory
              </div>
            </div>
          </div>
        </header>

        <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw]">
          <div className="mx-auto flex min-h-[calc(100vh-140px)] w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
            <motion.div
              className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
              initial="hidden"
              animate="visible"
              variants={headlineVariants}
            >
              <p className="text-xs uppercase tracking-[0.32em] text-deep-green/70">
                Location Picker
              </p>
              <h1 className="text-4xl font-semibold text-deep-green md:text-5xl">
                Find caterers near you
              </h1>
              <p className="text-base text-deep-green/75 md:text-lg">
                Choose your county in California to see curated catering partners nearby.
              </p>
            </motion.div>

          <div className="mt-10 flex w-full justify-center">
            <div className="relative w-full max-w-[780px]">
              <img
                src="/assets/kitchen-cali/chef.svg"
                alt="Chef illustration"
                className="block h-auto w-full"
              />
              <div className="absolute left-[26%] top-[18%] flex h-[58%] w-[48%] items-center justify-center px-4 sm:px-6">
                <LocationPicker />
              </div>
            </div>
          </div>
          </div>
        </section>
      </main>
    </IntroGate>
  );
}
