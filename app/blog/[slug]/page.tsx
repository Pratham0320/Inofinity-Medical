import { blogsData } from '@/app/blogs-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Find the blog post by slug
  const blog = blogsData.find((blog) => blog.slug === params.slug);

  // If no blog is found, return a 404
  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="bg-gray-100 dark:bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-8">{blog.date}</p>
        <div className="relative w-full h-96 mb-8">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="prose max-w-none prose-lg prose-blue dark:prose-invert">
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
}
