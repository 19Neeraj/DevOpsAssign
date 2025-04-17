// src/app/api/heavy/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Simulate some heavy processing
  const start = Date.now();
  while (Date.now() - start < 100) {
    // Simulate CPU work (100ms blocking)
  }
  return NextResponse.json({ message: "Processed", timeTaken: Date.now() - start });
}
