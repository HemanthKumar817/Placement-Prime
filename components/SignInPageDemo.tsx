import React from 'react';
import { SignInPage, Testimonial } from "./ui/sign-in";

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

interface SignInPageDemoProps {
  onSignUpClick?: () => void;
  onSignInSuccess?: () => void;
}

const SignInPageDemo: React.FC<SignInPageDemoProps> = ({ onSignUpClick, onSignInSuccess }) => {
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Sign In submitted:", data);
    // Simulate successful sign in
    if (onSignInSuccess) {
        onSignInSuccess();
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Continue with Google clicked");
    // Mock functionality for Google Sign In
    const clientId = "MOCK_CLIENT_ID";
    const redirectUri = encodeURIComponent(window.location.origin);
    const scope = encodeURIComponent("email profile");
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
    
    // In a real app, you would redirect:
    // window.location.href = googleAuthUrl;
    
    // For demo purposes, we'll also trigger success for google sign in mock
    if (onSignInSuccess) {
      onSignInSuccess();
    }
  };
  
  const handleResetPassword = () => {
    alert("Reset Password clicked");
  }

  return (
    <div className="bg-background text-foreground w-full">
      <SignInPage
        heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
        testimonials={sampleTestimonials}
        onSignIn={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        onResetPassword={handleResetPassword}
        onCreateAccount={onSignUpClick}
      />
    </div>
  );
};

export default SignInPageDemo;
