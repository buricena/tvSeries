'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type FavoriteItem = {
  id: number;
  name: string;
  type: 'serija' | 'glumac' | 'epizoda';
};

export default function FavoritePage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [activeTab, setActiveTab] = useState<'serija' | 'glumac' | 'epizoda'>('serija');

  // activeTab oznacava trenutno aktivnu, tj otvorenu stavku

  useEffect(() => {
    fetch('/api/favorites')
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, []);

  const obrisi = async (id: number, type: string) => {
    await fetch(`/api/favorites?id=${id}&type=${type}`, { method: 'DELETE' });
    setFavorites((prev) => prev.filter((f) => !(f.id === id && f.type === type)));
  };


    // filtrira da se prikazuju samo favoriti iz aktivne stavke

  const prikazaniFavoriti = favorites.filter((f) => f.type === activeTab);


  return (
    <main className="bg-black text-white min-h-screen p-6 flex flex-col items-center relative">

      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Moji favoriti</h1>


      <div className="flex justify-center mb-6 space-x-4">
        {(['serija', 'glumac', 'epizoda'] as const).map((tip) => (
          <button
            key={tip}
            onClick={() => setActiveTab(tip)}
            className={`px-4 py-2 rounded ${
              activeTab === tip ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {tip === 'serija' ? 'Serije' : tip === 'glumac' ? 'Glumci' : 'Epizode'}
          </button>
        ))}
      </div>


      {prikazaniFavoriti.length > 0 ? (
        <ul className="space-y-4 w-full max-w-3xl">
          {prikazaniFavoriti.map((f) => (
            <li
              key={`${f.type}-${f.id}`}
              className="flex justify-between items-center bg-white text-black p-6 rounded shadow-md"
            >
              <Link
                href={
                  f.type === 'serija'
                    ? `/serija/${encodeURIComponent(f.name)}`
                    : f.type === 'glumac'
                    ? `/serija/${encodeURIComponent(f.name)}/glumci/${f.id}`
                    : `/serija/${encodeURIComponent(f.name)}/epizode/${f.id}`
                }
                className="font-semibold text-blue-600 hover:underline text-lg"
              >
                {f.name}
              </Link>

              <button
                onClick={() => obrisi(f.id, f.type)}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Obriši
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400 mt-8">
          Nema spremljenih favorita za ovu kategoriju.
        </p>
      )}
    </main>
  );
}