"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function LatestProducts() {
  const [currentProduct, setCurrentProduct] = useState(0);
  const products = ["Kalamscope...", "Sanjivani QCPR..."];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [products.length]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const letterVariants = {
    initial: { opacity: 0, x: "100%" },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    exit: {
      opacity: 0,
      x: "-100%",
      transition: { duration: 0.2 },
    },
  };

  return (
    <section
      id="latest-products"
      className="relative min-h-[600px] overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Medical laboratory equipment"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-40"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1d417b]/80 to-gray-700/80 z-1" />

      <div className="relative container mx-auto px-4 py-20 z-10">
        <div className="text-center">
          <div className="h-24 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-white text-5xl md:text-7xl font-bold"
              >
                {products[currentProduct].split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    style={{ display: "inline-block" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-yellow-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Inofinity Research & Development Pvt Ltd has taken the initiative of
            placing innovative products at various public community areas like
            Airport, Railway station to facilitate public health and safety.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="#contact-section" passHref>
              <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300">
                Learn More
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Wave design at the footer */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50L48 45.8C96 41.7 192 33.3 288 29.2C384 25 480 25 576 33.3C672 41.7 768 58.3 864 62.5C960 66.7 1056 58.3 1152 50C1248 41.7 1344 33.3 1392 29.2L1440 25V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            fill="rgba(59, 130, 246, 0.3)"
          />
          <path
            d="M0 75L48 70.8C96 66.7 192 58.3 288 54.2C384 50 480 50 576 58.3C672 66.7 768 83.3 864 87.5C960 91.7 1056 83.3 1152 75C1248 66.7 1344 58.3 1392 54.2L1440 50V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V75Z"
            fill="rgba(147, 197, 253, 0.5)"
          />
        </svg>
      </div>
    </section>
  );
}
