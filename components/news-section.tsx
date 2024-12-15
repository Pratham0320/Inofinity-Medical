import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const newsItems = [
  {
    title: "Delivered a session and practical demonstration on CPR",
    image: "/images/Blog/blog1.jpg",
    description: "Delivered a session and practical demonstration on Cardio Pulmonary Resuscitation ( CPR) for victims of Cardiac arrest of any origin like Heart attack, electrocutions, lightening injury, food or drug allergies and fire or chemical smoke Inhalation, during \" NIRMAN \" a technical hackathon conducted by Silicon Institute of Technology. About 300 engineering and management students…",
    link: "https://inofinityrnd.com/index.php/2018/10/23/donec-iaculis-gravida-nulla/"
  },
  {
    title: "World Health Organization appreciation",
    image: "/images/Blog/blog2.jpeg",
    description: "On the eve of World health day World Health Organization, started it's first WHO global medical innovation center at India. Happy to share that Two of my innovations were appreciated by Ms Louise Agersnap, Head medical innovation Hub, WHO Geneva. She informed me that I have seen CPR infront of me to my first order…",
    link: "https://inofinityrnd.com/index.php/2018/10/23/etiam-bibendum-elit-eget-erat/"
  },
  {
    title: "Train the trainers in medical simulation",
    image: "/images/Blog/blog3.jpeg",
    description: "A Herculean task \" Train the trainers in medical simulation\" started today at KAABEEL Simulation and skill upgradation center . Aim is to create at least 100 trainers for 28 simulation modules at KIMS within next 2 years. Focus is on developing a simulation based pedagogy and innovatively approached simulation-based faculty development program to fill…",
    link: "https://inofinityrnd.com/index.php/2018/10/23/praesent-id-justo-in-neque-elementum-ultrices/"
  }
]

export function NewsSection() {
  return (
    <section className="py-24 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">NEWS</h2>
          <p className="text-zinc-400">From our blog</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="group bg-zinc-900 rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-zinc-400 mb-6 line-clamp-3">
                  {item.description}
                </p>
                <Button
                  variant="outline"
                  className="bg-white text-black hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
                >
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
