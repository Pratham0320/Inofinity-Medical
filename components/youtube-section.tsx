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

      <div className="max-w-full mx-auto px-4 py-32 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Watch Our Latest Video
        </h2>

        {/* Center-Aligned Video with 75% Width */}
        <div className="w-full sm:w-3/4 mx-auto">
          <iframe
            src="https://www.youtube.com/embed/Z-5FDZpvRtY"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video rounded-lg shadow-xl"
          ></iframe>
        </div>

        {/* Description Below the Video */}
        <div className="w-3/4 mx-auto mt-8 text-center">
          <h3 className="text-3xl font-bold mb-4 text-white">
            Sanjivani QCPR Training & Process
          </h3>
          <p
            className="text-gray-200 text-lg leading-relaxed font-light"
            style={{ textAlign: "justify" }}
          >
            About 90% of cardiac arrests occur outside hospitals, making
            immediate action crucial. A victim’s brain begins to suffer
            permanent damage within 6 minutes of cardiac arrest, and survival
            rates drop below 10% even when taken to a hospital. However, a
            bystander performing CPR with chest compressions at 100 per minute
            can sustain vital blood flow until emergency help arrives. CPR is a
            simple yet life-saving skill that everyone should learn to make a
            difference in critical moments.
          </p>
          <div className="mt-8">
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
    </section>
  );
}
