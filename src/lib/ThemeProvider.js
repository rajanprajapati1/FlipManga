"use client";
import { ThemeProvider } from 'next-themes'

function ThemeProviderNext({ children }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            themes={['light', 'dark']}
        >
            {children}
        </ThemeProvider>
    )
}

export default ThemeProviderNext;