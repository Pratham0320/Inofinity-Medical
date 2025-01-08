"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function HeroSection() {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "DONATE A SANJIVANI QCPR TO SOCIETY ...",
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
              ABOUT SANJIVANI QCPR
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

      {/* Sanjivani QCPR */}
      <AnimatePresence>
        {isKioskModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsKioskModalOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl relative"
            >
              <button
                onClick={() => setIsKioskModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                SanjivaniQCPR
              </h2>
              <div className="prose max-w-none">
                <p className="italic text-lg font-semibold text-gray-900 hero-subtitle">
                  SanjivaniQCPR is an ergonomically designed & patented CPR
                  assist device for resuscitation of cardiac arrest victims by
                  common men.
                </p>
                <h3 className="text-xl font-bold text-red-600 mt-6 hero-subtitle">
                  Problem-
                </h3>
                <p>
                  <span className="font-semibold text-red-600 hero-subtitle">
                    Sudden Cardiac Arrest (SCA)
                  </span>{" "}
                  is the sudden cessation of the heart’s pumping activity with
                  hemodynamic collapse. About{" "}
                  <span className="font-bold">90%</span> of{" "}
                  <span className="font-bold">SCA</span> happens either at home
                  or the workplace with a survival rate of less than{" "}
                  <span className="font-bold">10%</span>.
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>
                    The survival rate can be doubled or tripled if
                    cardiopulmonary resuscitation (CPR) is initiated early by a
                    bystander or EMS.
                  </li>
                  <li>
                    The EMS service density, traffic congestion, and large
                    population in India are hindrances to early CPR.
                  </li>
                  <li>
                    Victims' brains suffer irreversible damage after 6 minutes
                    of cardiac arrest precisely.
                  </li>
                </ul>
                <h3 className="text-xl font-bold text-blue-600 mt-6 hero-subtitle">
                  Solution-
                </h3>
                <p>
                  Ergonomically designed handheld gadget with audiovisual
                  feedback in regional Indian languages facilitates common men
                  in providing{" "}
                  <span className="font-bold text-blue-600">
                    High Quality Chest Compression
                  </span>{" "}
                  to victims of cardiac arrest before the arrival of an
                  emergency medical team, so that the outcome is better.
                </p>
                <p>
                  The feedbacks are:{" "}
                  <span className="italic text-gray-700">
                    “Good Job, Match with beep, Compress more, Release more”{" "}
                  </span>
                  — ensuring the rate of compression is 100/min, depth is 5cm,
                  and complete recoil according to the norms of the Basic Life
                  Support Guidelines (BLS-2020) of the American Heart
                  Association (AHA).
                </p>
                <p className="text-xl font-bold text-green-600 mt-6">
                  DONATE a Sanjivani to your society and be a lifesaver.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
