import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  const session = await auth();
  console.log(session)
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { title, content, priority, status, dateOfExpiration } =
    await request.json();
  console.log(title, content, priority, status, dateOfExpiration)
  if (!title || !priority || !status || !dateOfExpiration) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const userEmail = session.user?.email;
  console.log(userEmail);

  if (!userEmail) {
    return NextResponse.json({ error: "User ID is missing" }, { status: 400 });
  }

  try {
    const tool = await prisma.post.create({
      data: {
        title,
        content,
        priority,
        dateOfExpiration,
        status,
        userEmail
      },
    });

    return NextResponse.json(tool);
  } catch (error) {
  
    console.error("Failed to create tool:", error);
    return NextResponse.json(
      { error: "Failed to create tool due to an unexpected error" },
      { status: 500 }
    );
  }
}
