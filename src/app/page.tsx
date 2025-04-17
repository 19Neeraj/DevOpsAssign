'use client';

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const simulateLoad = async () => {
    setLoading(true);
    const start = performance.now();

    try {
      const res = await fetch("/api/heavy");
      await res.json(); // we parse it to complete the request
      const end = performance.now();
      const timeTaken = end - start;
      setResponseTime(timeTaken);

      // Send metrics to backend
      await fetch("/api/metrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          responseTime: timeTaken,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Error calling API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Frontend Load Test</h1>

        <button
          onClick={simulateLoad}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition duration-300 
            ${loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        >
          {loading ? "Loading..." : "Trigger Load"}
        </button>

        {responseTime && (
          <p className="mt-6 text-lg text-green-600 font-medium">
            Response Time: <span className="font-bold">{responseTime.toFixed(2)} ms</span>
          </p>
        )}
      </div>
    </main>
  );
}
