'use client'
import { useEffect } from "react"
import { useLoading } from "../hooks/ui/useLoading.hook"

export const Loading = () => {
    const { isLoading } = useLoading()

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isLoading])

    if (!isLoading) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
            <div className="relative">
                <div className="bg-[#076fe5] w-[13.6px] h-[32px] animate-[loading-keys_0.6s_infinite_ease-in-out] [animation-delay:0.12s] indent-[-9999em]">
                    <div className="absolute top-0 left-[-19.992px] bg-[#076fe5] w-[13.6px] h-[32px] content-[''] animate-[loading-keys_0.6s_infinite_ease-in-out]"></div>
                    <div className="absolute top-0 left-[19.992px] bg-[#076fe5] w-[13.6px] h-[32px] content-[''] animate-[loading-keys_0.6s_infinite_ease-in-out] [animation-delay:0.24s]"></div>
                </div>
            </div>
        </div>
    )
}