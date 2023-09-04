'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from './_contexts/sessionContext';


export function Providers({
    children
}: {
    children: React.ReactNode
}) {
    console.log("top of providers");
    return (
        <CacheProvider>
            <ChakraProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </ChakraProvider>
        </CacheProvider>
    )
}