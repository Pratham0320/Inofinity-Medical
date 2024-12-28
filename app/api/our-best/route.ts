/** @format */

import { checkAuthorization } from "@/utils/auth";
import { NextResponse } from "next/server";
import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.connect();

const KEY = "our-best";

export async function GET() {
  try {
    const data = await redis.lRange(KEY, 0, -1);
    const parsedData = data.map((item) => JSON.parse(item));
    return NextResponse.json({ items: parsedData });
  } catch (error) {
    console.error("Error fetching images and taglines from Redis:", error);
    return NextResponse.json(
      { error: "Failed to fetch images and taglines" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const authCheck = await checkAuthorization(req);
  if (!authCheck.authorized) return authCheck.response;
  try {
    const { images } = await req.json();

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "Invalid images format" },
        { status: 400 }
      );
    }

    if (images.length > 9) {
      return NextResponse.json(
        { error: "Cannot store more than 9 items" },
        { status: 400 }
      );
    }

    const formattedImages = images.map(({ url, tagline }) => {
      if (typeof url !== "string" || typeof tagline !== "string") {
        throw new Error("Invalid format for image or tagline");
      }
      return JSON.stringify({ url, tagline });
    });

    await redis.del(KEY); // Clear the existing list
    await redis.rPush(KEY, formattedImages);

    return NextResponse.json({
      message: "Images and taglines added successfully",
    });
  } catch (error) {
    console.error("Error adding images and taglines:", error);
    return NextResponse.json(
      { error: "Failed to add images and taglines" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const authCheck = await checkAuthorization(req);
  if (!authCheck.authorized) return authCheck.response;
  try {
    const { index, url, tagline } = await req.json();

    if (
      typeof index !== "number" ||
      typeof url !== "string" ||
      typeof tagline !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid index, URL, or tagline format" },
        { status: 400 }
      );
    }

    const existingItem = await redis.lIndex(KEY, index);
    if (!existingItem) {
      return NextResponse.json(
        { error: "Item at the specified index does not exist" },
        { status: 404 }
      );
    }

    const updatedItem = JSON.stringify({ url, tagline });
    await redis.lSet(KEY, index, updatedItem);

    return NextResponse.json({
      message: "Image and tagline updated successfully",
    });
  } catch (error) {
    console.error("Error updating image and tagline:", error);
    return NextResponse.json(
      { error: "Failed to update image and tagline" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const authCheck = await checkAuthorization(req);
  if (!authCheck.authorized) return authCheck.response;
  try {
    const { index } = await req.json();

    if (typeof index !== "number") {
      return NextResponse.json(
        { error: "Invalid index format" },
        { status: 400 }
      );
    }

    const existingItem = await redis.lIndex(KEY, index);
    if (!existingItem) {
      return NextResponse.json(
        { error: "Item at the specified index does not exist" },
        { status: 404 }
      );
    }

    await redis.lSet(KEY, index, "__DELETED__"); // Mark the item as deleted
    await redis.lRem(KEY, 1, "__DELETED__"); // Remove the marked item

    return NextResponse.json({
      message: "Image and tagline deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting image and tagline:", error);
    return NextResponse.json(
      { error: "Failed to delete image and tagline" },
      { status: 500 }
    );
  }
}
