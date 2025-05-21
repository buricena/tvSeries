import "./globals.css";

export const metadata = {
  title: {
    default: "TV App",
    template: "%s | TV App",
  },
  description: "Pretraži i saznaj više o serijama, glumcima i epizodama.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "TV App",
    description: "Najbolje serije na jednom mjestu.",
    url: "https://tvojadomena.com",
    siteName: "TV App",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "hr_HR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TV App",
    description: "Otkrij i dodaj omiljene serije.",
    images: ["/og-image.jpg"],
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr">
      <body className="bg-gray-100 text-gray-900">
        {children}
                <footer className="bg-black text-white text-center py-4 mt-8">
          <p className="text-sm">
            © {new Date().getFullYear()} Završni projekt | Podaci sa TV Maze API
          </p>
        </footer>
      </body>
    </html>
  );
}
