"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Briefcase,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import ThankYouPage from "../thank-you/page";

export default function Opportunities() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<string | null>(null);
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
      setActiveForm(null);
      // Remove the query parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  if (isSubmitted) {
    return <ThankYouPage />;
  }

  const renderForm = () => {
    switch (activeForm) {
      case "job":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 md:p-8 rounded-md shadow-md mt-8"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              Apply for Full-Time Role
            </h2>
            <form
              action="https://formsubmit.co/info@inofinityrnd.com"
              method="POST"
              className="space-y-4"
            >
              <input
                type="hidden"
                name="_subject"
                value="New Job Application"
              />
              <input
                type="hidden"
                name="_next"
                value="https://www.inofinityrnd.com/opportunities?success=true"
              />
              <input type="hidden" name="_captcha" value="false" />
              <div>
                <Label htmlFor="job-name">Full Name</Label>
                <Input
                  id="job-name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="job-email">Email</Label>
                <Input
                  id="job-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="job-position">Position</Label>
                <Input
                  id="job-position"
                  name="position"
                  placeholder="Position you're applying for"
                  required
                />
              </div>
              <div>
                <Label htmlFor="job-experience">Years of Experience</Label>
                <Input
                  id="job-experience"
                  name="experience"
                  type="number"
                  min="0"
                  placeholder="Years of experience"
                  required
                />
              </div>
              <div>
                <Label htmlFor="job-skills">Key Skills</Label>
                <Textarea
                  id="job-skills"
                  name="skills"
                  placeholder="List your key skills"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Application
              </Button>
            </form>
          </motion.div>
        );
      case "internship":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 md:p-8 rounded-md shadow-md mt-8"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              Apply for Internship
            </h2>
            <form
              action="https://formsubmit.co/info@inofinityrnd.com"
              method="POST"
              className="space-y-4"
            >
              <input
                type="hidden"
                name="_subject"
                value="New Internship Application"
              />
              <input
                type="hidden"
                name="_next"
                value="https://www.inofinityrnd.com/opportunities?success=true"
              />
              <input type="hidden" name="_captcha" value="false" />
              <div>
                <Label htmlFor="intern-name">Full Name</Label>
                <Input
                  id="intern-name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="intern-email">Email</Label>
                <Input
                  id="intern-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="intern-university">University/College</Label>
                <Input
                  id="intern-university"
                  name="university"
                  placeholder="Your university/college name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="intern-course">Course of Study</Label>
                <Input
                  id="intern-course"
                  name="course"
                  placeholder="Your current course/major"
                  required
                />
              </div>
              <div>
                <Label htmlFor="intern-skills">Relevant Skills</Label>
                <Textarea
                  id="intern-skills"
                  name="skills"
                  placeholder="List your relevant skills"
                  required
                />
              </div>
              <div>
                <Label htmlFor="intern-duration">Preferred Duration</Label>
                <select
                  id="intern-duration"
                  name="duration"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  required
                >
                  <option value="">Select duration</option>
                  <option value="2">2 months</option>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                </select>
              </div>
              <Button type="submit" className="w-full">
                Submit Application
              </Button>
            </form>
          </motion.div>
        );
      case "idea":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 md:p-8 rounded-md shadow-md mt-8"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              Pitch Your Idea
            </h2>
            <form
              action="https://formsubmit.co/info@inofinityrnd.com"
              method="POST"
              className="space-y-4"
            >
              <input type="hidden" name="_subject" value="New Idea Pitch" />
              <input
                type="hidden"
                name="_next"
                value="https://www.inofinityrnd.com/opportunities?success=true"
              />
              <input type="hidden" name="_captcha" value="false" />
              <div>
                <Label htmlFor="idea-name">Full Name</Label>
                <Input
                  id="idea-name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="idea-email">Email</Label>
                <Input
                  id="idea-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="idea-title">Idea Title</Label>
                <Input
                  id="idea-title"
                  name="idea_title"
                  placeholder="Give your idea a title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="idea-description">Description</Label>
                <Textarea
                  id="idea-description"
                  name="idea_description"
                  placeholder="Describe your idea in detail..."
                  className="min-h-[150px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="idea-benefits">Expected Benefits</Label>
                <Textarea
                  id="idea-benefits"
                  name="idea_benefits"
                  placeholder="What are the potential benefits of your idea?"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Idea
              </Button>
            </form>
          </motion.div>
        );
      default:
        return null;
    }
  };

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
              <NavLink href="/contact">CONTACT</NavLink>
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
      <div className="relative h-[300px] md:h-[500px]">
        <img
          src="/images/opportunities-banner.jpg"
          alt="Opportunities Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center px-4">
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-white font-extrabold tracking-wide leading-tight text-3xl md:text-5xl lg:text-6xl"
            >
              Unlock Your <span className="text-blue-400">Future</span> with Us
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-white font-bold tracking-wide leading-tight mt-4 text-xl md:text-3xl lg:text-4xl"
            >
              Explore Career Opportunities
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Opportunities Section */}
      <div className="py-12 md:py-16 px-4 md:px-6 max-w-screen-xl mx-auto">
        <h1 className="opportunities-page-heading">
          Opportunities at Inofinity
        </h1>
        <p className="text-base md:text-lg text-center text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto">
          Be a part of the innovation in healthcare. Explore full-time roles,
          internships, or pitch your ideas to collaborate with us and shape the
          future of healthcare technology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <Button
            onClick={() => {
              setActiveForm(activeForm === "job" ? null : "job");
              setIsSubmitted(false);
            }}
            className={`opp-circle-container bg-white hover:bg-gray-50 border shadow-sm ${
              activeForm === "job" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="opp-icon-circle">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="opp-circle-title">Full-Time Roles</h3>
            <p className="opp-circle-text">
              Explore diverse career opportunities and grow with us.
            </p>
          </Button>

          <Button
            onClick={() => {
              setActiveForm(activeForm === "internship" ? null : "internship");
              setIsSubmitted(false);
            }}
            className={`opp-circle-container bg-white hover:bg-gray-50 border shadow-sm ${
              activeForm === "internship" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="opp-icon-circle">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="opp-circle-title">Internships</h3>
            <p className="opp-circle-text">
              Kickstart your career with hands-on experience.
            </p>
          </Button>

          <Button
            onClick={() => {
              setActiveForm(activeForm === "idea" ? null : "idea");
              setIsSubmitted(false);
            }}
            className={`opp-circle-container bg-white hover:bg-gray-50 border shadow-sm ${
              activeForm === "idea" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="opp-icon-circle">
              <Lightbulb className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="opp-circle-title">Idea Pitching</h3>
            <p className="opp-circle-text">
              Share your innovative ideas and collaborate with us.
            </p>
          </Button>
        </div>

        {/* Form Display */}
        {renderForm()}

        {/* Follow Us Section */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Follow Us
          </h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="https://www.facebook.com/inofinityrnd"
              target="_blank"
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Facebook className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Twitter className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCflNnm0U1MZNv-_qNbrpPDQ"
              target="_blank"
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Youtube className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
            </Link>
            <Link
              href="https://www.instagram.com/inofinityrnd/"
              target="_blank"
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Instagram className="h-5 w-5 md:h-6 md:w-6 text-pink-600" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/inofinity-rnd-pvt-ltd/"
              target="_blank"
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Linkedin className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </Link>
          </div>
        </div>

        {/* Footer */}
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
        <NavLink href="/contact" onClick={onClose}>
          CONTACT
        </NavLink>
        <NavLink href="/blog" onClick={onClose}>
          BLOG
        </NavLink>
        <SearchForm />
      </div>
    </motion.div>
  );
}