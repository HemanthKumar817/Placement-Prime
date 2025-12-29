import React, { useState } from 'react';
import { SignInPage, Testimonial } from "./ui/sign-in";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner-1";
import { User, ShieldCheck, Mail, ArrowLeft, LogIn } from "lucide-react";
import { cn } from "../lib/utils";

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "Amazing platform! The user experience is seamless and the features are exactly what I needed."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "This service has transformed how I work. Clean design, powerful features, and excellent support."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "I've tried many platforms, but this one stands out. Intuitive, reliable, and genuinely helpful for productivity."
  },
];

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

interface GoogleAccount {
  name: string;
  email: string;
  avatar: string;
}

const MOCK_ACCOUNTS: GoogleAccount[] = [
  { name: "John Doe", email: "john.doe@gmail.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { name: "Jane Smith", email: "jane.smith@design.io", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
];

interface SignInPageDemoProps {
  onSignUpClick?: () => void;
  onSignInSuccess?: () => void;
}

type GoogleFlowStatus = 'idle' | 'loading' | 'picking' | 'verifying';

const SignInPageDemo: React.FC<SignInPageDemoProps> = ({ onSignUpClick, onSignInSuccess }) => {
  const [flowStatus, setFlowStatus] = useState<GoogleFlowStatus>('idle');
  const [selectedAccount, setSelectedAccount] = useState<GoogleAccount | null>(null);

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Sign In submitted:", data);
    if (onSignInSuccess) {
        onSignInSuccess();
    }
  };

  const handleGoogleSignIn = () => {
    setFlowStatus('loading');
    // Simulate initial network latency for OAuth handshake
    setTimeout(() => {
      setFlowStatus('picking');
    }, 1200);
  };

  const selectAccount = (account: GoogleAccount) => {
    setSelectedAccount(account);
    setFlowStatus('verifying');
    // Simulate token exchange and verification
    setTimeout(() => {
      setFlowStatus('idle');
      if (onSignInSuccess) {
        onSignInSuccess();
      }
    }, 1500);
  };

  const handleResetPassword = () => {
    alert("Reset Password clicked");
  }

  return (
    <div className="bg-background text-foreground w-full relative">
      {/* Main Sign In Page */}
      <SignInPage
        heroImageSrc="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
        testimonials={sampleTestimonials}
        onSignIn={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        onResetPassword={handleResetPassword}
        onCreateAccount={onSignUpClick}
      />

      {/* Global Loading Overlay for initial redirect simulation */}
      {flowStatus === 'loading' && (
        <div className="fixed inset-0 z-[100000] bg-background/80 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300">
          <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
            <div className="p-4 bg-card rounded-2xl shadow-xl border border-border">
              <GoogleLogo />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size={32} color="hsl(var(--primary))" />
              <p className="text-lg font-medium tracking-tight mt-4">Connecting to Google...</p>
              <p className="text-sm text-muted-foreground">Redirecting to secure login</p>
            </div>
          </div>
        </div>
      )}

      {/* Simulated Google OAuth Account Selection Modal */}
      <Modal.Modal 
        active={flowStatus === 'picking' || flowStatus === 'verifying'} 
        onClickOutside={() => flowStatus !== 'verifying' && setFlowStatus('idle')}
      >
        <Modal.Body className="p-0 overflow-hidden">
          <div className="flex flex-col">
            {/* Header */}
            <div className="p-8 pb-4 flex flex-col items-center text-center gap-4">
              <GoogleLogo />
              <div className="space-y-1">
                <h2 className="text-2xl font-medium tracking-tight text-[#3c4043] dark:text-gray-100">Choose an account</h2>
                <p className="text-sm text-[#5f6368] dark:text-gray-400">to continue to <span className="font-semibold text-primary">Placement Prime</span></p>
              </div>
            </div>

            {/* Account List */}
            <div className="px-2 pb-6">
              {flowStatus === 'verifying' ? (
                <div className="flex flex-col items-center justify-center py-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {selectedAccount && (
                    <div className="relative">
                      <img src={selectedAccount.avatar} className="w-20 h-20 rounded-full border-4 border-primary/20" alt="Selected account" />
                      <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1 rounded-full border-2 border-background">
                        <ShieldCheck size={16} />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-3">
                    <Spinner size={24} color="hsl(var(--primary))" />
                    <div className="text-center">
                      <p className="font-medium text-lg">Verifying your identity</p>
                      <p className="text-sm text-muted-foreground">Securing your session...</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  {MOCK_ACCOUNTS.map((account) => (
                    <button
                      key={account.email}
                      onClick={() => selectAccount(account)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors text-left group"
                    >
                      <div className="relative">
                        <img src={account.avatar} className="w-10 h-10 rounded-full bg-secondary object-cover" alt={account.name} />
                        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#3c4043] dark:text-gray-100 truncate">{account.name}</p>
                        <p className="text-xs text-[#5f6368] dark:text-gray-400 truncate">{account.email}</p>
                      </div>
                      <LogIn size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                  
                  <button
                    onClick={() => alert("Normally this would open an email input field.")}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors text-left group border-t border-border/50 mt-1"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                      <User size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#3c4043] dark:text-gray-100">Use another account</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Footer Information */}
            <div className="p-8 pt-0 text-xs text-[#5f6368] dark:text-gray-500 leading-relaxed">
              <p>
                To continue, Google will share your name, email address, language preference, and profile picture with Placement Prime. 
                Before using this app, you can review Placement Prime's <a href="#" className="text-blue-600 hover:underline">privacy policy</a> and <a href="#" className="text-blue-600 hover:underline">terms of service</a>.
              </p>
            </div>
          </div>
        </Modal.Body>
        
        {flowStatus === 'picking' && (
          <Modal.Actions className="justify-center border-none py-4">
             <Button variant="ghost" size="sm" onClick={() => setFlowStatus('idle')} className="text-muted-foreground">
                <ArrowLeft size={14} className="mr-2" /> Cancel
             </Button>
          </Modal.Actions>
        )}
      </Modal.Modal>
    </div>
  );
};

export default SignInPageDemo;
