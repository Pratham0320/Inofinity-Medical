/** @format */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import { checkAuthorization } from "@/utils/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: Request) {
	const authCheck = await checkAuthorization(req);
	if (!authCheck.authorized) return authCheck.response;

	try {
		const { data: admins, error: fetchError } = await supabase
			.from("users")
			.select("id, username, role")
			.eq("role", "admin");

		if (fetchError) {
			throw fetchError;
		}

		return NextResponse.json({ admins });
	} catch (error) {
		console.error("Error fetching admins:", error);
		return NextResponse.json(
			{ error: "Failed to fetch admins" },
			{ status: 500 }
		);
	}
}


export async function POST(req: Request) {
	const authCheck = await checkAuthorization(req);
	if (!authCheck.authorized) return authCheck.response;
	try {
		const { username, password, role } = await req.json();

		if (!username || !password || role !== "admin") {
			return NextResponse.json(
				{ error: "Invalid request" },
				{ status: 400 }
			);
		}

		const { data: existingUser, error: findError } = await supabase
			.from("users")
			.select("id")
			.eq("username", username)
			.single();

		if (findError && findError.code !== "PGRST116") {
			throw findError;
		}

		if (existingUser) {
			return NextResponse.json(
				{ error: "Username already exists" },
				{ status: 400 }
			);
		}

		const hashedPassword = bcrypt.hashSync(password, 10);

		const { error: insertError } = await supabase.from("users").insert({
			username,
			password: hashedPassword,
			role,
		});

		if (insertError) {
			throw insertError;
		}

		return NextResponse.json({ message: "Admin added successfully" });
	} catch (error) {
		console.error("Error adding admin:", error);
		return NextResponse.json(
			{ error: "Failed to add admin" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: Request) {
	const authCheck = await checkAuthorization(req);
	if (!authCheck.authorized) return authCheck.response;
	try {
		const { username } = await req.json();

		if (!username || username === "superadmin") {
			return NextResponse.json(
				{ error: "Invalid request" },
				{ status: 400 }
			);
		}

		const { data: user, error: findError } = await supabase
			.from("users")
			.select("id")
			.eq("username", username)
			.eq("role", "admin")
			.single();

		if (findError && findError.code === "PGRST116") {
			return NextResponse.json(
				{ error: "Admin not found" },
				{ status: 404 }
			);
		}

		if (findError) {
			throw findError;
		}

		const { error: deleteError } = await supabase
			.from("users")
			.delete()
			.eq("id", user.id);

		if (deleteError) {
			throw deleteError;
		}

		return NextResponse.json({ message: "Admin deleted successfully" });
	} catch (error) {
		console.error("Error deleting admin:", error);
		return NextResponse.json(
			{ error: "Failed to delete admin" },
			{ status: 500 }
		);
	}
}

export async function PUT(req: Request) {
	const authCheck = await checkAuthorization(req);
	if (!authCheck.authorized) return authCheck.response;
	try {
		const { username, newPassword } = await req.json();

		if (!username || !newPassword || username === "superadmin") {
			return NextResponse.json(
				{ error: "Invalid request" },
				{ status: 400 }
			);
		}

		const { data: user, error: findError } = await supabase
			.from("users")
			.select("id")
			.eq("username", username)
			.eq("role", "admin")
			.single();

		if (findError && findError.code === "PGRST116") {
			return NextResponse.json(
				{ error: "Admin not found" },
				{ status: 404 }
			);
		}

		if (findError) {
			throw findError;
		}

		const hashedPassword = bcrypt.hashSync(newPassword, 10);

		const { error: updateError } = await supabase
			.from("users")
			.update({ password: hashedPassword })
			.eq("id", user.id);

		if (updateError) {
			throw updateError;
		}

		return NextResponse.json({
			message: "Admin credentials updated successfully",
		});
	} catch (error) {
		console.error("Error updating admin credentials:", error);
		return NextResponse.json(
			{ error: "Failed to update credentials" },
			{ status: 500 }
		);
	}
}
