'use client'
import { createContext, useState } from 'react';

export const LoadingContext = createContext({
    isLoading: false,
    setIsLoading: (value: boolean) => { },
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSetIsLoading = (value: boolean) => {
        setIsLoading(value);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading: handleSetIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};