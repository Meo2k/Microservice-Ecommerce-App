import './global.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


export const metadata = {
  title: 'MiEmark | Best Ecommerce',
  description: 'The best microservice ecommerce platform.',
  icons: {
    icon: '/logo.png',
  },
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
