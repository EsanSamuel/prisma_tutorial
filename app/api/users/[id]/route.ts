import prisma from "@/prisma/prismadb";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });
    return new Response(JSON.stringify(getUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { bio, username } = await request.json();
    const editUser = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        bio,
        username,
      },
    });
    return new Response(JSON.stringify(editUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}
