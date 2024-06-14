import { ClerkProvider } from '@clerk/nextjs';
import NavBar from '../components/NavBar';
import '../globals.css';

// Define types for Component and pageProps
type MyAppProps = {
  Component: any; // Adjust 'any' to the specific type of your Component if known
  pageProps: any; // Adjust 'any' to the specific type of your pageProps if known
};

// Use MyAppProps as the type for props
export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <ClerkProvider>
      <NavBar />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
