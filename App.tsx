import React, { useState } from 'react';
import SignInPageDemo from './components/SignInPageDemo';
import SignupForm from './components/ui/registration';
import { WaitlistCard } from './components/ui/card-6';
import { MailCheck } from 'lucide-react';
import { BackgroundBeams } from './components/ui/background-beams';

const App: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  if (isSignedIn) {
    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 relative overflow-hidden">
             <div className="relative z-10">
               <WaitlistCard
                  icon={<MailCheck className="h-8 w-8" />}
                  title="Welcome to Placement Prime"
                  description="You're all set! You've joined the exclusive waitlist for our premium placement preparation tools. We'll notify you via email as soon as a spot becomes available."
                  footerContent={
                    <p className="text-sm text-muted-foreground">
                      Mistake?{" "}
                      <a
                        href="#"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsSignedIn(false);
                        }}
                      >
                        Sign Out
                      </a>
                    </p>
                  }
                />
             </div>
             <BackgroundBeams />
        </div>
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
