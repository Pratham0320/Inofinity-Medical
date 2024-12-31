"use client";

import { ContactNavigation } from "@/components/contact-navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import { MdEmail, MdPerson, MdMessage } from "react-icons/md";

export default function Contact() {
  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        className="relative"
        style={{
          width: "1440px", // Fixed width
          minHeight: "100vh",
        }}
      >
        <ContactNavigation />

        {/* Banner Section */}
        <div
          className="relative"
          style={{
            height: "500px",
            width: "100%",
          }}
        >
          <img
            src="/images/contact-banner.jpeg"
            alt="Healthcare banner"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
            style={{
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "1.5",
            }}
          >
            <h1 className="text-white text-center">
              Every <span style={{ color: "red" }}>life matters</span>, <br />
              innovation in healthcare
            </h1>
          </div>
        </div>

        {/* SVG Design */}
        <div className="relative" style={{ width: "100%" }}>
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
        <div
          className="py-16 px-6"
          style={{
            width: "100%",
            fontSize: "16px",
          }}
        >
          <h1
            className="text-center"
            style={{
              fontSize: "36px",
              fontWeight: "700",
              marginBottom: "24px",
            }}
          >
            Contact Us
          </h1>
          <p
            className="text-center"
            style={{
              fontSize: "18px",
              marginBottom: "48px",
            }}
          >
            We’re here to assist you with your queries. Reach out to us, and
            let’s work together for better healthcare solutions.
          </p>

          <div className="grid grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div
              className="p-6 rounded-md shadow-sm bg-white h-full"
              style={{ fontSize: "16px", lineHeight: "1.5" }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                Have Questions?
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  marginBottom: "24px",
                }}
              >
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
                  <h3 className="text-lg font-bold text-gray-800">Our Office</h3>
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

            {/* Contact Form */}
            <div
              className="p-6 bg-white rounded-md shadow-md"
              style={{
                fontSize: "16px",
                lineHeight: "1.5",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  marginBottom: "24px",
                }}
              >
                Send Us a Message
              </h2>
              <form
                action="https://formsubmit.co/info@inofinityrnd.com"
                method="POST"
              >
                <input
                  type="hidden"
                  name="_next"
                  value="https://inofinity.vercel.app/contact"
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
    </div>
  );
}
