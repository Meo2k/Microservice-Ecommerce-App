"use client"
import Logo from '@/components/svg/logo'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldLabel } from '@/components/ui/field'
import Step from '@/components/ui/step'
import {
  registerSchema, RegisterInput, verifyOtpSchema, VerifyOtpInput,
  useLoading, useRegister, useResendOtp, useVerifyOtp,
  maskEmail, formatTime, PermissionConfig, PERMISSION_CONFIG
} from '@org/shared-fe'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify'


const RegisterPage = () => {
  //state 
  const [activeStep, setActiveStep] = useState<number>(1)
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
  const inputRefs = useRef<HTMLInputElement[]>([])
  const [timer, setTimer] = useState<number>(60)
  const [canResend, setCanResend] = useState<boolean>(false)
  const { setIsLoading } = useLoading();
  // step 
  const registerStep = ["Create Account", "Verify Account", "Task Completed"]
  const shopStep = ["Create Account", "Verify Account", "Setup Shop", "Connect Bank"]

  useEffect(() => {
    if (activeStep === 2) {
      inputRefs.current[0]?.focus()
    }
  }, [activeStep])



  // hook register form
  const { register, handleSubmit: onSubmitRegister, setValue: setValueRegister, watch: watchRegister, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  // hook verify form
  const { handleSubmit: onSubmitVerify, setValue: setValueVerify, formState: { errors: errorsVerify } } = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  });


  // send otp mutation (only used for manual resend button)
  const { mutate: sendOtpQuery, isPending: isPendingSendOtp } = useResendOtp({
    onSuccess: (data: any) => {
      toast.success(data?.message)
      setTimer(60)
      setCanResend(false)
      startResendTimer()
    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  })

  // register mutation
  const { mutate: registerMutation, isPending: isPendingRegister } = useRegister({
    onSuccess: (data: any) => {
      setActiveStep(2);
      setTimer(60)
      setCanResend(false)
      startResendTimer()
    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  })

  // verify mutation
  const { mutate: verifyMutation, isPending: isPendingVerify } = useVerifyOtp({
    onSuccess: (data: any) => {
      toast.success(data?.message);
      setActiveStep(3);
    },
    onError: (error: any) => {
      document.getElementById("otp-error")!.textContent = error?.message;
    }
  })

  useEffect(() => {
    setIsLoading(isPendingRegister || isPendingVerify || isPendingSendOtp)
  }, [isPendingRegister, isPendingVerify, isPendingSendOtp, setIsLoading])

  // update hook form verify otp according to state otp
  useEffect(() => {
    setValueVerify('otp', otp.join(''));

    // email from register form
    setValueVerify('email', watchRegister('email'));
  }, [otp, setValueVerify, watchRegister]);




  const handleSubmitRegister = onSubmitRegister((data) => {
    registerMutation(data)
  });

  const handleSubmitVerify = onSubmitVerify((data) => {
    verifyMutation(data)
  });

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value !== "" && !/^[0-9]$/.test(value)) return;
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setCanResend(true)
          return 0;
        }
        return prev - 1
      })
    }, 1000)
    return interval
  }


  const [arrayStep, setArrayStep] = useState<string[]>(registerStep)

  const [stateForm, setStateForm] = useState<PermissionConfig>(PERMISSION_CONFIG.BUYER)
  const maxSteps = stateForm === PERMISSION_CONFIG.BUYER ? registerStep.length : shopStep.length;

  const handleStep = (stepOffset: number) => {

    if (stepOffset === 1) {
      if (activeStep < maxSteps) {
        setActiveStep((prev) => prev + 1);
      }
    } else if (stepOffset === -1) {
      if (activeStep > 1) {
        setActiveStep((prev) => prev - 1);
      }
    }
  }

  const handleStateForm = (stateForm: PermissionConfig) => {
    setStateForm(stateForm)
    setArrayStep(stateForm === PERMISSION_CONFIG.BUYER ? registerStep : shopStep)
    setValueRegister("isSeller", stateForm === PERMISSION_CONFIG.SELLER)
  }



  return (
    <div className='w-full flex flex-col items-center py-10 min-h-screen bg-gray-100/80'>
      {/* Logo */}
      <div className='flex items-center justify-center gap-2'>
        <span className='border-2 border-gray-200 rounded-lg'>
          <Logo size={40} />
        </span>
        <span className='text-2xl font-bold'>MiEmark</span>
      </div>
      {/* Step */}
      <Step activeStep={activeStep} arrayStep={arrayStep} />
      {/* Containter */}
      <div className='w-[90%] md:w-[60%] flex flex-col items-center rounded-md shadow-lg px-5 py-8 border-2 border-gray-100 bg-white'>

        {activeStep === 1 && (<>

          {/* Form  */}
          <form onSubmit={handleSubmitRegister} className='w-full flex flex-col'>
            {/* Header */}
            <div className='w-full flex flex-col items-center'>
              <h1 className='text-3xl font-bold'>Create Your Account</h1>
              <p className='text-foreground/55 font-medium mt-2'>Join our multi-vendor marketplace as a buyer or a vendor.</p>
              {/* Choose role */}

              <div className='w-full flex flex-col items-center mt-8'>
                <h1 className='text-base font-medium uppercase text-foreground/80 mb-4'>Choose your role</h1>
                <div className='w-full p-2 bg-gray-100/80 rounded-md flex items-center justify-between text-center'>
                  <div className={`w-full font-semibold px-2 py-3 ${stateForm === PERMISSION_CONFIG.BUYER ? "shadow-md bg-white text-blue-500" : "transparent text-foreground/60"} rounded-md cursor-pointer`}
                    onClick={() => handleStateForm(PERMISSION_CONFIG.BUYER)}
                  >
                    <div className='flex items-center justify-center gap-2'>
                      <span className="material-symbols-outlined">
                        shopping_bag
                      </span>
                      <span>
                        I am a Buyer
                      </span>
                    </div>
                  </div>
                  <div className={`w-full font-semibold px-2 py-3 ${stateForm === PERMISSION_CONFIG.SELLER ? "shadow-md bg-white text-blue-500" : "transparent text-foreground/60"} rounded-md cursor-pointer`}
                    onClick={() => handleStateForm(PERMISSION_CONFIG.SELLER)}
                  >
                    <div className='flex items-center justify-center gap-2'>
                      <span className="material-symbols-outlined">
                        storefront
                      </span>
                      <span>
                        I am a Vendor
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Body */}
            <div className='w-full flex flex-col mt-8'>
              <div className='space-y-6 w-full'>
                <div className='space-y-2'>
                  <div className='font-bold text-sm'>Email Address</div>
                  <input type="email" id="email" placeholder="Enter your email"
                    {...register("email")}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500`} />
                  {errors.email && <p className='text-red-500 text-xs mt-1 font-medium'>{errors.email.message}</p>}
                </div>
                <div className='relative space-y-2'>
                  <input
                    type={isShowPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
                    className='w-full border border-gray-300 rounded-md p-3'
                    {...register('password')}
                  />
                  {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                  <span onClick={handleShowPassword}
                    className="material-symbols-outlined cursor-pointer absolute right-3 top-2">
                    {isShowPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </div>

                {/* Policy */}
                <div className='flex items-center gap-2 text-foreground/60 text-sm '>
                  <Checkbox id="remember-me" name="remember-me" />
                  <FieldLabel htmlFor="remember-me">
                    I agree to the Terms of Service and Privacy Policy.
                  </FieldLabel>
                </div>
              </div>

            </div>

            {/* Button */}
            <div className='w-full flex gap-5 mt-10'>
              <button
                type='button'
                onClick={(e) => {
                  handleStep(-1)
                }} className=' w-[40%] font-semibold text-foreground/90 px-2 py-3 border-2 border-gray-200 hover:bg-gray-100 rounded-lg cursor-pointer'>Back</button>
              <button
                type='submit'
                className='w-[60%] px-2 py-3 font-semibold bg-blue-500
            text-white rounded-lg cursor-pointer hover:opacity-90'>
                Sign Up
              </button>
            </div>

            {/* logIn */}
            <div className='w-full flex items-center justify-center gap-2 mt-10'>
              <p className='text-foreground/60 text-sm font-medium'>Already have an account?</p>
              <Link href="/login" className='text-blue-500 font-semibold hover:underline'>Log in here</Link>
            </div>
          </form>
        </>
        )}

        {activeStep === 2 && (
          <form onSubmit={handleSubmitVerify} className='w-full flex flex-col'>

            {/* email section */}
            <div className='flex items-center gap-2 flex-col'>
              {/* Icon/Visual Header */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary !text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                </div>
                <h1 className='font-bold text-2xl mb-3'>Verify Your Account</h1>
                <div className='flex flex-col justify-center items-center text-foreground/60 text-base font-medium'>
                  <span>
                    We've sent a 6-digit verification code to
                  </span>
                  <span className='font-semibold text-primary text-sm'> {maskEmail(watchRegister("email"))}</span>
                </div>
              </div>
            </div>

            {/* otp */}
            <div className='flex flex-col items-center justify-center gap-2 my-5'>
              <div className='flex items-center justify-center gap-2'>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el
                    }}
                    className='w-12 h-12 text-center text-2xl font-bold border-2
                     border-gray-300 outline-none rounded-lg 
                       focus:outline-none focus:border-gray-400'
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  />
                ))}
              </div>

              {/* error message */}
              <div className='flex flex-col items-start justify-center gap-2 mt-8'>
                {errorsVerify.otp && (
                  <p className='text-red-500 text-sm'>{errorsVerify.otp.message}</p>
                )}

                <div id="otp-error" className="text-red-500 text-sm"></div>
              </div>

              <button type='submit'
                className={`lg:w-[60%] w-[90%] font-semibold text-foreground/90 px-2 py-4 border-2 border-gray-200 
              hover:bg-gray-100 rounded-lg cursor-pointer flex items-center justify-center gap-2
                text-white bg-primary/95 hover:bg-primary/80 mb-8 mt-2 ${isPendingVerify || otp.some(digit => digit === "") ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={isPendingVerify || otp.some(digit => digit === "")}
              >
                <span>Verify Code</span>
                <span className="material-symbols-outlined">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* time out */}
            <div className='flex flex-col items-center justify-center gap-2'>
              <div className='flex items-center gap-2'>
                <p className='text-foreground/60 text-sm font-medium'>Didn't receive a code?</p>
                <button type='button' onClick={() => {
                  sendOtpQuery({
                    email: watchRegister("email"),
                  })
                }}
                  className={`font-semibold hover:underline text-sm ${canResend ? 'text-primary' : 'text-gray-400 cursor-not-allowed'}`}
                  disabled={!canResend}
                >
                  Resend code
                </button>
                <div className='text-foreground/60 text-sm font-medium'>
                  in: <span className='font-semibold'>{formatTime(timer)}</span>
                </div>
              </div>
            </div>
          </form>
        )}

        {activeStep === 3 && (
          <div className='flex flex-col items-center justify-center gap-2'>
            <h1 className='text-3xl font-bold'>Task Completed</h1>
            <p className='text-foreground/60 text-sm font-medium'>Your account has been created successfully</p>
            <div className='w-full flex items-center justify-center gap-2 mt-10'>
              <Link href="/login" className='text-blue-500 font-semibold hover:underline'>Log in here</Link>
            </div>
          </div>
        )}
      </div>

      <div className='text-center mx-auto text-sm text-muted-foreground font-medium mt-20'>
        © 2026 MiEmark Inc. All rights reserved
      </div>
    </div>
  )
}

export default RegisterPage