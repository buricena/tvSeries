import BackButton from "@/components/BackButton";
import Link from "next/link";

export default async function Glumci({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

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

  const resCast = await fetch(`https://api.tvmaze.com/shows/${showId}/cast`);
  const cast = await resCast.json();

  return (
<main className="bg-black text-white min-h-screen p-6 flex flex-col items-center relative">
    <div className="absolute top-4 right-4">

      <BackButton />
      </div>

  <h1 className="text-3xl font-bold text-center text-red-500 mb-8">
    Glumci – {match.show.name}
  </h1>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {cast.map((member: any, index: number) => (
      <Link
        key={`${member.person.id}-${index}`}
        href={`/serija/${name}/glumci/${member.person.id}`}
        className="flex flex-col items-center bg-gray-800 p-4 rounded hover:scale-105 transition"
      >
        {member.person.image?.medium ? (
          <img
            src={member.person.image.medium}
            alt={member.person.name}
            className="w-24 h-24 rounded-full object-cover mb-3"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-600 mb-3 flex items-center justify-center text-sm text-gray-300">
            Nema slike
          </div>
        )}
        <span className="text-center text-sm font-medium">
          {member.person.name}
        </span>
      </Link>
    ))}
  </div>
</main>

  );
}
