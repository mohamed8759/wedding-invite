import "./globals.css";

export const metadata = {
  title: "دعوة خطوبة خالد ❤️ مريم",
  description: "نتشرف بدعوتكم لحضور حفل خطوبتنا 💍🎉",
  openGraph: {
    title: "Khaled ❤️ Mariam Wedding",
    description: "Wedding Invitation 💍",
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