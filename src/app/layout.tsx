import './globals.css';
import '@coinbase/onchainkit/styles.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from './providers';
import { cookieToInitialState } from 'wagmi';
import { headers } from 'next/headers';
import { getConfig } from './wagmi';
import { ChatbotButton } from '@/components/Chatbot/ChatbotButton';

export const metadata: Metadata = {
  title: 'DeGift - AI-Powered Crypto Gift Cards',
  description: 'Send personalized crypto gift cards with AI-generated messages',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get('cookie'),
  );
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col items-center justify-start">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers initialState={initialState}>
            <div className="w-full max-w-7xl">
              <Navbar />
              <main className="w-full">{children}</main>
              <Footer />
            </div>
            <ChatbotButton />
          </Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
