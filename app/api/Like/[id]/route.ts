import prisma from "@/prisma/prismadb";

type Params = {
  params: {
    id: string;
  };
};

export async function POST(request: Request, { params }: Params) {
  try {
    const { userId } = await request.json();
    const post = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
    });
    let updatedLikes = [...(post?.likedIds || [])];

    updatedLikes.push(userId);

    const updatedPost = await prisma.post.update({
      where: {
        id: params.id,
      },
      data: {
        likedIds: updatedLikes,
      },
    });

    return new Response(JSON.stringify(updatedPost), { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
