"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function YouTubeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section className="relative bg-[#101728] py-16 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#101728] z-1" />

      {/* Top Wave - Updated design */}
      <div className="absolute top-0 left-0 right-0 z-2">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{ marginTop: -1, transform: "rotate(180deg)" }}
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

      <div className="max-w-7xl mx-auto px-4 py-32 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-white relative inline-block">
          Watch Our Latest Video
        </h2>
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
          <div className="flex justify-center lg:w-1/2">
            <iframe
              src="https://www.youtube.com/embed/Z-5FDZpvRtY"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video max-w-3xl rounded-lg shadow-xl"
            ></iframe>
          </div>

          <div
            ref={textRef}
            className={`w-full lg:w-1/2 mt-8 lg:mt-0 transition-opacity duration-1000 ease-in-out transform ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
          >
            <h3 className="text-2xl font-extrabold mb-4 text-white font-serif">
              Did You Know?
            </h3>
            <p className="text-gray-200 text-lg leading-relaxed mb-6 font-roboto">
              About 90% of cardiac arrests occur outside the hospital, and a
              victim's brain suffers permanent damage after 6 minutes of cardiac
              arrest. Only less than 10% of victims survive if taken to a
              hospital.
              <br />
              <br />A bystander can give CPR, chest compressions at 100 per
              minute, until emergency medical help arrives. CPR is a life-saving
              skill.
            </p>
            <div className="mt-8 text-center">
              <a
                href="https://www.youtube.com/channel/UCflNnm0U1MZNv-_qNbrpPDQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-800"
              >
                See More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
