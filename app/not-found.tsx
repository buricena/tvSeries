import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Stranica nije pronađena</h1>
        <p className="text-lg mb-4">Pokušaj ponovno ili se vrati na početnu stranicu.</p>
        <Link
          href="/"
          className="inline-block mt-2 px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700 transition"
        >
          ⬅ Povratak na početnu
        </Link>
      </div>
    </div>
  );
}
