import { useState, useEffect } from "react";
import { UploadButton } from '@/utils/uploadthing';

export default function ImageTab() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/hero");
        const data = await response.json();
        if (data.images) {
          setImages(data.images);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
    fetchImages();
  }, []);

  const handleClientUploadComplete = async (res: { url: string }[]) => {
    if (res && res[0]) {
      const newImageUrl = res[0].url;
      try {
        const token = localStorage.getItem("token")?.replace(/\n/g, '');
        const authToken = "Bearer"+" "+ token;
        await fetch("/api/hero", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify({ images: [newImageUrl] }),
        });
        setImages((prev) => [...prev, newImageUrl]);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleUpdate = async (index: number, res: { url: string }[]) => {
    if (res && res[0]) {
      const updatedImageUrl = res[0].url;
      try {
        const token = localStorage.getItem("token");
        await fetch("/api/hero", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify({ index, image: updatedImageUrl }),
        });
        setImages((prev) =>
          prev.map((img, i) => (i === index ? updatedImageUrl : img))
        );
      } catch (error) {
        console.error("Error updating image:", error);
      }
    }
  };

  const handleDelete = async (image: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/hero", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ image }),
      });
      setImages((prev) => prev.filter((img) => img !== image));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Hero Images</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
        <div className="inline-block">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleClientUploadComplete}
            onUploadError={(error: Error) => {
              alert(`Image upload failed: ${error.message}`);
            }}
            appearance={{
              button: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
              container: "min-w-[200px]"
            }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Current Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <img 
                src={image} 
                alt={`Hero ${index}`} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleDelete(image)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <div className="inline-block">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => handleUpdate(index, res)}
                    onUploadError={(error: Error) => {
                      alert(`Image upload failed: ${error.message}`);
                    }}
                    appearance={{
                      button: "px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors",
                      container: "min-w-[120px]"
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}