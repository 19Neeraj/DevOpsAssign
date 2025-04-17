import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const start = Date.now();
  while (Date.now() - start < 100) {
    // Simulate CPU work (100ms blocking)
  }
  res.status(200).json({ message: "Processed", timeTaken: Date.now() - start });
}
