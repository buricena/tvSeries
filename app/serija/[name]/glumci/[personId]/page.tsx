import FavoriteButton from "@/components/FavoriteButton";
import BackButton from "@/components/BackButton";

export default async function DetaljiGlumca({
  params,
}: {
  params: Promise<{ personId: string }>;
}) {
  const { personId } = await params;

  const res = await fetch(`https://api.tvmaze.com/people/${personId}`);
  if (!res.ok) {
    return <p>Greška pri dohvaćanju glumca.</p>;
  }

  const glumac = await res.json();

  return (
    <main className="bg-black text-white min-h-screen p-6 flex flex-col items-center">
    <div className="absolute top-4 right-4">

      <BackButton />
      </div>

  <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">{glumac.name}</h1>

  {glumac.image?.medium && (
    <img
      src={glumac.image.medium}
      alt={glumac.name}
      className="w-48 h-48 rounded-full object-cover mb-6 border-4 border-gray-700"
    />
  )}

  <div className="text-center space-y-2 mb-6">
    <p>
      <span className="font-semibold text-gray-300">Spol:</span>{" "}
      {glumac.gender || "Nepoznato"}
    </p>
    <p>
      <span className="font-semibold text-gray-300">Rođen:</span>{" "}
      {glumac.birthday || "Nepoznato"}
    </p>
    <p>
      <span className="font-semibold text-gray-300">Mjesto rođenja:</span>{" "}
      {glumac.country?.name || "Nepoznato"}
    </p>
  </div>

  <div className="flex flex-col items-center gap-3">


    <FavoriteButton
      item={{ id: glumac.id, name: glumac.name, type: "glumac" }}
    />
  </div>
</main>

  );
}
