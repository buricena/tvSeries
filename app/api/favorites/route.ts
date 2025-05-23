import { NextResponse } from "next/server";

// . GET, POST i DELETE napisane uz pomoc kodova sa tečaja i službene dokumentaicje Next.js : https://nextjs.org/docs/app/building-your-application/routing/route-handlers


let favorites: any[] = [];

export async function GET() {
  return NextResponse.json(favorites);
}

export async function POST(req: Request) {
  const data = await req.json();

  if (!data || !data.id || !data.name || !data.type) {
    return new NextResponse(null, { status: 400 });
  }

  const postoji = favorites.some(
    (f) => f.id === data.id && f.type === data.type
  );

  if (postoji) {
    return new NextResponse(null, { status: 409 });
  }

  favorites.push(data);
  return new NextResponse(null, { status: 201 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  const type = searchParams.get("type");

  favorites = favorites.filter((f) => !(f.id === id && f.type === type));
  return new NextResponse(null, { status: 204 });
}
