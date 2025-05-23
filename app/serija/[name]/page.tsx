import BackButton from "@/components/BackButton";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import TabNavigacija from "@/components/TabNavigacija";

export default async function SerijaDetalji({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;

  const res = await fetch(`http://api.tvmaze.com/search/shows?q=${name}`);
  if (!res.ok) {
    throw new Error("Greška pri dohvaćanju serije!");
  }

  const results = await res.json();
  const match =
    results.find(
      (item: any) => item.show.name.toLowerCase() === name.toLowerCase()
    ) || results[0];

  if (!match) {
    return <p>Serija nije pronađena!</p>;
  }

  const serija = match.show;

  return (
    <main className="relative p-6 bg-black min-h-screen text-white">
      {/* Back button u gornjem desnom kutu */}
      <div className="absolute top-4 right-4">
        <BackButton />
      </div>

      <TabNavigacija name={serija.name} />

      <h1 className="mt-6 text-3xl font-bold text-center text-red-600">
        {serija.name}
      </h1>

      {/* da se sadržaj centrira */}
      <div className="text-center px-4">
        {serija.image?.medium && (
          <div className="mt-4 flex justify-center">
            <img
              src={serija.image.medium}
              alt={`Poster serije ${serija.name}`}
              className="w-[250px] rounded-lg shadow-lg"
            />
          </div>
        )}

        <p className="mt-4">
          <strong>Žanrovi:</strong> {serija.genres.join(", ")}
        </p>
        <p>
          <strong>Ocjena:</strong> {serija.rating?.average ?? "N/A"}
        </p>

        <p>
          <strong>Premijera:</strong> {serija.premiered}
        </p>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Opis</h2>
          <p>{serija.summary?.replace(/<[^>]*>?/gm, "") || "Nema opisa."}</p>
        </div>

        <div className="mt-4">
          <FavoriteButton
            item={{ id: serija.id, name: serija.name, type: "serija" }}
          />
        </div>
      </div>
    </main>
  );
}
