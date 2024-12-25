/** @format */

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "";

function verifyToken(authHeader: string | null): {
  isValid: boolean;
  payload?: any;
} {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { isValid: false };
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { isValid: true, payload };
  } catch (error) {
    console.error("Token verification failed:", error);
    return { isValid: false };
  }
}

export async function checkAuthorization(req: Request) {
  const authHeader = req.headers.get("Authorization");
  const { isValid, payload } = verifyToken(authHeader);

  if (
    !isValid ||
    !payload ||
    !(payload.role === "superadmin" || payload.role === "admin")
  ) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized or invalid token HI" },
        { status: 401 }
      ),
    };
  }

  return { authorized: true, payload };
}
