import prisma from "@/prisma/prismadb";

type Params = {
  params: {
    id: string;
  };
};
export async function GET(request: Request, { params }: Params) {
  try {
    const userId = params.id;
    const getPosts = await prisma.post.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        comments: true,
      },
    });
    return new Response(JSON.stringify(getPosts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}
