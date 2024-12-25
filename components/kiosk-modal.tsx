"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface KioskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KioskModal({ isOpen, onClose }: KioskModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              About Our Kiosk
            </h2>
            <div className="prose max-w-none">
              <p>
                Our state-of-the-art medical kiosk is designed to revolutionize
                public health and safety. Placed in high-traffic areas such as
                airports and railway stations, these kiosks serve as life-saving
                stations in times of emergency.
              </p>
              <h3 className="text-xl font-semibold mt-4 mb-2">Key Features:</h3>
              <ul>
                <li>Advanced CPR guidance system</li>
                <li>Automated External Defibrillator (AED)</li>
                <li>Real-time connection to emergency services</li>
                <li>User-friendly interface for quick action</li>
                <li>Multilingual support for diverse populations</li>
              </ul>
              <p className="mt-4">
                Our kiosks are equipped with Sanjivani QCPR technology, ensuring
                that even untrained bystanders can provide effective assistance
                during cardiac emergencies. With clear, step-by-step
                instructions and real-time feedback, these kiosks significantly
                increase the chances of survival for cardiac arrest victims.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
