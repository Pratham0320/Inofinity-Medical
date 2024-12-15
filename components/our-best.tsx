'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

export function OurBest() {
  const [isVisible, setIsVisible] = useState(false)
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 50, y: 50 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event
    const { innerWidth, innerHeight } = window
    const x = (clientX / innerWidth) * 100
    const y = (clientY / innerHeight) * 100
    setBackgroundPosition({ x, y })
  }

  const achievements = [
    { imagePath: '/images/Our-Best/NIRMAN-FELICITATION.jpg', title: 'NIRMAN FELICITATION', position: 'left' },
    { imagePath: '/images/Our-Best/INOFINITYRND-IMMT-FELICITATION.jpg', title: 'INOFINITYRND IMMT FELICITATION', position: 'center' },
    { imagePath: '/images/Our-Best/IMMT-CSIR.jpg', title: 'IMMT CSIR', position: 'right' },
    { imagePath: '/images/Our-Best/WHO-innovation-head-Louise-Agarsnap.jpg', title: 'WHO GLOBAL MEDICAL INNOVATION CENTER AT INDIA', position: 'left' },
    { imagePath: '/images/Our-Best/INOFINITYRND-TATA-IIM-TSEC-768x927.jpg', title: 'TSEC SOCIAL ENTREPRENEURSHIP SUMMIT 2021-2022', position: 'center' },
    { imagePath: '/images/Our-Best/cmo_odisha.jpg', title: 'INTERACTION WITH HONOURABLE CM OF ODISHA', position: 'right' },
    { imagePath: '/images/Our-Best/Dr-Manish-Diwan-BIRAC-str-head.jpg', title: 'Dr Manish Diwan BIRAC STR HEAD', position: 'left' },
    { imagePath: '/images/Our-Best/INOFINITYRND-WTO-BBSR-e1658063425337.jpg', title: 'INOFINITYRND WTO BBSR', position: 'center' },
    { imagePath: '/images/Our-Best/BIRAC-STR-HEAD-e1658063092503.jpg', title: 'Dr Manish Diwan BIRAC STR HEAD', position: 'right' },
  ]

  return (
    <section
      ref={sectionRef}
      id="our-best"
      className="pt-24 pb-24 relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${backgroundPosition.x}% ${backgroundPosition.y}%, #1e293b, #111827, #0f172a)`,
        transition: 'background 0.1s ease',
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-4 relative">
        <h2
          className={`text-4xl font-extrabold tracking-wider uppercase text-center mb-16 text-white transition-all duration-1000 ${
            isVisible ? 'animate-fadeInUp' : 'opacity-1 translate-y-10'
          }`}
        >
          our best
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-700 ease-out
                ${achievement.position === 'center' ? 'lg:mt-12' : ''}
                ${achievement.position === 'right' ? 'lg:mt-24' : ''}
                ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden bg-white shadow-md rounded-lg transition-all duration-300 ease-out group-hover:shadow-xl">
                <div className="relative h-72 w-full rounded-lg">
                  <Image
                    src={achievement.imagePath}
                    alt={achievement.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105 rounded-lg"
                  />
                </div>

                {/* Hover Title (Desktop Only) */}
                <div
                  className={`absolute bottom-0 w-full p-4 bg-white text-black text-center text-lg font-semibold transition-transform transform translate-y-full group-hover:translate-y-0 duration-500 hidden md:block`}
                >
                  {achievement.title}
                </div>

                {/* Always Visible Title (Mobile Only) */}
                <div className="block md:hidden p-2 text-center bg-white text-black rounded-b-lg">
                  {achievement.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
