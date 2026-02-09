import { Slide, ToastContainer } from 'react-toastify';
import './global.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { LoadingProvider, Loading } from '@org/shared-fe';


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
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body>
        <QueryProvider>
          <LoadingProvider>
            <main>
              {children}
            </main>
            <Loading />
          </LoadingProvider>
        </QueryProvider>
        <ToastContainer
          position="top-center"
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          autoClose={2000}
          transition={Slide}
        />
      </body>
    </html>
  )
}
