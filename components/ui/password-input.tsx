"use client";

import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const passwordRequirements = [
    { label: "8+ characters", test: (v: string) => v.length >= 8 },
    { label: "Number", test: (v: string) => /\d/.test(v) },
    { label: "Lowercase", test: (v: string) => /[a-z]/.test(v) },
    { label: "Uppercase", test: (v: string) => /[A-Z]/.test(v) },
    {
        label: "Special (!@#$)",
        test: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
    },
] as const;

interface PasswordInputProps {
    id?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PasswordInput({ id, name, placeholder = "Enter your password", required, className, onChange }: PasswordInputProps) {
    const [value, setValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const getStrength = (value: string): number => {
        if (!value) return 0;
        return (
            passwordRequirements.filter((req) => req.test(value)).length * 20
        );
    };

    const strength = getStrength(value);
    const strengthLabel =
        strength <= 40 ? "Weak" : strength <= 80 ? "Medium" : "Strong";

    const strengthColor = 
        strength <= 40 ? "bg-red-500" : strength <= 80 ? "bg-amber-500" : "bg-emerald-500";

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (onChange) onChange(e);
    };

    return (
        <div className={cn("w-full space-y-3", className)}>
            <div className="relative">
                <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    id={id}
                    name={name}
                    required={required}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={handleValueChange}
                    placeholder={placeholder}
                    className={cn(
                        "w-full px-3 py-2 pr-10",
                        "rounded-md border",
                        "bg-background text-foreground",
                        "border-input",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        "transition-all duration-200"
                    )}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                        showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2
                    text-muted-foreground hover:text-foreground
                    transition-colors"
                >
                    {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                    ) : (
                        <Eye className="w-4 h-4" />
                    )}
                </button>
            </div>

            {value && (
                <div className="space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div
                            className={cn("h-full transition-all duration-500 ease-out", strengthColor)}
                            style={{ width: `${strength}%` }}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Strength:{" "}
                        <span className={cn(
                            "font-medium",
                            strength <= 40 ? "text-red-500" : strength <= 80 ? "text-amber-500" : "text-emerald-500"
                        )}>{strengthLabel}</span>
                    </p>
                </div>
            )}

            <div className="space-y-1.5 text-xs text-muted-foreground">
                {passwordRequirements.map(({ label, test }) => (
                    <div key={label} className="flex items-center gap-2">
                        {test(value) ? (
                            <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                            <Cross2Icon className="w-3.5 h-3.5 opacity-50" />
                        )}
                        <span className={cn(test(value) ? "text-foreground" : "text-muted-foreground")}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { PasswordInput }
