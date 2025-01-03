"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KioskModal } from "./kiosk-modal";

export function HeroSection() {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "DONATE A KIOSK TO SOCIETY ...",
    "TRAIN YOUR HANDS TO SAVE A LIFE ...",
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [isKioskModalOpen, setIsKioskModalOpen] = useState(false);
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);

  useEffect(() => {
    if (backgroundImages.length > 0) {
      backgroundImages.forEach((image) => {
        const img = new Image();
        img.src = image;
      });
    }
  }, [backgroundImages]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/hero");
        const data = await response.json();
        if (Array.isArray(data.images)) {
          setBackgroundImages(data.images);
        }
      } catch (error) {
        console.error("Error fetching hero images:", error);
      }
    }
    fetchImages();
  }, []);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 5000);
    return () => clearInterval(textTimer);
  }, []);

  useEffect(() => {
    if (backgroundImages.length > 0) {
      const imageTimer = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
      }, 5000);
      return () => clearInterval(imageTimer);
    }
  }, [backgroundImages]);

  const scrollToContact = () => {
    const getInTouchSection = document.getElementById("get-in-touch");
    if (getInTouchSection) {
      getInTouchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const imageVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 1 } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 1 } },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image Animation */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={currentImage}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImages[currentImage]})`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-700 opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg md:text-2xl text-gray-300 mt-4 hero-subtitle "
          >
            ADVANCING HEALTHCARE TECHNOLOGY
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-9xl font-extrabold text-white hero-title"
            style={{
              textShadow:
                "0px 4px 10px rgba(0, 0, 0, 0.8), 0px 0px 20px #0077b6",
            }}
          >
            INOFINITY
          </motion.h1>

          <div className="h-24 mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="text-xl md:text-2xl text-gray-300 font-light mt-4 hero-subtitle"
              >
                {texts[currentText]}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={scrollToContact}
              className="bg-[#0077b6] hover:bg-[#006da7] text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
              style={{ borderRadius: "50px", width: "fit-content" }}
            >
              CONTACT US
            </button>

            <button
              onClick={() => setIsKioskModalOpen(true)}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-800 font-bold text-lg px-10 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
              style={{ borderRadius: "50px", width: "fit-content" }}
            >
              ABOUT KIOSK
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{ marginBottom: -1 }}
        >
          <path
            d="M0,128L80,144C160,160,320,192,480,192C640,192,800,160,960,149.3C1120,139,1280,149,1360,154.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            fill="rgba(219, 234, 254, 0.3)"
          />
          <path
            d="M0,192L80,181.3C160,171,320,149,480,160C640,171,800,213,960,218.7C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            fill="rgba(147, 197, 253, 0.5)"
          />
          <path
            d="M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,261.3C1120,277,1280,267,1360,261.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            fill="rgba(59, 130, 246, 0.7)"
          />
          <path
            d="M0,256L80,245.3C160,235,320,213,480,224C640,235,800,277,960,293.3C1120,309,1280,299,1360,293.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            fill="#1d417b"
          />
        </svg>
      </div>

      <KioskModal
        isOpen={isKioskModalOpen}
        onClose={() => setIsKioskModalOpen(false)}
      />
    </div>
  );
}
