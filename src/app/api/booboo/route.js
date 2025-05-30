"use server";
import { NextResponse } from "next/server";
import { sql } from "../../lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
    const body = await req.json();
    const { name, email, password } = body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

        await sql`INSERT INTO app_user (name, email, password) VALUES (${name}, ${email}, ${password})`;

        return NextResponse.json({ status: "success", message: "User registered" });
    } catch (error) {
        return NextResponse.status(500).json({ status: "fail", message: "Error inserting data", error: error.message });
    }
}
