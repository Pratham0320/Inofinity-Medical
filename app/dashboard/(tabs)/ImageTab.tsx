import { useState, useEffect } from "react";
import { UploadButton } from "@/utils/uploadthing";

type ImageWithTagline = {
  url: string;
  tagline: string;
};

export default function ImageTab() {
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [bestImages, setBestImages] = useState<ImageWithTagline[]>([]);
  const [newTagline, setNewTagline] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTagline, setEditTagline] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        // Fetch Hero Images
        const heroResponse = await fetch("/api/hero");
        const heroData = await heroResponse.json();
        if (heroData.images) {
          setHeroImages(heroData.images);
        }

        // Fetch Our Best Images
        const bestResponse = await fetch("/api/our-best");
        const bestData = await bestResponse.json();
        if (bestData.items) {
          setBestImages(bestData.items);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
    fetchImages();
  }, []);

  const handleUpload = async (
    endpoint: string,
    imagesSetter: Function,
    newImageUrl: string
  ) => {
    try {
      const token = localStorage.getItem("token")?.replace(/\n/g, "");
      const authToken = "Bearer " + token;

      if (endpoint === "/api/our-best") {
        if (!newTagline) {
          alert("Please enter a tagline for the image");
          return;
        }

        // If it's a new image (no index selected)
        if (selectedIndex === null) {
          const newImages = [
            ...bestImages,
            { url: newImageUrl, tagline: newTagline },
          ];
          if (newImages.length > 9) {
            alert("Cannot store more than 9 items");
            return;
          }

          await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: authToken,
            },
            body: JSON.stringify({ images: newImages }),
          });
          setBestImages(newImages);
        } else {
          // Update existing image at selected index
          await fetch(endpoint, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: authToken,
            },
            body: JSON.stringify({
              index: selectedIndex,
              url: newImageUrl,
              tagline: newTagline,
            }),
          });
          setBestImages((prev) =>
            prev.map((img, i) =>
              i === selectedIndex
                ? { url: newImageUrl, tagline: newTagline }
                : img
            )
          );
        }
        setNewTagline("");
        setSelectedIndex(null);
      } else {
        // Hero images handling
        await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify({ images: [newImageUrl] }),
        });
        imagesSetter((prev: string[]) => [...prev, newImageUrl]);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDelete = async (
    endpoint: string,
    imagesSetter: Function,
    image: string | ImageWithTagline,
    index: number
  ) => {
    try {
      const token = localStorage.getItem("token");

      if (endpoint === "/api/our-best") {
        await fetch(endpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({ index }),
        });
        setBestImages((prev) => prev.filter((_, i) => i !== index));
      } else {
        const imageUrl = typeof image === "string" ? image : image.url;
        await fetch(endpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({ image: imageUrl }),
        });
        imagesSetter((prev: string[]) =>
          prev.filter((img) => img !== imageUrl)
        );
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleEditTagline = async (index: number) => {
    try {
      const token = localStorage.getItem("token");
      const image = bestImages[index];

      await fetch("/api/our-best", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          index,
          url: image.url,
          tagline: editTagline,
        }),
      });

      setBestImages((prev) =>
        prev.map((img, i) =>
          i === index ? { ...img, tagline: editTagline } : img
        )
      );
      setEditingId(null);
      setEditTagline("");
    } catch (error) {
      console.error("Error updating tagline:", error);
    }
  };

  const startEditing = (index: number, currentTagline: string) => {
    setEditingId(index);
    setEditTagline(currentTagline);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Images</h1>

      {/* Hero Images Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Hero Images</h2>
        <div className="inline-block">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) =>
              handleUpload("/api/hero", setHeroImages, res[0]?.url)
            }
            onUploadError={(error: Error) => {
              alert(`Image upload failed: ${error.message}`);
            }}
            appearance={{
              button:
                "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
              container: "min-w-[200px]",
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {heroImages.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={image}
                alt={`Hero ${index}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <button
                onClick={() =>
                  handleDelete("/api/hero", setHeroImages, image, index)
                }
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Our Best Images Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Our Best Images (9 IMAGES)</h2>
        <div className="space-y-4 flex flex-row items-center">
          <div className="flex items-center gap-4 mb-4">
            <select
              value={selectedIndex === null ? "" : selectedIndex}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedIndex(value === "" ? null : Number(value));
                if (value !== "") {
                  const index = Number(value);
                  setNewTagline(bestImages[index]?.tagline || "");
                } else {
                  setNewTagline("");
                }
              }}
              className="p-2 border rounded-lg"
            >
              <option value="">Add New Image</option>
              {bestImages.map((_, index) => (
                <option key={index} value={index}>
                  Update Image {index + 1}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newTagline}
              onChange={(e) => setNewTagline(e.target.value)}
              placeholder="Enter image tagline"
              className="flex-1 p-2 border rounded-lg"
            />
          </div>
          <div className="inline-block">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) =>
                handleUpload("/api/our-best", setBestImages, res[0]?.url)
              }
              onUploadError={(error: Error) => {
                alert(`Image upload failed: ${error.message}`);
              }}
              appearance={{
                button: `px-4 py-2 ${
                  selectedIndex === null
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white rounded-lg transition-colors`,
                container: "min-w-[200px]",
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {bestImages.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <div className="text-sm text-gray-500 mb-2">
                Position: {index + 1}
              </div>
              <img
                src={image.url}
                alt={`Best ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {editingId === index ? (
                <div className="space-y-2 mb-4">
                  <input
                    type="text"
                    value={editTagline}
                    onChange={(e) => setEditTagline(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTagline(index)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <p className="text-gray-800 font-medium">{image.tagline}</p>
                  <button
                    onClick={() => startEditing(index, image.tagline)}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Edit Tagline
                  </button>
                </div>
              )}

              <button
                onClick={() =>
                  handleDelete("/api/our-best", setBestImages, image, index)
                }
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
