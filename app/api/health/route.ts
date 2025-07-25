import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test database connection with a simple query
    const { count: userCount, error: userError } = await supabase
      .from("users")
      .select("id", { count: "exact", head: true });

    const { count: petCount, error: petError } = await supabase
      .from("pets")
      .select("id", { count: "exact", head: true });

    if (userError || petError) {
      console.error("Database connection failed:", userError || petError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      userCount: userCount || 0, // TO DO: numbers not correct. showing 0
      petCount: petCount || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : "Database connection failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
