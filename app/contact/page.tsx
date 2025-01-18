"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import { MdEmail, MdPerson, MdMessage } from "react-icons/md";
import ThankYouPage from "../thank-you/page";

export default function Contact() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") === "true") {
      setIsSubmitted(true);
      // Remove the query parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  if (isSubmitted) {
    return <ThankYouPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-3 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/20 text-gray-800 h-14 rounded-full shadow-lg backdrop-blur-lg"
            : "bg-transparent text-white h-14"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" className="relative flex items-center">
            <div
              className={`relative transform transition-all duration-500 ease-in-out ${
                isScrolled ? "w-28 h-auto" : "w-40 h-auto"
              } hover:scale-105`}
            >
              <img
                src="/images/logo.png"
                alt="Inofinity Logo"
                className="object-contain w-full h-full"
              />
            </div>
          </Link>
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-6">
              <NavLink href="/">HOME</NavLink>
              <NavLink href="/opportunities">OPPORTUNITIES</NavLink>
              <NavLink href="/blog">BLOG</NavLink>
              <SearchForm />
            </div>
            <motion.button
              className={`md:hidden p-2 rounded-full ${
                isScrolled
                  ? "text-gray-800 bg-white/20 backdrop-blur-lg hover:bg-white/40"
                  : "text-white hover:bg-black/20"
              } transition-colors`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
        {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      </motion.nav>
      {/* Banner Section */}
      <div className="relative h-[500px]">
        <img
          src="/images/contact-banner.jpeg"
          alt="Healthcare banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="hidden lg:block text-center">
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-white font-extrabold tracking-wide leading-snug text-4xl sm:text-5xl lg:text-6xl"
            >
              Every <span className="text-red-500">life matters</span>
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-white font-extrabold tracking-wide leading-snug mt-4 text-4xl sm:text-5xl lg:text-6xl"
            >
              Innovation in healthcare
            </motion.h1>
          </div>

          {/* For smaller screens (no animation) */}
          <div className="block lg:hidden text-center">
            <h1 className="text-white text-5xl font-extrabold tracking-wide leading-snug">
              Every <span className="text-red-500">life matters</span>, <br />{" "}
              innovation in healthcare
            </h1>
          </div>
        </div>
      </div>

      {/* SVG Design */}
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="w-full"
        >
          <path
            className="elementor-shape-fill"
            opacity="0.80"
            d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z"
            fill="#1d417b"
          ></path>
        </svg>
      </div>

      {/* Contact Section */}
      <div className="py-16 px-6 max-w-screen-xl mx-auto">
        <h1
          className="text-6xl font-bold text-center text-gray-800 mb-6"
          style={{
            textShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Adjust shadow properties
          }}
        >
          Contact Us
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          We’re here to assist you with your queries. Reach out to us, and let’s
          work together for better healthcare solutions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="border p-6 rounded-md shadow-sm bg-white h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Have Questions?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Feel free to contact us through the details provided below. We
                are here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884l.802-.406c.634-.32 1.538-.147 1.968.395l2.07 2.633a1.5 1.5 0 01-.167 1.892l-1.154 1.15c-.151.152-.199.38-.107.57a11.052 11.052 0 004.665 4.665c.19.092.418.044.57-.107l1.15-1.154a1.5 1.5 0 011.892-.167l2.633 2.07c.542.43.715 1.334.395 1.968l-.406.802A2.5 2.5 0 0114.14 20c-7.18 0-13-5.82-13-13a2.5 2.5 0 011.003-2.116z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-800">Call Us</h3>
                    <p className="text-md text-gray-700">
                      (+91) 7978597090 <br />
                      (+91) 9439667800
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 8a1 1 0 000 2h14a1 1 0 100-2H3z" />
                      <path d="M3 12a1 1 0 000 2h8a1 1 0 100-2H3z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      Send Us Mail
                    </h3>
                    <p className="text-md text-gray-700">
                      info@inofinityrnd.com
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Our Office
                  </h3>
                  <iframe
                    className="w-full h-[400px] mt-4 rounded-sm"
                    frameBorder="0"
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=SAI PARADISE- Daruthenga&amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    style={{
                      boxShadow:
                        "0 10px 20px rgba(0, 0, 0, 0.3), 0 6px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-md shadow-md h-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form
              action="https://formsubmit.co/info@inofinityrnd.com"
              method="POST"
            >
              <input
                type="hidden"
                name="_next"
                value="https://inofinityrnd.com/contact?success=true"
              />
              <input
                type="hidden"
                name="_subject"
                value="New contact form submission"
              />

              <div className="relative">
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </Label>
                <MdPerson className="absolute left-4 top-10 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  name="Name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="pl-12 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-500"
                />
              </div>
              <div className="relative">
                <Label
                  htmlFor="email"
                  className="block mt-4 text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <MdEmail className="absolute left-4 top-10 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="Email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="pl-12 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-500"
                />
              </div>
              <div className="relative">
                <Label
                  htmlFor="message"
                  className="block mt-4 text-sm font-medium text-gray-700"
                >
                  Message
                </Label>
                <MdMessage className="absolute left-4 top-10 h-5 w-5 text-gray-400" />
                <Textarea
                  id="message"
                  name="Message"
                  required
                  placeholder="Write your message here"
                  className="pl-12 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-500"
                />
              </div>
              <Button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Follow Us
          </h3>
          <div className="flex justify-center space-x-6">
            <Link
              href="https://www.facebook.com/inofinityrnd"
              target="_blank"
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Facebook className="h-6 w-6 text-blue-600" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Twitter className="h-6 w-6 text-blue-600" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCflNnm0U1MZNv-_qNbrpPDQ"
              target="_blank"
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Youtube className="h-6 w-6 text-red-600" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link
              href="https://www.instagram.com/inofinityrnd/"
              target="_blank"
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Instagram className="h-6 w-6 text-pink-600" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://www.linkedin.com/company/inofinity-rnd-pvt-ltd/"
              target="_blank"
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Linkedin className="h-6 w-6 text-blue-600" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Inofinity Rnd Pvt Ltd. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-white hover:text-yellow-300 relative font-medium py-2 group"
    >
      {children}
      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-yellow-300 transform scale-x-0 transition-transform duration-300 ease-out origin-center group-hover:scale-x-100" />
    </Link>
  );
}

function SearchForm() {
  return (
    <form className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="pl-8 pr-4 py-2 w-full rounded-full border border-gray-300 bg-white bg-opacity-80 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
      />
      <button
        type="submit"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-yellow-400"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="md:hidden bg-gray-800 text-white py-4 px-4 rounded-lg shadow-lg fixed top-14 left-0 right-0 z-50"
    >
      <div className="flex flex-col space-y-4">
        <NavLink href="/" onClick={onClose}>
          HOME
        </NavLink>
        <NavLink href="/opportunities" onClick={onClose}>
          OPPORTUNITIES
        </NavLink>
        <NavLink href="/blog" onClick={onClose}>
          BLOG
        </NavLink>
        <SearchForm />
      </div>
    </motion.div>
  );
}