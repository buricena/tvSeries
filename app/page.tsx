"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [shows, setShows] = useState([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows?page=0")
      .then((res) => res.json())
      .then((data) => {
        const sortirano = data
          .filter((s: any) => s.rating?.average)
          .sort((a: any, b: any) => b.rating.average - a.rating.average);
        setShows(sortirano.slice(0, 20));
      });
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      if (scrollRef.current.scrollLeft <= 0) {
        scrollRef.current.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      if (scrollRef.current.scrollLeft >= maxScroll - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }
  };

  return (
    <main className="bg-black text-white min-h-screen py-10 px-6">
      {/* Naslov s animacijom */}
      <motion.h1
        className="text-4xl font-extrabold text-red-600 text-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        DOBRODOŠLI
      </motion.h1>

      {/* Navigacija */}
      <motion.div
        className="flex justify-center gap-10 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/pretraga" className="hover:underline text-blue-400">Istraži</Link>
        <Link href="/favorite" className="hover:underline text-red-400">Favoriti</Link>
      </motion.div>

      {/* Naslov slidera */}
      <motion.p
        className="text-center text-xl font-semibold text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        📺 Pregledajte najpopularnije:
      </motion.p>

      {/* Slider */}
      <div className="relative mt-10">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80"
        >
          ◀
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-10"
        >
          {shows.map((show: any, i: number) => (
            <motion.div
              key={show.id}
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Link
                href={`/serija/${encodeURIComponent(show.name)}`}
                className="w-56 bg-gray-800 rounded shadow-md p-4 hover:scale-105 transition"
              >
                {show.image && (
                  <img
                    src={show.image.medium}
                    alt={show.name}
                    className="w-full h-72 object-cover rounded"
                  />
                )}
                <h2 className="text-center text-base font-bold mt-3">{show.name}</h2>
                <p className="text-center text-sm text-yellow-400">
                  ⭐ {show.rating?.average ?? "N/A"}
                </p>
                <p className="text-center text-xs text-gray-400 mt-1">
                  {show.genres?.slice(0, 2).join(", ") || "Bez žanra"}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80"
        >
          ▶
        </button>
      </div>
    </main>
  );
}
