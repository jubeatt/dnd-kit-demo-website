import Link from 'next/link'
import { HomeIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-4 text-9xl font-bold text-gray-300'>404</h1>
        <div className='mb-8 text-center'>
          <h2 className='mb-2 text-2xl font-semibold text-gray-700'>Oops! Page not found</h2>
          <p className='text-gray-500'>The page you&apos;re looking for doesn&apos;t seem to exist.</p>
        </div>
        <Link
          href='/'
          className='inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700'
        >
          <HomeIcon size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
