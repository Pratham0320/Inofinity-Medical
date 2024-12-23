"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
	Search,
	Menu,
	X,
	Facebook,
	Twitter,
	Youtube,
	Instagram,
	Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
export const revalidate = 300
// import { blogsData } from '@/app/blogs-data';

interface BlogPost {
	id: string;
	title: string;
	description: string;
	image: string;
	content: string;
	slug: string;
	date: string;
}

export default function BlogPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [isScrolled, setIsScrolled] = useState(false);
	const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [blogsData, setBlogsData] = useState<BlogPost[]>([]);
	const pathname = usePathname();
	const backToTopRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			setIsScrolled(scrollPosition > 50);
			if (scrollPosition > 300) {
				if (backToTopRef.current)
					backToTopRef.current.style.display = "block";
			} else {
				if (backToTopRef.current)
					backToTopRef.current.style.display = "none";
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await fetch("/api/blog", { cache: 'no-store' });
				if (!response.ok) throw new Error("Failed to fetch blogs data");
				const data: BlogPost[] = await response.json();
				setBlogsData(data);
			} catch (error) {
				console.error("Error fetching blogs:", error);
			}
		};

		fetchBlogs();
	}, []);

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const handleOpenPost = (post: BlogPost) => {
		setSelectedPost(post);
		setIsModalOpen(true);
	};

	const handleClosePost = () => {
		setSelectedPost(null);
		setIsModalOpen(false);
	};

	const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Perform search logic here (e.g., redirect to search results page)
		console.log("Searching for:", searchQuery);
	};

	const navVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	const linkVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			{/* Navigation */}
			<motion.nav
				variants={navVariants}
				initial="hidden"
				animate="visible"
				className={`fixed top-3 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? "bg-black/20 text-gray-800 h-14 rounded-full shadow-lg backdrop-blur-lg"
						: "bg-transparent text-white h-14"
				}`}>
				<div className="container mx-auto px-4 h-full flex items-center justify-between">
					<Link href="/" className="flex items-center">
						<Image
							src="/images/logo_PNG.png"
							alt="Inofinity Logo"
							width={isScrolled ? 144 : 192}
							height={isScrolled ? 48 : 64}
							className="h-auto transition-all duration-300"
							priority
						/>
					</Link>
					<div className="flex items-center">
						<motion.div
							variants={linkVariants}
							className="hidden md:flex items-center space-x-6">
							<NavLink href="/">HOME</NavLink>
							<NavLink href="/contact">CONTACT</NavLink>
							<NavLink href="/blog">BLOG</NavLink>
							<SearchForm
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onSubmit={handleSearchSubmit}
							/>
						</motion.div>
						<motion.button
							variants={linkVariants}
							className={`md:hidden p-2 rounded-full ${
								isScrolled
									? "text-gray-800 bg-white/20 backdrop-blur-lg hover:bg-white/40"
									: "text-white hover:bg-black/20"
							} transition-colors`}
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							aria-label="Toggle menu"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</motion.button>
					</div>
				</div>
				<MobileMenu
					isOpen={isMenuOpen}
					onClose={() => setIsMenuOpen(false)}
				/>
			</motion.nav>

			{/* Hero Section */}
			<section className="relative h-[40vh] min-h-[400px] w-full">
				<Image
					src="/images/Blog/hero.png"
					alt="Hero Image"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
				<div className="absolute inset-0 flex items-center justify-center text-center text-white">
					<div className="container px-4">
						<motion.h1
							className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}>
							Latest Insights in Medical Technology
						</motion.h1>
						<motion.p
							className="mb-8 text-lg text-gray-200 sm:text-xl"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}>
							Stay informed about the latest advancements and
							breakthroughs in medical technology.
						</motion.p>
					</div>
				</div>
			</section>

			{/* Blog Posts Section */}
			<section className="py-16 sm:py-24 bg-slate-50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
						Our Latest Blogs
					</h2>
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{blogsData.map((post, index) => (
							<motion.div
								key={post.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}>
								<Link
									href={`/blog/${post.slug}`}
									legacyBehavior>
									<div className="group block transform transition-transform duration-300 hover:scale-105 cursor-pointer">
										{/* Card Container */}
										<div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
											{/* Image Section */}
											<div className="relative h-48 w-full">
												<Image
													src={post.image}
													alt={post.title}
													fill
													className="object-cover group-hover:scale-105 transition-transform duration-300"
												/>
											</div>
											{/* Content Section */}
											<div className="p-6">
												<h3 className="text-xl font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-500">
													{post.title}
												</h3>
												<p className="text-gray-600 text-sm mb-4 line-clamp-3">
													{post.description}
												</p>
												<p className="text-gray-500 text-sm">
													{post.date}
												</p>
											</div>
										</div>
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Back to Top Button */}
			<button
				ref={backToTopRef}
				onClick={handleScrollToTop}
				className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hidden">
				Back to Top
			</button>

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
		</div>
	);
}

function NavLink({
	href,
	children,
	external,
	onClick,
	className,
}: {
	href: string;
	children: React.ReactNode;
	external?: boolean;
	onClick?: () => void;
	className?: string;
}) {
	return (
		<Link
			href={href}
			className={`relative font-medium py-2 group ${
				external
					? "text-blue-400 hover:text-blue-300"
					: "text-white hover:text-yellow-300"
			} ${className}`}
			onClick={onClick}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}>
			{children}
			<span className="absolute left-0 right-0 bottom-0 h-0.5 bg-yellow-300 transform scale-x-0 transition-transform duration-300 ease-out origin-center group-hover:scale-x-100" />
		</Link>
	);
}

function SearchForm({
	value,
	onChange,
	onSubmit,
}: {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
	return (
		<form onSubmit={onSubmit} className="relative">
			<input
				type="text"
				placeholder="Search..."
				className="pl-8 pr-4 py-2 w-full rounded-full border border-gray-300 bg-white bg-opacity-80 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
				value={value}
				onChange={onChange}
			/>
			<button
				type="submit"
				className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-yellow-400">
				<Search className="h-5 w-5" />
			</button>
		</form>
	);
}

function MobileMenu({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			className="md:hidden bg-gray-800 text-white py-4 px-4 rounded-lg shadow-lg fixed top-14 left-0 right-0 z-50">
			<div className="flex flex-col space-y-4">
				<NavLink
					href="/"
					onClick={() => {
						onClose();
					}}
					className="text-white hover:text-yellow-300">
					HOME
				</NavLink>
				<NavLink href="/contact" onClick={onClose}>
					CONTACT US
				</NavLink>
				<NavLink
					href="/blog"
					onClick={onClose}
					className="text-white hover:text-yellow-300">
					BLOG
				</NavLink>
				<SearchForm
					value={""}
					onChange={() => {}}
					onSubmit={() => {}}
				/>
			</div>
		</motion.div>
	);
}
