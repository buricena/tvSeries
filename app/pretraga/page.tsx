"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "@/components/BackButton";

type Show = {
  id: number;
  name: string;
  image?: {
    medium: string;
  };
};

export default function SerijaLista() {
  const [serije, setSerije] = useState<Show[]>([]);
  const [pretraga, setPretraga] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSerije();
  }, [page]);

  const fetchSerije = async () => {
    setLoading(true);
    const res = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
    const data = await res.json();
    setSerije((prev) => [...prev, ...data]);
    setLoading(false);
  };

  const filtrirane = serije.filter((s) =>
    s.name.toLowerCase().includes(pretraga.toLowerCase())
  );

  // Uklanjanje duplikata po ID-u
  const uniqueShows = Array.from(new Map(filtrirane.map(s => [s.id, s])).values());

  const handleReset = () => {
    setPretraga("");
  };

  return (
    <main className="p-6 min-h-screen bg-black text-white">
<h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
  Pretraga serija
</h1>
    <div className="absolute top-4 right-4">

      <BackButton />
      </div>

<div className="mb-6 flex justify-center gap-3">
        <input
          type="text"
          placeholder="Traži seriju..."
          className="border border-gray-600 bg-gray-800 text-white rounded px-3 py-2 w-full max-w-sm"
          value={pretraga}
          onChange={(e) => setPretraga(e.target.value)}
        />
        <button
          onClick={handleReset}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-8">
        {uniqueShows.map((s) => (
          <Link
            key={s.id}
            href={`/serija/${encodeURIComponent(s.name)}`}
            className="bg-gray-900 p-3 rounded shadow hover:shadow-red-500 transition duration-200 text-center"
          >
            {s.image?.medium && (
              <img
                src={s.image.medium}
                alt={s.name}
                className="rounded mb-2 w-full h-60 object-cover"
              />
            )}
            <h3 className="text-sm font-semibold">{s.name}</h3>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setPage((p) => p + 1)}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Učitavam..." : "Učitaj još"}
        </button>
      </div>
    </main>
  );
}
