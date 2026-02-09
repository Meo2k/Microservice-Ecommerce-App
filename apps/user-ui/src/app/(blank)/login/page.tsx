'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldLabel } from '@/components/ui/field'
import Logo from '@/components/svg/logo'
import Google from '@/components/svg/google'
import Facebook from '@/components/svg/facebook'
import { useLoading, useLogin } from '@org/shared-fe'
import { useForm } from 'react-hook-form'
import { LoginInput, loginSchema } from '@org/shared-fe'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const LoginPage = () => {
  //state 
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  // hook
  const { setIsLoading } = useLoading()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const router = useRouter()
  const { mutate: loginMutation, isPending } = useLogin({
    onSuccess: (data) => {
      toast.success(data.message)
      router.push('/')
    },
    onError: (error) => {
      toast.error(error?.message)
    }
  })

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const onSubmit = handleSubmit((data) => {
    loginMutation(data)
  })

  useEffect(() => {
    setIsLoading(isPending)
  }, [isPending, setIsLoading])


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
      <div className='w-full lg:w-1/2 lg:pt-12 pt-8 pb-5 px-6 sm:px-16 md:px-44 lg:px-14 xl:px-32 2xl:px-40 bg-background flex flex-col justify-center'>
        {/* Header */}

        {/* logo for mobile */}
        <div className='flex items-center justify-center gap-2 lg:hidden'>
          <span className='border-2 border-gray-200 rounded-lg'>
            <Logo size={40} />
          </span>
          <span className='text-2xl font-bold'>MiEmark</span>
        </div>
        <div className='my-7 lg:text-left text-center'>
          <h1 className='text-3xl font-bold'>Welcome Back</h1>
          <p className='text-muted-foreground/80 font-medium mt-2'>Access your dashboard and manage your orders.</p>
        </div>
        {/* Form component */}
        <div className='flex flex-col items-start justify-center w-full space-y-10'>
          <form className='w-full' onSubmit={onSubmit}>
            <div className='space-y-6 w-full'>
              <div className='space-y-2'>
                <div className='font-bold text-sm'>Email Address</div>
                <input type="email" id="email" placeholder="Enter your email"
                  {...register('email')}
                  className='w-full border border-gray-300 rounded-md p-3' />
                {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <div className='font-bold text-sm'>Password</div>
                  <div className='flex items-center justify-end text-sm font-bold text-blue-500 hover:underline'>
                    <Link href="/resend-otp">Forgot your password?</Link>
                  </div>
                </div>
                <div className='relative'>
                  <input
                    type={isShowPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
                    className='w-full border border-gray-300 rounded-md p-3'
                    {...register('password')}
                  />
                  {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                  <span onClick={handleShowPassword}
                    className="material-symbols-outlined cursor-pointer absolute right-3 top-3">
                    {isShowPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Checkbox id="remember-me" name="remember-me" />
                <FieldLabel htmlFor="remember-me">
                  Remember me for 30 days
                </FieldLabel>
              </div>

              {/* Button  */}
              <div>
                <Button type='submit' className='w-full py-6 rounded-lg' size='lg'>Sign in to account</Button>
                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t border-gray-300'></span>
                  </div>
                  <div className='relative flex justify-center text-xs my-14 uppercase font-bold'>
                    <span className='bg-background px-3 text-muted-foreground/80'>Or continue with</span>
                  </div>
                </div>
                <div className='flex items-center gap-3 flex-col sm:flex-row'>
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
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default LoginPage