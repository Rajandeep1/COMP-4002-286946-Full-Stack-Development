// LoginPrompt — displayed in place of the Add Employee / Add Role forms
// when the user is not logged in.
// Lab 5.1: "The Entry Forms on both pages should instead present a small
// window with a link to log into the application."

import { SignInButton } from '@clerk/clerk-react';

interface LoginPromptProps {
  action: string; // e.g. "add an employee" or "add a new role"
}

const LoginPrompt = ({ action }: LoginPromptProps) => (
  <section className="form-section">
    <div className="form-inner login-prompt">
      <span className="login-prompt-icon">🔒</span>
      <h2 className="login-prompt-heading">Sign in to continue</h2>
      <p className="login-prompt-text">
        You must be signed in to {action}. Browsing the directory is available to everyone.
      </p>
      <SignInButton mode="modal">
        <button className="form-submit">Sign In</button>
      </SignInButton>
    </div>
  </section>
);

export default LoginPrompt;
