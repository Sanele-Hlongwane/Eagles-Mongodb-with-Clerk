// pages/_app.tsx or any layout component (e.g., RootLayout.tsx)

import Head from 'next/head';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import NavBar from './components/NavBar';
import '../../styles/globals.css'; // Adjust path as per your project structure

export const metadata = {
  title: 'Eagles Ring',
  description: 'Investment platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          {/* Add other meta tags as needed */}
        </Head>
        
        <NavBar />
        
        <SignedOut>
          <SignInButton />
        </SignedOut>
        
        <SignedIn>
          <UserButton />
        </SignedIn>
        
        {children}
      </div>
    </ClerkProvider>
  );
}
