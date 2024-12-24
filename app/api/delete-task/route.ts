import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
  
    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }
  
    try {
      await prisma.post.delete({ where: { id } });
      return NextResponse.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      return NextResponse.json(
        { error: "Failed to delete post" },
        { status: 500 }
      );
    }
  }
  