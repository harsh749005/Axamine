"use server";
import { NextResponse } from "next/server";
import { sql } from "../../lib/db"; // path as per your project

export async function POST(req) {
    const body = await req.json();
    const {message,username,sender} = body;  
    try {
        const sql = neon(process.env.DATABASE_URL);
        const data = await sql`INSERT INTO chat_messages (sender,messages,username) VALUES(${sender},${message},${username})`;
        return NextResponse.json({ status: 'success', message:"inserted" });
    } catch (error) {
        return NextResponse.json({ status: 'fail', message: "Error inserting data", error: error.message });
    }

    
}
