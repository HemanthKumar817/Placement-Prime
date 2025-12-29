import React, { useState } from 'react';
import SignInPageDemo from './components/SignInPageDemo';
import SignupForm from './components/ui/registration';
import { HeroGeometric } from './components/ui/shape-landing-hero';
import { NotFoundPage } from './components/ui/404-page-not-found';
import { ResetPasswordForm } from './components/ui/reset-password-form';

type AppView = 'signin' | 'signup' | 'forgot-password' | 'home' | '404';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('signin');
  const [userEmail, setUserEmail] = useState('student@placementprime.com');

  const handleSignInSuccess = () => setView('home');
  const handleSignUpClick = () => setView('signup');
  const handleSignInClick = () => setView('signin');
  
  const handleForgotPasswordClick = (email?: string) => {
    if (email) setUserEmail(email);
    setView('forgot-password');
  };

  const handleSignOut = () => setView('signin');
  const handle404 = () => setView('404');
  const handleGoHome = () => setView('home');

  // Logic for ResetPasswordForm
  const handleVerifyCode = (code: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock: Code 123456 is valid
        resolve(code === "123456");
      }, 1000);
    });
  };

  const handleSubmitNewPassword = (password: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert("Your password has been successfully reset. You can now sign in with your new password.");
        setView('signin');
        resolve();
      }, 1500);
    });
  };

  if (view === '404') {
    return <NotFoundPage onGoHome={handleGoHome} />;
  }

  if (view === 'home') {
    return (
      <HeroGeometric 
        onSignOut={handleSignOut} 
        onStartPreparing={handle404}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      {view === 'signup' && (
        <SignupForm onSignInClick={handleSignInClick} />
      )}
      
      {view === 'signin' && (
        <SignInPageDemo 
          onSignUpClick={handleSignUpClick} 
          onSignInSuccess={handleSignInSuccess}
          onForgotPasswordClick={() => handleForgotPasswordClick()}
        />
      )}

      {view === 'forgot-password' && (
        <ResetPasswordForm 
          email={userEmail}
          onVerifyCode={handleVerifyCode}
          onSubmit={handleSubmitNewPassword}
          onCancel={handleSignInClick}
        />
      )}
    </div>
  );
};

export default App;
