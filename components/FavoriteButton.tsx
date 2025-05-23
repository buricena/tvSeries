"use client";

import { useEffect, useState, useTransition } from "react";
import { Heart, HeartOff } from "lucide-react"; 


type FavoriteItem = {
  id: number;
  name: string;
  type: 'serija' | 'glumac' | 'epizoda';
  serija?: string;
};

// Za izgled FavoriteButtona instalirala sam Lucide ikone sa npm install lucide-react, to  mi je omogućilo da koristim <Heart /> i <HeartOff />

export default function FavoriteButton({ item }: { item: FavoriteItem }) {
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        const postoji = data.some(
          (fav: FavoriteItem) => fav.id === item.id && fav.type === item.type
        );
        setSaved(postoji);
      });
  }, [item]);

 async function toggleFavorit() {
  startTransition(async () => {
    if (!saved) {
      try {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });

        if (res.status === 409) {
          alert("Već je u favoritima.");
        } else if (res.ok) {
          setSaved(true);
        } else {
          alert("Došlo je do pogreške.");
        }
      } catch (err) {
        console.error(err);
        alert("Greška u mreži.");
      }
    } else {
      // Uklanjanje iz favorita
      try {
        const res = await fetch(
          `/api/favorites?id=${item.id}&type=${item.type}`,
          { method: "DELETE" }
        );

        if (res.ok) {
          setSaved(false);
        } else {
          alert("Greška prilikom uklanjanja.");
        }
      } catch (err) {
        console.error(err);
        alert("Greška u mreži.");
        
      }
    }
  });
}

  return (
  <button
    onClick={toggleFavorit}
    disabled={isPending}
    className={`text-red-500 hover:scale-110 transition duration-200`}
    aria-label="Dodaj ili ukloni iz favorita"
  >
    {saved ? <HeartOff fill="currentColor" size={28} /> : <Heart size={28} />}
  </button>
);
}