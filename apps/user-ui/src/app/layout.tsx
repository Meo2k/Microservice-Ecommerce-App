import './global.css';

export const metadata = {
  title: 'MiEmark | Best Ecommerce',
  description: 'The best microservice ecommerce platform.',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
