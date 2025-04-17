import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { responseTime, timestamp } = req.body;
    // Log metrics to console (or integrate with real monitoring)
    console.log(`[Metric] ${timestamp}: ${responseTime.toFixed(2)} ms`);
    res.status(200).json({ status: "metrics logged" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
