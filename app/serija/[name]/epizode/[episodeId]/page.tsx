import FavoriteButton from "@/components/FavoriteButton";
import BackButton from "@/components/BackButton";

export default async function DetaljiEpizode({
  params,
}: {
  params: { episodeId: string };
}) {
  const { episodeId } = params;

  const res = await fetch(`https://api.tvmaze.com/episodes/${episodeId}`);
  if (!res.ok) {
    return <p>Greška pri dohvaćanju epizode.</p>;
  }

  const epizoda = await res.json();

  return (
    
   <main className="bg-black text-white min-h-screen p-6 flex flex-col items-center">
        <div className="absolute top-4 right-4">

      <BackButton />
      </div>
  <h1 className="text-3xl font-bold text-red-500 mb-4 text-center">
    {epizoda.name}
  </h1>

  <p className="text-sm text-gray-300 mb-2">
    Sezona {epizoda.season}, Epizoda {epizoda.number}
  </p>

  <FavoriteButton
    item={{ id: epizoda.id, name: epizoda.name, type: "epizoda" }}
  />

  {epizoda.image?.medium && (
    <img
      src={epizoda.image.medium}
      alt={epizoda.name}
      className="w-full max-w-md mt-6 rounded shadow-md"
    />
  )}

  <div className="mt-6 max-w-2xl text-center text-gray-200">
    <p>{epizoda.summary?.replace(/<[^>]*>/g, '') || 'Nema opisa.'}</p>
  </div>
</main>

  );
}
