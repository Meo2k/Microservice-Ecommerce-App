"use client"
import Logo from '@/components/svg/logo'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldLabel } from '@/components/ui/field'
import Step from '@/components/ui/step'
import { registerSchema, RegisterInput } from '@org/shared-fe'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';


const RegisterPage = () => {
  const [activeStep, setActiveStep] = useState<number>(1)

  // step 
  const registerStep = ["Create Account", "Verify Account", "Task Completed"]
  const shopStep = ["Create Account", "Verify Account", "Setup Shop", "Connect Bank"]


  // hook 
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });



  const onHandleSubmit = handleSubmit((data) => {
    console.log(data)
    

  });


  const [arrayStep, setArrayStep] = useState<string[]>(registerStep)

  const [stateForm, setStateForm] = useState<"buyer" | "vendor">("buyer")
  const maxSteps = stateForm === "buyer" ? registerStep.length : shopStep.length;

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

  const handleStateForm = (stateForm: "buyer" | "vendor") => {
    setActiveStep(1)
    setStateForm(stateForm)
    setArrayStep(stateForm === "buyer" ? registerStep : shopStep)
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

          {/* Header */}
          <div className='w-full flex flex-col items-center'>
            <h1 className='text-3xl font-bold'>Create Your Account</h1>
            <p className='text-foreground/55 font-medium mt-2'>Join our multi-vendor marketplace as a buyer or a vendor.</p>
            {/* Choose role */}

            <div className='w-full flex flex-col items-center mt-8'>
              <h1 className='text-base font-medium uppercase text-foreground/80 mb-4'>Choose your role</h1>
              <div className='w-full p-2 bg-gray-100/80 rounded-md flex items-center justify-between text-center'>
                <div className={`w-full font-semibold px-2 py-3 ${stateForm === "buyer" ? "shadow-md bg-white text-blue-500" : "transparent text-foreground/60"} rounded-md cursor-pointer`}
                  onClick={() => handleStateForm("buyer")}
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
                <div className={`w-full font-semibold px-2 py-3 ${stateForm === "vendor" ? "shadow-md bg-white text-blue-500" : "transparent text-foreground/60"} rounded-md cursor-pointer`}
                  onClick={() => handleStateForm("vendor")}
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

          {/* Form */}
          <form onSubmit={onHandleSubmit} className='w-full flex flex-col my-10'>
            <div className='w-full flex flex-col'>
              <div className='space-y-6 w-full'>
                <div className='space-y-2'>
                  <div className='font-bold text-sm'>Email Address</div>
                  <input type="email" id="email" placeholder="Enter your email"
                    {...register("email")}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500`} />
                  {errors.email && <p className='text-red-500 text-xs mt-1 font-medium'>{errors.email.message}</p>}
                </div>
                <div className='space-y-2'>
                  <div className='font-bold text-sm'>Password</div>
                  <input type="password" id="password" placeholder="Enter your password"
                    {...register("password")}
                    className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500`} />
                  {errors.password && <p className='text-red-500 text-xs mt-1 font-medium'>{errors.password.message}</p>}
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
          </form>

          {/* Button */}
          <div className='w-full flex gap-5'>
            <button onClick={(e) => {
              handleStep(-1)
            }} className=' w-[40%] font-semibold text-foreground/90 px-2 py-3 border-2 border-gray-200 hover:bg-gray-100 rounded-lg cursor-pointer'>Back</button>
            <button onClick={() => {
              onHandleSubmit()
              handleStep(1)
            }}
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
        </>
        )}

        {activeStep === 2 && (
          <div className='w-full flex flex-col'>
            <div className='space-y-2'>
              <div className='font-bold text-sm'>Email Address</div>
              <input type="email" id="email"
                placeholder="Enter your email"
                {...register("email")}
                className='w-full border border-gray-300 rounded-md p-3 disabled:bg-gray-200 text-foreground/60 disabled:cursor-not-allowed' disabled />
            </div>
          </div>
        )}
      </div>

      <div className='text-center mx-auto text-sm text-muted-foreground font-medium mt-20'>
        © 2026 Marketplace Global Inc. All rights reserved
      </div>
    </div>
  )
}

export default RegisterPage