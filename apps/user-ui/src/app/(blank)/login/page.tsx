import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldLabel } from '@/components/ui/field'
import Logo from '@/components/svg/logo'
import Google from '@/components/svg/google'
import Facebook from '@/components/svg/facebook'

export const metadata = {
  title: 'MiEmark - Login',
  description: 'Login page',
}

const LoginPage = () => {
  return (
    
    <div className='flex flex-col lg:flex-row min-h-screen w-screen'>
      {/* Left component */}
      <div className='hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-900 items-center justify-center h-auto'>
        <div className='relative w-full h-full'>
          <Image src='/market.png' fill alt='image-login' className='opacity-50 object-cover ' sizes="100%" />
          <div className="absolute inset-0 bg-gradient-to-br mix-blend-multiply"></div>
        </div>
        <div className='absolute top-20 space-y-10 text-white p-20'>
            <div className='flex items-center gap-2'>
               <Logo />
                <span className='text-2xl font-bold'>MiEmark</span>
            </div>
            <h1 className='text-5xl font-extrabold mb-4'>Explore the world's largest multi-vendor hub.</h1>
            <p className='text-lg opacity-80'>Join thousands of vendors and millions of shoppers in a seamless commerce experience. </p>
        </div>
        
      </div>

      {/* Right component  */}
      <div className='w-full lg:w-1/2 pt-14 pb-5 lg:px-28 md:px-52 px-10 bg-background'>
        {/* Header */}
          <div className='mb-8'>
            <h1 className='text-4xl font-bold'>Welcome Back</h1>
            <p className='text-muted-foreground/80 font-medium mt-2'>Access your dashboard and manage your orders.</p>
          </div>
        {/* Form component */}
        <div className='flex flex-col items-start justify-center w-full space-y-10'>
          <form className='w-full'>
            <div className='space-y-6 w-full'>
              <div className='space-y-2'>
                <div className='font-bold text-sm'>Email Address</div>
                <input type="email" id="email" name="email" placeholder="Enter your email" className='w-full border border-gray-300 rounded-md p-3' />
              </div>
              <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <div className='font-bold text-sm'>Password</div>
                <div className='flex items-center justify-end text-sm font-bold text-blue-500 hover:underline'>
                  <Link href="/resend-otp">Forgot your password?</Link>
                </div>
              </div>
              <input type="password" id="password" name="password" placeholder="Enter your password" className='w-full border border-gray-300 rounded-md p-3' />
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Checkbox id="remember-me" name="remember-me" />
                <FieldLabel htmlFor="remember-me">
                  Remember me for 30 days
                </FieldLabel>
              </div>
              <Button className='w-full py-6 rounded-lg' size='lg'>Sign in to account</Button>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t border-gray-300'></span>
                </div>
                <div className='relative flex justify-center text-xs my-14 uppercase font-bold'>
                  <span className='bg-background px-3 text-muted-foreground/80'>Or continue with</span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='outline' className='w-full' size='lg'> <Google /> Login with Google</Button>
                <Button variant='outline' className='w-full' size='lg'> <Facebook /> Login with Facebook</Button>
              </div>
              <div>
                <div className='text-center mt-8 mx-auto text-muted-foreground/80 text-sm font-medium'>
                  Don't have an account? &nbsp; 
                  <Link href="/register" className='text-blue-500 font-bold hover:underline'> Sign up for free</Link>
                </div>
                <div className='text-center mx-auto text-xs text-muted-foreground font-medium mt-10'>
                  © 2026 Marketplace Global Inc. All rights reserved
                </div>
              </div>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  )
}

export default LoginPage