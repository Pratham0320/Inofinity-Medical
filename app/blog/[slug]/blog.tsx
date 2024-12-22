/** @format */

"use client";

import Image from "next/image";
import { blogsData } from "@/app/blogs-data";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	Facebook,
	Twitter,
	Youtube,
	Instagram,
	Linkedin,
	Mail,
} from "lucide-react";
import { MdWhatsapp } from "react-icons/md";
import Markdown from "react-markdown";

export default function BlogPage({
	blog,
}: {
	blog: Record<string, any>;
}) {
	const [progress, setProgress] = useState(0);
	const { title } = blog;
	console.log("title " + title);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const scrollHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progressPercentage = (scrollTop / scrollHeight) * 100;
			setProgress(progressPercentage);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Current Blog URL
	const currentBlogUrl = `${
		typeof window !== "undefined" ? window.location.origin : ""
	}/blog/${blog.slug}`;
	const encodedTitle = encodeURIComponent(blog.title);

	return (
		<div className="bg-gray-50 min-h-screen">
			{/* Reading Progress Bar */}
			<div
				className="fixed top-0 left-0 h-1 z-50"
				style={{
					width: `${progress}%`,
					background: "linear-gradient(to right, #3b82f6, #06b6d4)",
				}}></div>

			{/* Hero Section */}
			<div className="bg-gray-100">
				{/* Title Section */}
				<div className="bg-blue-600 text-white py-8 px-4 text-center">
					<h1 className="text-3xl sm:text-5xl font-bold leading-tight">
						{blog.title}
					</h1>
					<p className="mt-2 text-gray-200 text-sm">{blog.date}</p>
				</div>

				{/* Spacing and Image Section */}
				<div className="relative w-full max-w-4xl mx-auto mt-8 mb-8">
					<div className="w-full aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
						<Image
							src={blog.image}
							alt={blog.title}
							layout="fill"
							objectFit="cover"
							className="w-full h-full"
						/>
					</div>
				</div>
			</div>

			{/* Content and Sidebar */}
			<div className="container mx-auto px-6 lg:px-24 py-12 flex flex-col lg:flex-row gap-8">
				{/* Main Blog Content */}
				<article className="w-full lg:w-3/4 bg-white p-8 rounded-lg shadow-lg">
					<div className="prose lg:prose-lg mx-auto text-gray-700">
						<Markdown>{blog.content}</Markdown>
					</div>

					{/* Share Blog Section */}
					<section className="mt-8">
						<h3 className="text-lg font-semibold mb-4">
							Share this blog
						</h3>
						<div className="flex space-x-6">
							{/* Facebook Share */}
							<Link
								href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
									currentBlogUrl
								)}&quote=${encodeURIComponent(
									`Check out this amazing blog: "${blog.title}"`
								)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:scale-110 transition-transform">
								<Facebook className="h-8 w-8 text-blue-600" />
							</Link>

							{/* Twitter Share */}
							<Link
								href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
									currentBlogUrl
								)}&text=${encodeURIComponent(
									`Check out this blog: "${blog.title}"`
								)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:scale-110 transition-transform">
								<Twitter className="h-8 w-8 text-blue-400" />
							</Link>

							{/* LinkedIn Share */}
							<Link
								href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
									currentBlogUrl
								)}&title=${encodeURIComponent(
									blog.title
								)}&summary=${encodeURIComponent(
									"I found this interesting blog. Check it out!"
								)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:scale-110 transition-transform">
								<Linkedin className="h-8 w-8 text-blue-700" />
							</Link>

							{/* WhatsApp Share */}
							<Link
								href={`https://wa.me/?text=${encodeURIComponent(
									`Check out this blog: "${blog.title}"\n${currentBlogUrl}`
								)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:scale-110 transition-transform">
								<MdWhatsapp className="h-8 w-8 text-green-500" />
							</Link>

							{/* Email Share */}
							<Link
								href={`mailto:?subject=${encodeURIComponent(
									`Don't Miss This Blog: ${blog.title}`
								)}&body=${encodeURIComponent(
									`I found this interesting blog:\n\n"${blog.title}"\n${currentBlogUrl}`
								)}`}
								className="hover:scale-110 transition-transform">
								<Mail className="h-8 w-8 text-red-700" />
							</Link>
						</div>
					</section>
				</article>

				{/* Sidebar - Related Posts */}
				{/* <aside className="w-full lg:w-[50%] xl:w-[45%]">
					<h3 className="text-xl font-semibold mb-6">
						Related Posts
					</h3>
					<div className="space-y-4">
						{relatedBlogs.map((related) => (
							<Link
								key={related.id}
								href={`/blog/${related.slug}`}
								className="flex bg-white shadow-md rounded-lg hover:shadow-lg transition-all">
								<div className="relative w-24 h-24 flex-shrink-0 rounded-l-lg">
									<Image
										src={related.image}
										alt={related.title}
										fill
										className="object-cover rounded-l-lg"
									/>
								</div>
								<div className="p-4">
									<h4 className="font-semibold text-gray-800 hover:text-blue-500 mb-1">
										{related.title}
									</h4>
									<p className="text-sm text-gray-500">
										{related.date}
									</p>
								</div>
							</Link>
						))}
					</div>
				</aside> */}
			</div>

			{/* Footer */}
			<footer className="bg-slate-900 text-white py-12 mt-16">
				<div className="container mx-auto px-4">
					{/* Grid for Footer Content */}
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 text-center md:text-left">
						{/* Follow Us Section */}
						<div>
							<h3 className="text-2xl font-bold mb-6">
								Follow Us
							</h3>
							<div className="flex justify-center md:justify-start space-x-4">
								<Link
									href="https://www.facebook.com/inofinityrnd"
									target="_blank"
									aria-label="Facebook">
									<Facebook className="h-6 w-6 hover:text-blue-500 transition-transform transform hover:scale-110" />
								</Link>
								<Link
									href="https://twitter.com"
									target="_blank"
									aria-label="Twitter">
									<Twitter className="h-6 w-6 hover:text-blue-400 transition-transform transform hover:scale-110" />
								</Link>
								<Link
									href="https://www.youtube.com"
									target="_blank"
									aria-label="YouTube">
									<Youtube className="h-6 w-6 hover:text-red-600 transition-transform transform hover:scale-110" />
								</Link>
								<Link
									href="https://www.instagram.com"
									target="_blank"
									aria-label="Instagram">
									<Instagram className="h-6 w-6 hover:text-pink-500 transition-transform transform hover:scale-110" />
								</Link>
								<Link
									href="https://www.linkedin.com"
									target="_blank"
									aria-label="LinkedIn">
									<Linkedin className="h-6 w-6 hover:text-blue-600 transition-transform transform hover:scale-110" />
								</Link>
							</div>
						</div>

						{/* Contact Section */}
						<div>
							<h3 className="text-2xl font-bold mb-6">Contact</h3>
							<ul className="space-y-3 text-gray-400">
								<li>
									<Link
										href="mailto:info@inofinityrnd.com"
										className="hover:text-white">
										Email: info@inofinityrnd.com
									</Link>
								</li>
								<li>
									<div>
										<Link
											href="tel:+917978597090"
											className="hover:text-white">
											Phone: +91 7978597090
										</Link>
									</div>
									<div className="pl-14">
										<Link
											href="tel:+918249634803"
											className="hover:text-white">
											+91 8249634803
										</Link>
									</div>
								</li>
								<li>
									<span className="hover:text-white">
										Address: O-HUB (Startup Odisha),
										Chandaka Industrial Estate, Bhubaneswar
									</span>
								</li>
							</ul>
						</div>

						{/* Newsletter Section */}
						<div>
							<h3 className="text-2xl font-bold mb-6">
								Subscribe to Our Newsletter
							</h3>
							<form className="flex items-center justify-center md:justify-start">
								<input
									type="email"
									placeholder="Enter your email"
									className="px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<button
									type="submit"
									className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition">
									Subscribe
								</button>
							</form>
						</div>
					</div>

					{/* Divider */}
					<div className="border-t border-gray-700 mt-8 pt-4 text-center">
						<p className="text-gray-400 text-sm">
							&copy; {new Date().getFullYear()} Inofinity Rnd Pvt
							Ltd. All Rights Reserved.
						</p>
					</div>
				</div>
			</footer>

			{/* Back to Blogs Button */}
			<div className="fixed bottom-8 right-8">
				<Link href="/blog" legacyBehavior>
					<a className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all">
						← Back to Blogs
					</a>
				</Link>
			</div>
		</div>
	);
}
