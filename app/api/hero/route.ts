/** @format */

import { checkAuthorization } from "@/utils/auth";
import { NextResponse } from "next/server";
import { createClient } from "redis";

const redis = createClient({
	url: process.env.REDIS_URL,
});

redis.connect();

export async function GET() {
	try {
		const images = await redis.lRange("hero_images", 0, -1);
		return NextResponse.json({ images });
	} catch (error) {
		console.error("Error fetching images from Redis:", error);
		return NextResponse.json(
			{ error: "Failed to fetch hero images" },
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

		await redis.rPush("hero_images", images);
		return NextResponse.json({ message: "Images added successfully" });
	} catch (error) {
		console.error("Error adding hero images:", error);
		return NextResponse.json(
			{ error: "Failed to add images" },
			{ status: 500 }
		);
	}
}

export async function PUT(req: Request) {
	const authCheck = await checkAuthorization(req);
	if (!authCheck.authorized) return authCheck.response;
	try {
		const { index, image } = await req.json();

		if (typeof index !== "number" || typeof image !== "string") {
			return NextResponse.json(
				{ error: "Invalid index or image format" },
				{ status: 400 }
			);
		}

		await redis.lSet("hero_images", index, image);
		return NextResponse.json({ message: "Image updated successfully" });
	} catch (error) {
		console.error("Error updating hero image:", error);
		return NextResponse.json(
			{ error: "Failed to update image" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: Request) {
	const authCheck = await checkAuthorization(req);
	if (!authCheck.authorized) return authCheck.response;
	try {
		const { image } = await req.json();

		if (typeof image !== "string") {
			return NextResponse.json(
				{ error: "Invalid image format" },
				{ status: 400 }
			);
		}

		const removed = await redis.lRem("hero_images", 1, image);
		if (removed === 0) {
			return NextResponse.json(
				{ message: "Image not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json({ message: "Image deleted successfully" });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to delete image" },
			{ status: 500 }
		);
	}
}
