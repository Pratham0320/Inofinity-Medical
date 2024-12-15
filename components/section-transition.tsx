'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function SectionTransition() {
  return (
    <div className="relative h-[30vh] overflow-hidden bg-[#1d417b]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] bg-blue-300/20"
            style={{
              left: 0,
              right: 0,
              top: `${20 * (i + 1)}%`,
            }}
            animate={{
              translateX: ['-100%', '100%'],
            }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Central Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-light tracking-[0.2em] text-white mb-4">
            OUR LATEST PRODUCTS
          </h2>
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-blue-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[50px]" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <g transform="translate(0,-10)">
            <path 
              d="M0,20 C300,60 900,-20 1200,20 L1200,80 L0,80 Z" 
              className="fill-[#1a365d] opacity-30"
            />
            <path 
              d="M0,30 C300,70 900,-10 1200,30 L1200,80 L0,80 Z" 
              className="fill-[#2563eb] opacity-20"
            />
            <path 
              d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" 
              className="fill-[#60a5fa] opacity-10"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

