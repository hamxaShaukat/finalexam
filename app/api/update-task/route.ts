import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

export async function PATCH(request: NextRequest) {
    const { id, title, content, priority, status, dateOfExpiration } = await request.json();
    console.log(id)
    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }
  
    try {
      const updatedPost = await prisma.post.update({
        where: { id },
        data: { title, content, priority, status, dateOfExpiration },
      });
  
      return NextResponse.json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      return NextResponse.json(
        { error: "Failed to update post" },
        { status: 500 }
      );
    }
  }
  