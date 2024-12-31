"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export function NewsSection() {
  const [latestBlogs, setLatestBlogs] = useState<
    { title: string; image: string; description: string; link: string }[]
  >([]);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("title, image, description, slug, date")
        .order("date", { ascending: false }) // Sort based on text date
        .limit(3);

      if (error) {
        console.error("Error fetching blogs:", error.message);
        return;
      }

      if (data) {
        const blogs = data.map((blog) => ({
          title: blog.title,
          image: blog.image,
          description: blog.description,
          link: `/blog/${blog.slug}`,
        }));
        setLatestBlogs(blogs);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <section className="py-24 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">NEWS</h2>
          <p className="text-zinc-400">From our blog</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestBlogs.map((item, index) => (
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
  );
}
