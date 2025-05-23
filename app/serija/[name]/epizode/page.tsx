import Link from "next/link";
import BackButton from "@/components/BackButton";

interface PageProps {
  params: {
    name: string;
  };
}

export default async function Epizode({ params }: PageProps) {
  const { name } = params;

  const resShow = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`);
  const showData = await resShow.json();

  const match =
    showData.find(
      (item: any) => item.show.name.toLowerCase() === name.toLowerCase()
    ) || showData[0];

  if (!match) {
    return <p>Serija nije pronađena!</p>;
  }

  const showId = match.show.id;

  const resEpisodes = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
  const episodes = await resEpisodes.json();

  return (
    <main className="bg-black text-white min-h-screen p-6 flex flex-col items-center relative">
      <div className="absolute top-4 right-4">
        <BackButton />
      </div>

      <h1 className="text-3xl font-bold text-center text-red-500 mb-8">
        Epizode – {match.show.name}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((ep: any) => (
          <Link
            key={ep.id}
            href={`/serija/${name}/epizode/${ep.id}`}
            className="block bg-gray-800 rounded p-4 shadow hover:shadow-red-500 transition"
          >
            <h2 className="text-lg font-semibold mb-1">{ep.name}</h2>
            <p className="text-sm text-gray-300">
              Sezona {ep.season}, Epizoda {ep.number}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Trajanje: {ep.runtime ? `${ep.runtime} min` : 'N/A'}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
