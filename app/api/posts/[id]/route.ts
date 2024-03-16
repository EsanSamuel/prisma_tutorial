import prisma from "@/prisma/prismadb";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  try {
    const getPost = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
      include: {
        comments: true,
        user: true,
      },
    });
    return new Response(JSON.stringify(getPost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const { body } = await request.json();
  try {
    const updatePost = await prisma.post.update({
      where: {
        id: params.id,
      },
      data: {
        body,
      },
    });
    return new Response(JSON.stringify(updatePost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: params.id,
      },
    });
    return new Response(JSON.stringify(deletePost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}
