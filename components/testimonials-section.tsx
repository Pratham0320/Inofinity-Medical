// 'use client'

// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
// import Image from 'next/image';

// interface Testimonial {
//   id: number
//   rating: number
//   text: string
//   fullText: string
//   author: {
//     name: string
//     title: string
//     image: string
//   }
// }

// const testimonials: Testimonial[] = [
//   {
//     id: 1,
//     rating: 5,
//     text: "Inofinity's kiosks have transformed our patient check-ins. Efficiency and satisfaction have skyrocketed!",
//     fullText: "Inofinity's kiosks have completely revolutionized our patient check-in process. The efficiency gains we've seen are remarkable, with wait times reduced by over 60%. Patient satisfaction scores have soared, and our staff can now focus on providing better care instead of managing paperwork. It's been a game-changer for our hospital.",
//     author: {
//       name: "Dr. Ramesh Iyer",
//       title: "Medical Superintendent, Apollo Hospitals",
//       image: "/images/user-dummy.jpg"
//     },
//   },
//   {
//     id: 2,
//     rating: 5,
//     text: "Their solutions have streamlined our processes across multiple branches. Truly game-changing!",
//     fullText: "Implementing Inofinity's solutions across our multiple branches has been truly game-changing. We've seen a 40% increase in operational efficiency, significant cost savings, and a marked improvement in patient flow. The seamless integration across our network has enabled us to provide consistent, high-quality care regardless of location.",
//     author: {
//       name: "Dr. Anjali Gupta",
//       title: "Head of Administration, Max Healthcare",
//       image: "/images/user-dummy.jpg"
//     },
//   },
//   {
//     id: 3,
//     rating: 5,
//     text: "With Inofinity's kiosks, we're handling emergencies more effectively than ever before.",
//     fullText: "Inofinity's kiosks have dramatically improved our emergency response capabilities. We've reduced triage times by 35%, ensuring critical cases are identified and treated faster. The intuitive interface has made it easier for patients to provide accurate information, even in high-stress situations. This technology has undoubtedly helped us save more lives.",
//     author: {
//       name: "Dr. Rajesh Kumar",
//       title: "Director of Emergency Services, Fortis Hospitals",
//       image: "/images/user-dummy.jpg"
//     },
//   },
// ]

// export function TestimonialsSection() {
//   const [activeIndex, setActiveIndex] = useState(0)
//   const [isExpanded, setIsExpanded] = useState(false)

//   const nextTestimonial = () => {
//     setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
//     setIsExpanded(false)
//   }

//   const prevTestimonial = () => {
//     setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
//     setIsExpanded(false)
//   }

//   return (
//     <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
//         <h2 className="text-xl font-bold text-center mb-4 text-indigo-900 sm:text-2xl md:text-3xl lg:text-4xl">
//           Voices of Success
//         </h2>
//         <div className="relative">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={testimonials[activeIndex].id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//               className="bg-white rounded-2xl shadow-xl overflow-hidden p-4 sm:p-6 md:p-8"
//             >
//               <div>
//                 <div className="flex flex-wrap justify-between items-start mb-6">
//                   <div className="flex items-center w-full sm:w-auto">
//                     <Image
//                       src={testimonials[activeIndex].author.image}
//                       alt={testimonials[activeIndex].author.name}
//                       width={80}
//                       height={80}
//                       className="rounded-full mr-4"
//                     />
//                     <div>
//                       <h3 className="text-lg font-bold text-indigo-900 mb-1 sm:text-xl md:text-2xl lg:text-2xl">
//                         {testimonials[activeIndex].author.name}
//                       </h3>
//                       <p className="text-sm text-indigo-600 sm:text-base md:text-lg lg:text-lg">
//                         {testimonials[activeIndex].author.title}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex gap-1 mt-2 sm:mt-0">
//                     {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
//                       <Star key={i} className="w-5 h-5 text-yellow-400 fill-current sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-6 lg:h-6" />
//                     ))}
//                   </div>
//                 </div>
//                 <blockquote className="text-base text-gray-700 mb-4 leading-relaxed sm:text-lg md:text-xl lg:text-xl">
//                   "{isExpanded ? testimonials[activeIndex].fullText : testimonials[activeIndex].text}"
//                 </blockquote>
//               </div>
//               <motion.button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="w-full group"
//                 whileHover={{ backgroundColor: "rgba(238, 242, 255, 0.8)" }}
//               >
//                 <div className="bg-indigo-50 py-2 px-4 flex items-center justify-between transition-colors duration-200 group-hover:bg-indigo-100 sm:py-3 sm:px-6 md:py-4 md:px-8 lg:py-4 lg:px-8">
//                   <div className="w-8 h-8 rounded-full bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center transition-all duration-200 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-12 lg:h-12">
//                     <motion.div
//                       animate={{ rotate: isExpanded ? 180 : 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-8 lg:h-8"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <polyline points="6 9 12 15 18 9" />
//                       </svg>
//                     </motion.div>
//                   </div>
//                   <span className="text-indigo-600 font-medium">
//                     {isExpanded ? "Show Less" : "Read Full Review"}
//                   </span>
//                   <div className="w-12 h-12" />
//                 </div>
//               </motion.button>
//             </motion.div>
//           </AnimatePresence>

//           {/* Navigation Arrows - Adjusted Positioning */}
//           <button
//             onClick={prevTestimonial}
//             className="absolute  top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 rounded-full p-2 shadow-lg text-indigo-200 hover:bg-opacity-50 hover:text-indigo-600 transition-all duration-200"
//             aria-label="Previous testimonial"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <button
//             onClick={nextTestimonial}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 rounded-full p-2 shadow-lg text-indigo-200 hover:bg-opacity-50 hover:text-indigo-600 transition-all duration-200"
//             aria-label="Next testimonial"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </div>

//         {/* Bottom Indicators */}
//         <div className="flex justify-center mt-8 gap-3">
//           {testimonials.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setActiveIndex(index)
//                 setIsExpanded(false)
//               }}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === activeIndex
//                   ? "bg-indigo-600 w-6"
//                   : "bg-indigo-200 hover:bg-indigo-300"
//               }`}
//               aria-label={`View testimonial ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

