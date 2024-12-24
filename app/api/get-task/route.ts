import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { auth } from '@/auth';

export async function GET() {
  try {
     const session = await auth();
      console.log(session)
      if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
      const userEmail = session.user?.email;
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

  
    const posts = await prisma.post.findMany({
      where: {
        userEmail: userEmail,
      },
    });

    return NextResponse.json(posts); 
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
