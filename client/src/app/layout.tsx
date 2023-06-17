import '../styles/master.css'

export const metadata = {
  title: 'TotalWash',
  description: 'Clean Living',
  icons: {
    icon: {
      url: "/icon.png",
      type: "image/png",
    },
    shortcut: { url: "/icon.png", type: "image/png" },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-gray-100 h-full flex flex-col">
        <link rel="icon" href="/icon.png" sizes="any" />
        <div id="modal-root"/>
        {children}
      </body>
    </html>
  )
}
