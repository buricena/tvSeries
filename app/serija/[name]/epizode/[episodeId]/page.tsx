import FavoriteButton from "@/components/FavoriteButton";
import BackButton from "@/components/BackButton";
import Link from "next/link";

interface PageProps {
  params: {
    episodeId: string;
  };
}

export default async function DetaljiEpizode({ params }: PageProps) {
  const { episodeId } = params;

  const res = await fetch(`https://api.tvmaze.com/episodes/${episodeId}`);
  if (!res.ok) {
    return <p>Greška pri dohvaćanju epizode.</p>;
  }

  const epizoda = await res.json();

  const showHref = epizoda._links?.show?.href;
  let serija = null;

  if (showHref) {
    const resShow = await fetch(showHref);
    if (resShow.ok) {
      serija = await resShow.json();
    }
  }

  return (
    <main className="bg-black text-white min-h-screen p-6 flex flex-col items-center">
      <div className="absolute top-4 right-4 flex gap-2">
        <BackButton />
        <Link
          href="/"
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Početna
        </Link>
      </div>

      {serija && (
        <h2 className="text-xl text-gray-300 mb-1 text-center">
          Serija: <span className="font-semibold text-white">{serija.name}</span>
        </h2>
      )}

      <h1 className="text-3xl font-bold text-red-500 mb-4 text-center">
        {epizoda.name}
      </h1>

      <p className="text-sm text-gray-300 mb-2">
        Sezona {epizoda.season}, Epizoda {epizoda.number}
      </p>

      <FavoriteButton
        item={{
          id: epizoda.id,
          name: epizoda.name,
          type: "epizoda",
          serija: serija?.name || "Nepoznata serija",
        }}
      />

      {epizoda.image?.medium && (
        <img
          src={epizoda.image.medium}
          alt={epizoda.name}
          className="w-full max-w-md mt-6 rounded shadow-md"
        />
      )}

      <div className="mt-6 max-w-2xl text-center text-gray-200">
        <p>{epizoda.summary?.replace(/<[^>]*>/g, "") || "Nema opisa."}</p>
      </div>
    </main>
  );
}
