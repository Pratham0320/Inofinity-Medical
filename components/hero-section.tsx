'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { KioskModal } from './kiosk-modal'

export function HeroSection() {
  const [currentText, setCurrentText] = useState(0)
  const texts = ["DONATE  A  KIOSK  TO  SOCIETY ...", "TRAIN  YOUR  HANDS  TO  SAVE  A  LIFE ..."]
  const [currentImage, setCurrentImage] = useState(0)
  const [isKioskModalOpen, setIsKioskModalOpen] = useState(false)
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);

  // const backgroundImages = [
  //   'https://media.istockphoto.com/id/1441979374/photo/medical-team-meeting.jpg?s=612x612&w=0&k=20&c=2DM74ZVh8bv4hS5lbTKTnbozb9pR6-QeIk5zf2SFdoo=',
  //   'https://media.istockphoto.com/id/862229772/photo/doctors-meeting.jpg?s=612x612&w=0&k=20&c=AJZGw45BZq5kIdU4OgdHJhUo1gvjKMXdJl_RO8BKL1o=',
  //   'https://thumbs.dreamstime.com/z/operating-room-cardiac-surgery-photo-34025287.jpg?ct=jpeg-photo.jpg',
  //   'https://thumbs.dreamstime.com/z/clean-professional-cardiologists-office-medical-equipment-including-ecg-machine-stethoscope-anatomical-heart-model-322967732.jpg?ct=jpeg'
  
  // ]

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/hero');
        const data = await response.json();
        if (Array.isArray(data.images)) {
          setBackgroundImages(data.images);
        }
      } catch (error) {
        console.error('Error fetching hero images:', error);
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
    const getInTouchSection = document.getElementById('get-in-touch')
    if (getInTouchSection) {
      getInTouchSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const imageVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 1 } },
    exit: { x: '-100%', opacity: 0, transition: { duration: 1 } }
  }

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  }

  const letterVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", damping: 10, stiffness: 100 }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.2 }
    }
  }

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
            style={{ backgroundImage: `url(${backgroundImages[currentImage]})` }}
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
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl text-blue-200 mb-4 font-light"
          >
            Advancing Healthcare Technology
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8"
          >
            INOFINITY
          </motion.h1>


          <div className="h-24 mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentText}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-xl md:text-3xl text-gray-300 font-light"
              >
                {texts[currentText].split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    style={{ display: 'inline-block' }}
                    className="mr-[0.2em]"
                  >
                    {letter}
                  </motion.span>
                ))}
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
              style={{ borderRadius: '50px', width: 'fit-content' }}
            >
              CONTACT US
            </button>

            <button
              onClick={() => setIsKioskModalOpen(true)}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-800 font-bold text-lg px-10 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
              style={{ borderRadius: '50px', width: 'fit-content' }}
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

      <KioskModal isOpen={isKioskModalOpen} onClose={() => setIsKioskModalOpen(false)} />
    </div>
  )
}
