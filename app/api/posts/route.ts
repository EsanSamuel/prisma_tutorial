import prisma from "@/prisma/prismadb";

export async function POST(request: Request) {
  try {
    const { body, user_id } = await request.json();
    const post = await prisma.post.create({
      data: {
        userId: user_id,
        body,
      },
    });
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const getPosts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        comments: true,
      },
    });
    return new Response(JSON.stringify(getPosts), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}
