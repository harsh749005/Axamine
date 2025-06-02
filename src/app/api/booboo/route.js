"use server";
import { NextResponse } from "next/server";
import { sql } from "../../lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
    const body = await req.json();
    const { name, email, password } = body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

        await sql`INSERT INTO app_user (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;

        return NextResponse.json({ status: "success", message: "User registered" });
    } catch (error) {
        console.log("API Error",error)
        return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
    }
}
