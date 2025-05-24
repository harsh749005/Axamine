"use server"
import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless";
import { sql } from "../../lib/db"; // path as per your project

export async function GET(req){
    const { searchParams } = new URL(req.url)
    const username = searchParams.get("username");
    try{
        // const sql = neon(process.env.DATABASE_URL);
        const result = await sql`SELECT * FROM chat_messages WHERE username = ${username}`; 
        return NextResponse.json({status: 'success', message:"chats fetched" , chats:result})
    }catch(error){
        return NextResponse.json({status: 'failed', message: "Error fetching chats", error: error.message })
    }
}