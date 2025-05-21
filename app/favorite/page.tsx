'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

type FavoriteItem = {
  id: number;
  name: string;
  type: 'serija' | 'glumac' | 'epizoda';
};

export default function FavoritePage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [activeTab, setActiveTab] = useState<'serija' | 'glumac' | 'epizoda'>('serija');

  useEffect(() => {
    fetch('/api/favorites')
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, []);

  const obrisi = async (id: number, type: string) => {
    await fetch(`/api/favorites?id=${id}&type=${type}`, { method: 'DELETE' });
    setFavorites((prev) => prev.filter((f) => !(f.id === id && f.type === type)));
  };

  const prikazaniFavoriti = favorites.filter((f) => f.type === activeTab);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Moji favoriti</h1>

      <div className="absolute top-4 right-4">
        <BackButton />
      </div>

      {/* Tabs */}
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

      {/* Lista favorita */}
      {prikazaniFavoriti.length > 0 ? (
        <ul className="space-y-4">
          {prikazaniFavoriti.map((f) => (
            <li
              key={`${f.type}-${f.id}`}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <Link
                href={
                  f.type === 'serija'
                    ? `/serija/${encodeURIComponent(f.name)}`
                    : f.type === 'glumac'
                    ? `/glumci/${encodeURIComponent(f.name)}`
                    : `/epizode/${encodeURIComponent(f.name)}`
                }
                className="font-medium text-blue-600 hover:underline"
              >
                {f.name}
              </Link>
              <button
                onClick={() => obrisi(f.id, f.type)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Obriši
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          Nema spremljenih favorita za ovu kategoriju.
        </p>
      )}
    </main>
  );
}
