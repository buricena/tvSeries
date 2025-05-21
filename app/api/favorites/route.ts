import { NextResponse } from "next/server";

let favorites: any[] = [];

export async function GET() {
  return NextResponse.json(favorites);
}

export async function POST(req: Request) {
  const data = await req.json();

  if (!data || !data.id || !data.name || !data.type) {
    return NextResponse.json({ error: "Neispravan format" }, { status: 400 });
  }

  const postoji = favorites.some(
    (f) => f.id === data.id && f.type === data.type
  );

  if (postoji) {
    return NextResponse.json({ message: "Već u favoritima" }, { status: 409 });
  }

  favorites.push(data);
  return NextResponse.json({ message: "Dodano!" }, { status: 201 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  const type = searchParams.get("type");

  favorites = favorites.filter((f) => !(f.id === id && f.type === type));
  return NextResponse.json({ message: "Uklonjeno" });
}
