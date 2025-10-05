import client from "@/config/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { screenId, seatId, userId } = await req.json();
    const key = `${screenId}:${seatId}`;

    // Check if seat is already locked
    const existingLock = await client.get(key);
    if (existingLock) {
      return NextResponse.json(
        { message: "Seat is locked. Try again later." },
        { status: 400 }
      );
    }

    // Lock seat for 2 minutes
    await client.set(key, userId, { ex: 120 }); // `ex` is TTL in seconds for Upstash

    return NextResponse.json(
      { message: "Seat locked successfully for 2 minutes." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Redis lock error:", error);
    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
