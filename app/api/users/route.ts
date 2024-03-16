import prisma from "@/prisma/prismadb";

export async function GET(request: Request) {
  try {
    const findUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return new Response(JSON.stringify(findUsers), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}
