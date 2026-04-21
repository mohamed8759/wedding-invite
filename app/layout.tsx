import "./globals.css";

export const metadata = {
  title: "دعوة خطوبة خالد ❤️ مريم",
  description: "نتشرف بدعوتكم لحضور حفل خطوبتنا 💍🎉",
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