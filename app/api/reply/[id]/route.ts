import prisma from "@/prisma/prismadb";

type Params = {
  params: {
    id: string;
  };
};

export async function POST(request: Request, { params }: Params) {
  try {
    const { body, user_id } = await request.json();
    const commentId = params.id;
    const reply = await prisma.reply.create({
      data: {
        userId: user_id,
        body,
        commentId,
      },
    });
    return new Response(JSON.stringify(reply), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const commentId = params.id;
    const getCommentReply = await prisma.reply.findMany({
      where: {
        commentId,
      },
      include: {
        comment: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return new Response(JSON.stringify(getCommentReply), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}
