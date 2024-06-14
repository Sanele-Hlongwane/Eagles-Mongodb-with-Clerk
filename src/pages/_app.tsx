// _app.tsx
import { ClerkProvider } from '@clerk/nextjs';
import '../styles/globals.css'; // adjust path as necessary
import NavBar from '../components/NavBar'; // adjust path as necessary
import type { AppProps } from 'next/app'; // Import AppProps type from Next.js

type MyAppProps = AppProps & {
  // Add additional props if needed
  // For example, you can define custom props here
};

// Replace 'pk_test_YXdha2Utb3dsLTU1LmNsZXJrLmFjY291bnRzLmRldiQ' with your actual Clerk publishable key
const clerkSettings = {
  apiKey: 'pk_test_YXdha2Utb3dsLTU1LmNsZXJrLmFjY291bnRzLmRldiQ',
  includeStyles: true, // Set to true if you want Clerk to include its default styles
};

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <ClerkProvider {...clerkSettings}>
      <NavBar />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
