import { NextResponse } from "next/server";
import { sql } from "../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Ideally move secret to .env
const JWT_SECRET = "shuuuuhuuuuu"; // process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log("Received login request for:", email);

    const result = await sql`SELECT * FROM app_user WHERE email = ${email}`;
    console.log("DB result:", result);

    const user = result[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      status: "success",
      message: "Logged in",
      token, // you can include token in response body (for debugging)
    });

    // Set HttpOnly cookie
    response.cookies.set("token", token, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/"
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal error", details: error.message },
      { status: 500 }
    );
  }
}
