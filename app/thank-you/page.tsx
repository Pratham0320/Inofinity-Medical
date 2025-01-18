'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Thank You for Your Submission!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          We appreciate your interest. Our team will contact you soon.
        </p>
        <Link href="/">
          <Button size="lg" className="font-semibold">
            Return to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

