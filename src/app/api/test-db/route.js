
import { db, mongoClient } from "@/lib/mongodb";

export async function GET() {
  try {
    await mongoClient.connect();
    await db.command({ ping: 1 });

    return Response.json({
      success: true,
      message: "MongoDB connected successfully!",
    });
  } catch (error) {
    console.error("MongoDB connectivity test failed:", {
      name: error.name,
      code: error.code,
    });

    return Response.json(
      {
        success: false,
        message: "Database connection failed. Check server logs.",
      },
      { status: 500 }
    );
  }
}
