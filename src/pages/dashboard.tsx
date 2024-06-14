// src/pages/dashboard.js
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import styles from './dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <SignedIn>
        {/* Content to display when user is signed in */}
        <p>Welcome! You are signed in.</p>
      </SignedIn>
      <SignedOut>
        {/* Redirect to sign-in page when user is signed out */}
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
