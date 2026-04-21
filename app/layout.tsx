import "./globals.css";
import "./globals.css";

export const metadata = {
  title: "دعوة خطوبة خالد ❤️ مريم",
  description: "نتشرف بدعوتكم لحضور حفل خطوبتنا 💍🎉",

  openGraph: {
    title: "Khaled ❤️ Mariam Wedding",
    description: "Wedding Invitation 💍",
    images: [
      {
        url: "/cover.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}