import prisma from "@/prisma/prismadb";

type Params = {
  params: {
    id: string;
  };
};

export async function POST(request: Request, { params }: Params) {
  try {
    const { body, user_id } = await request.json();
    const postId = params.id;
    const post = await prisma.comment.create({
      data: {
        userId: user_id,
        body,
        postId,
      },
    });
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const postId = params.id;
    const getComment = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        post: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return new Response(JSON.stringify(getComment), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}
