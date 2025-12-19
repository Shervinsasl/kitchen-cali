"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../public/assets/kitchen-cali/food.json";

type IntroGateProps = {
  children: ReactNode;
};

const INTRO_KEY = "kc_intro_done";
const FALLBACK_TIMEOUT_MS = 4200;

export default function IntroGate({ children }: IntroGateProps) {
  const [introState, setIntroState] = useState<"unknown" | "active" | "done">(
    "unknown"
  );
  const hasFinishedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    }
    setIntroState("done");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasDone = window.sessionStorage.getItem(INTRO_KEY);
    setIntroState(hasDone ? "done" : "active");
  }, []);

  useEffect(() => {
    if (introState !== "active") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      finishIntro();
    }, FALLBACK_TIMEOUT_MS);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
    };
  }, [introState, finishIntro]);

  const revealContent = introState === "done";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: revealContent ? 1 : 0, scale: revealContent ? 1 : 0.985 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {introState === "active" && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-linen"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="w-full max-w-[640px] px-6">
              <Lottie
                animationData={animationData}
                loop={false}
                autoplay
                onComplete={finishIntro}
                className="h-auto w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
