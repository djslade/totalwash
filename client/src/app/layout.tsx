import "../styles/master.css";

export const metadata = {
  title: "TotalWash",
  description: "Clean Living",
  icons: {
    icon: {
      url: "/icon.webp",
      type: "image/webp",
    },
    shortcut: { url: "/icon.webp", type: "image/webp" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-gray-100 h-full flex flex-col">
        <link rel="icon" href="/icon.webp" sizes="any" />
        <div id="modal-root" />
        {children}
      </body>
    </html>
  );
}
