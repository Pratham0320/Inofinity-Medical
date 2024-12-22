'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { UploadButton } from '@/utils/uploadthing';
import axios from 'axios';

export default function DashboardPage() {
  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    date: '',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newBlog.title || !newBlog.description || !newBlog.image || !newBlog.date) {
      alert('Please fill out all fields and upload an image.');
      return;
    }

    try {
      const response = await axios.post('/api/blog', newBlog);
      alert('Blog added successfully!');
      console.log(response.data);

      setNewBlog({
        title: '',
        description: '',
        image: '',
        date: '',
        content: '',
      });
      setImageUrl('');
    } catch (error) {
      console.error('Error submitting blog:', error);
      alert('Failed to submit the blog. Please try again.');
    }
  };

  const clearImage = () => {
    setImageUrl('');
    setNewBlog(prev => ({ ...prev, image: '' }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-primary">Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Manage Blogs</CardTitle>
        </CardHeader>
        <CardContent>
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
                {!imageUrl ? (
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        setNewBlog((prev) => ({ ...prev, image: res[0].url }));
                        setImageUrl(res[0].url);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      alert(`Image upload failed: ${error.message}`);
                    }}
                  />
                ) : (
                  <div className="mt-2 space-y-2">
                    <Label>Image URL:</Label>
                    <Input 
                      value={imageUrl} 
                      readOnly 
                      className="mt-1"
                    />
                    <img 
                      src={imageUrl} 
                      alt="Uploaded" 
                      className="mt-2 max-w-xs max-h-48 object-cover"
                    />
                    <div className="flex space-x-2">
                      <Button 
                        type="button"
                        className='bg-red-500 hover:bg-red-600'
                        onClick={clearImage}
                      >
                        Clear Image
                      </Button>
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res && res[0]) {
                            setNewBlog((prev) => ({ ...prev, image: res[0].url }));
                            setImageUrl(res[0].url);
                          }
                        }}
                        onUploadError={(error: Error) => {
                          alert(`Image upload failed: ${error.message}`);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={newBlog.content}
                  onChange={handleBlogChange}
                  placeholder="Enter blog content"
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
              <Button type="submit" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Add Blog'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}