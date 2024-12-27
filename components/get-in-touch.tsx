import React from "react";
import { MdEmail, MdPerson, MdPhone, MdMessage, MdSend } from "react-icons/md";

export function GetInTouch() {
  return (
    <section id="get-in-touch" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12 -mt-16 md:-mt-20 pt-16 md:pt-20">
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="w-full h-full">
            {/* Updated Google Map Embed */}
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  className="gmap_iframe w-full h-[400px] rounded-lg shadow-lg"
                  width="100%"
                  frameBorder="0"
                  scrolling="no"
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=SAI PARADISE- Daruthenga&amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              </div>
              <style>
                {`
                  .mapouter { position: relative; text-align: right; width: 100%; height: 400px; }
                  .gmap_canvas { overflow: hidden; background: none!important; width: 100%; height: 400px; }
                  .gmap_iframe { height: 400px!important; }
                `}
              </style>
            </div>
          </div>

          <form
            className="w-full space-y-6"
            action="https://formsubmit.co/info@inofinityrnd.com"
            method="POST"
          >
            <input
              type="hidden"
              name="_next"
              value="https://your-website.com/thanks"
            />
            <input
              type="hidden"
              name="_subject"
              value="New contact form submission"
            />

            <div className="relative">
              <MdPerson className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                name="name"
                placeholder="Your Name"
                className="pl-12 bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-12 text-base w-full rounded-md transition duration-200"
                required
              />
            </div>

            <div className="relative">
              <MdEmail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="pl-12 bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-12 text-base w-full rounded-md transition duration-200"
                required
              />
            </div>

            <div className="relative">
              <MdPhone className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                className="pl-12 bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-12 text-base w-full rounded-md transition duration-200"
              />
            </div>

            <div className="relative">
              <MdMessage className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <textarea
                name="message"
                placeholder="Your Message"
                className="pl-12 pt-3 bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 min-h-[150px] text-base w-full rounded-md transition duration-200"
                required
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <MdSend className="mr-2 h-5 w-5" />
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
