import '../styles/master.css'

export const metadata = {
  title: 'TotalWash',
  description: 'Fulfilling all your washroom-related needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="modal-root"/>
        {children}
      </body>
    </html>
  )
}
