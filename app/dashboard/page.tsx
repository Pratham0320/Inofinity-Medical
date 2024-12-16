'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function DashboardPage() {
  // Initialize blogs state
  const [blogs, setBlogs] = useState([
    {
      id: '1',
      title: 'Delivered a session and practical demonstration on CPR',
      description: 'Delivered a session and practical demonstration on Cardio Pulmonary Resuscitation (CPR)...',
      image: '/images/Blog/blog1.jpg',
      slug: 'delivered-a-session-and-practical-demonstration-on-cpr',
      date: 'October 23, 2018',
    },
    {
      id: '2',
      title: 'World Health Organization appreciation',
      description: 'WHO started its first global medical innovation center in India...',
      image: '/images/Blog/blog2.jpeg',
      slug: 'world-health-organization-appreciation',
      date: 'October 23, 2018',
    },
  ]);

  const [newBlog, setNewBlog] = useState({
    id: '',
    title: '',
    description: '',
    image: null as File | null,
    slug: '',
    date: '',
  });

  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'image' && 'files' in e.target) {
      // Handle image input
      const file = e.target.files?.[0];
      if (file) {
        setNewBlog({ ...newBlog, image: file });
      }
    } else if ('value' in e.target) {
      // Handle text or textarea inputs
      setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add the new blog to the blogs state
    const updatedBlogs = [
      ...blogs,
      {
        ...newBlog,
        id: (blogs.length + 1).toString(),
        slug: newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), // Generate slug from title
        image: newBlog.image ? URL.createObjectURL(newBlog.image) : '/placeholder.svg', // Generate image preview URL
      },
    ];

    setBlogs(updatedBlogs);

    // Reset the form
    setNewBlog({
      id: '',
      title: '',
      description: '',
      image: null,
      slug: '',
      date: '',
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-primary">Dashboard</h1>

      {/* Manage Blogs Section */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add New Blog Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={newBlog.title}
                  onChange={handleBlogChange}
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newBlog.description}
                  onChange={handleBlogChange}
                  placeholder="Enter blog description"
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleBlogChange}
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newBlog.date}
                  onChange={handleBlogChange}
                />
              </div>
              <Button type="submit">Add Blog</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
