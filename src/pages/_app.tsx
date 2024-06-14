import { ClerkProvider } from '@clerk/nextjs';
import NavBar from '../components/NavBar';
import '../globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <NavBar />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
