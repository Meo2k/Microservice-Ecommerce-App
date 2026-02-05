
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}
 
export default function NotFound() {
  return (
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='flex items-center gap-4 flex-row mb-5'>
          <div className='text-4xl font-bold border-r-2 border-gray-700 pr-4'>404</div>
          <span className='text-2xl font-semibold'>Page Not Found</span>
        </div>
        <p className='text-gray-500'>This page does not exist.</p>
      </div>
  )
}