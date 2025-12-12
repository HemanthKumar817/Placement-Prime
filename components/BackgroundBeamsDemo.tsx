"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { Input } from "./ui/input";

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-background relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p className="text-muted-foreground max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to Placement Prime — your ultimate platform for career success.
          We provide reliable, scalable, and customizable solutions to help students and professionals excel in their placement journey. Whether you&apos;re preparing for aptitude tests, enhancing technical skills, or getting personalized interview guidance, Placement Prime has got you covered.
        </p>
        <Input
          type="email"
          placeholder="hi@manuarora.in"
          className="w-full mt-4 relative z-10"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}