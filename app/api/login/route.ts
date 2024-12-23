import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const JWT_SECRET = process.env.JWT_SECRET || "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
	try {
		const { username, password } = await req.json();

		if (!username || !password) {
			return NextResponse.json(
				{ error: "Username and password are required" },
				{ status: 400 }
			);
		}

		const { data: user, error } = await supabase
			.from("users")
			.select("username, password, role")
			.eq("username", username)
			.single();

		if (error || !user) {
			return NextResponse.json(
				{ error: "Invalid username or password" },
				{ status: 401 }
			);
		}

		const passwordMatch = bcrypt.compareSync(password, user.password);
		if (!passwordMatch) {
			return NextResponse.json(
				{ error: "Invalid username or password" },
				{ status: 401 }
			);
		}

		const token = jwt.sign(
			{ username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
		);

		return NextResponse.json({ token, role: user.role });
	} catch (error) {
		console.error("Error during login:", error);
		return NextResponse.json({ error: "Failed to login" }, { status: 500 });
	}
}
