# TV Series App

Ova Next.js aplikacija omogućuje korisnicima pregled TV serija i njihovih epizoda, kao i dodavanje omiljenih sadržaja na listu favorita. Podaci se dohvaćaju putem [TVmaze API-ja](https://www.tvmaze.com/api).

---

## Ključne funkcionalnosti

- Početna stranica s pretragom serija
- Dinamičke rute za detalje serija, epizoda i glumaca (`/serija/[name]`, `/epizode/[episodeId]`, `/glumci/[personId]`)
- Dodavanje i brisanje favorita (lokalno u browseru)
- Stranica favorita dostupna na ruti `/favorites`
- Tab navigacija između sekcija serije (Epizode / Glumci / Detalji)
- Custom 404 stranica
- Deploy na Vercel

---

## Lokalno pokretanje

1. Kloniraj repozitorij:

```bash
git clone https://github.com/buricena/tvSeries.git
cd tvSeries
```

2. Instaliraj ovisnosti:

```bash
npm install
```

3. Pokreni razvojni server:

```bash
npm run dev
```

Aplikacija će biti dostupna na `http://localhost:3000`

Napomena: Ako koristiš `NEXT_PUBLIC_SITE_URL`, postavi ga u `.env` datoteku:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Build i deploy

Za build produkcijske verzije:

```bash
npm run build
```

Za lokalno testiranje buildane aplikacije:

```bash
npm run start
```

Online verzija aplikacije dostupna je na:
https://tv-series-taupe.vercel.app/

---

## Poznate greške / TODO

- Tipizacija `params` u `page.tsx` fajlovima ručno isključena zbog konflikta sa `PageProps` na Vercelu
- Favoriti se trenutno spremaju lokalno (localStorage) – moguće proširenje na backend
- Trenutno nema autentifikacije – potencijal za buduću nadogradnju
