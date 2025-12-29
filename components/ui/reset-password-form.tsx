"use client";

import * as React from "react";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { cn } from "../../lib/utils";

interface ResetPasswordFormProps {
  email: string;
  onVerifyCode: (code: string) => Promise<boolean>;
  onSubmit: (password: string) => Promise<void>;
  onCancel?: () => void;
}

const PasswordRequirement = ({ met, text }: { met: boolean; text: string; key?: React.Key }) => {
  const Icon = met ? CheckCircle2 : XCircle;
  return (
    <motion.div
      className={cn(
        "flex items-center text-sm",
        met ? "text-emerald-500" : "text-muted-foreground"
      )}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="mr-2 h-4 w-4" />
      {text}
    </motion.div>
  );
};

export const ResetPasswordForm = ({
  email,
  onVerifyCode,
  onSubmit,
  onCancel,
}: ResetPasswordFormProps) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const requirements = useMemo(() => {
    return [
      { text: "Lowercase letter", met: /[a-z]/.test(password) },
      { text: "8+ characters", met: password.length >= 8 },
      { text: "Uppercase letter", met: /[A-Z]/.test(password) },
      { text: "Number included", met: /[0-9]/.test(password) },
    ];
  }, [password]);

  const allRequirementsMet = requirements.every((req) => req.met);

  const handleOtpChange = (index: number, value: string) => {
    if (value && isNaN(Number(value))) return;

    const newOtpArr = otp.split('');
    while(newOtpArr.length <= index) newOtpArr.push('');
    newOtpArr[index] = value.slice(-1);
    
    const newOtpString = newOtpArr.join('');
    setOtp(newOtpString);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    if (newOtpString.length === 6 && !newOtpString.includes('')) {
        handleVerifyCode(newOtpString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData('text').slice(0, 6);
      if (/^\d+$/.test(pasteData)) {
          setOtp(pasteData);
          const targetIndex = Math.min(pasteData.length, 5);
          inputRefs.current[targetIndex]?.focus();
          if (pasteData.length === 6) {
            handleVerifyCode(pasteData);
          }
      }
  };

  const handleVerifyCode = async (code: string) => {
    setIsVerifying(true);
    setError(null);
    const success = await onVerifyCode(code);
    if (success) {
      setIsCodeVerified(true);
    } else {
      setError("Invalid code. Use 123456 for this demo.");
      setOtp("");
      inputRefs.current[0]?.focus();
    }
    setIsVerifying(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequirementsMet) return;
    setIsSubmitting(true);
    await onSubmit(password);
    setIsSubmitting(false);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-fit" onClick={onCancel}>
        <ArrowLeft size={16} />
        <span className="text-sm font-medium">Back to sign in</span>
      </div>
      
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Reset Password</h1>
      <p className="mb-8 text-sm text-muted-foreground leading-relaxed">
        We've sent a 6-digit verification code to <span className="font-semibold text-foreground">{email}</span>.
      </p>

      <form onSubmit={handleFormSubmit}>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.input
                  key={index}
                  whileFocus={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={otp[index] || ''}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isCodeVerified || isVerifying}
                  className="h-14 w-full text-center text-xl font-bold rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
            {isVerifying && (
              <p className="text-center text-sm text-muted-foreground animate-pulse">Verifying code...</p>
            )}
            {error && (
              <p className="text-center text-sm text-destructive font-medium animate-in shake duration-300">{error}</p>
            )}
            {isCodeVerified && (
              <motion.div
                className="flex items-center justify-center text-sm text-emerald-500 font-medium bg-emerald-500/10 py-2 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Code verified successfully
              </motion.div>
            )}
          </div>

          <AnimatePresence>
            {isCodeVerified && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-5 pt-2 border-t border-border/50">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">New password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10 h-12 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 gap-x-4 bg-muted/30 p-4 rounded-xl">
                    {requirements.map((req) => (
                      <PasswordRequirement key={req.text} met={req.met} text={req.text} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10">
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold rounded-xl transition-all active:scale-[0.98]"
            disabled={!allRequirementsMet || isSubmitting}
          >
            {isSubmitting ? "Updating Password..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
};
