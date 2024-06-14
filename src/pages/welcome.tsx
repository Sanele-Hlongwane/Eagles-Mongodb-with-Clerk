// components/Welcome.js
import { SignedIn, SignedOut } from '@clerk/nextjs'

export default function Welcome() {
  return (
    <div>
      <SignedIn>
        <h2>Welcome Back!</h2>
        <p>Were glad to see you again.</p>
      </SignedIn>
      <SignedOut>
        <h2>Welcome!</h2>
        <p>Please sign in to access your account.</p>
      </SignedOut>
    </div>
  )
}
