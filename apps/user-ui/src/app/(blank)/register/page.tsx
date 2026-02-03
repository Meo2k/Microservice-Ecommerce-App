"use client"
import Logo from '@/components/svg/logo'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldLabel } from '@/components/ui/field'
import Step from '@/components/ui/step'
import Link from 'next/link'
import React, { useState } from 'react'

const RegisterPage = () => {
  const [activeStep, setActiveStep] = useState<number>(1)

  // step 
  const registerStep = ["Create Account", "Verify Account", "Task Completed"]
  const shopStep = ["Create Account", "Verify Account", "Setup Shop", "Connect Bank"]

  const [arrayStep, setArrayStep] = useState<string[]>(registerStep)

  const [stateForm, setStateForm] = useState<"buyer" | "vendor">("buyer")

  const handleStep = (stepOffset: number) => {
    const maxSteps = stateForm === "buyer" ? registerStep.length : shopStep.length;

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
      <div className='flex items-center justify-center gap-2 lg:hidden'>
        <span className='border-2 border-gray-200 rounded-lg'>
          <Logo size={40} />
        </span>
        <span className='text-2xl font-bold'>MiEmark</span>
      </div>
      {/* Step */}
      <Step activeStep={activeStep} arrayStep={arrayStep} />
      {/* Containter */}
      <div className='w-[90%] md:w-[60%] flex flex-col items-center rounded-md shadow-lg px-5 py-8 border-2 border-gray-100 bg-white'>
        {/* Header */}
        <div className='w-full flex flex-col items-center mb-8'>
          <h1 className='text-3xl font-bold'>Create Your Account</h1>
          <p className='text-foreground/55 font-medium mt-2 mb-8'>Join our multi-vendor marketplace as a buyer or a vendor.</p>
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
        {/* Form */}
        <form action="" className='w-full flex flex-col my-10'>

          {/* For buyer or vendor */}
          {activeStep === 1 && (
            <div className='w-full flex flex-col'>
              {/* Form for buyer */}
              <div className='space-y-6 w-full'>
                <div className='space-y-2'>
                  <div className='font-bold text-sm'>Email Address</div>
                  <input type="email" id="email" name="email" placeholder="Enter your email" className='w-full border border-gray-300 rounded-md p-3' />
                </div>
                <div className='space-y-2'>
                  <div className='font-bold text-sm'>Password</div>
                  <input type="password" id="password" name="password" placeholder="Enter your password" className='w-full border border-gray-300 rounded-md p-3' />
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
          )}
          {activeStep === 2 && (
            <div className='w-full flex flex-col'>
              {/* Form for vendor */}

            </div>
          )}

        </form>
        {/* Button */}
        <div className='w-full flex gap-5'>
          <button onClick={(e) => {
            handleStep(-1)
          }} className=' w-[40%] font-semibold text-foreground/90 px-2 py-3 border-2 border-gray-200 hover:bg-gray-100 rounded-lg cursor-pointer'>Back</button>
          <button onClick={(e) => handleStep(1)} className='w-[60%] px-2 py-3 font-semibold bg-blue-500 text-white rounded-lg cursor-pointer hover:opacity-90'>Next</button>
        </div>

        {/* logIn */}
        <div className='w-full flex items-center justify-center gap-2 mt-10'>
          <p className='text-foreground/60 text-sm font-medium'>Already have an account?</p>
          <Link href="/login" className='text-blue-500 font-semibold'>Log in here</Link>
        </div>
      </div>

      <div className='text-center mx-auto text-sm text-muted-foreground font-medium mt-20'>
        © 2026 Marketplace Global Inc. All rights reserved
      </div>
    </div>
  )
}

export default RegisterPage