import React, { useState } from 'react';
import SignInPageDemo from './components/SignInPageDemo';
import SignupForm from './components/ui/registration';
import { HeroGeometric } from './components/ui/shape-landing-hero';
import { NotFoundPage } from './components/ui/404-page-not-found';

const App: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [show404, setShow404] = useState(false);

  if (show404) {
    return (
      <NotFoundPage onGoHome={() => setShow404(false)} />
    );
  }

  if (isSignedIn) {
    return (
        <HeroGeometric 
          onSignOut={() => setIsSignedIn(false)} 
          onStartPreparing={() => setShow404(true)}
        />
    )
  }

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center">
      {isSignUp ? (
        <SignupForm onSignInClick={() => setIsSignUp(false)} />
      ) : (
        <SignInPageDemo 
            onSignUpClick={() => setIsSignUp(true)} 
            onSignInSuccess={() => setIsSignedIn(true)}
        />
      )}
    </div>
  );
};

export default App;