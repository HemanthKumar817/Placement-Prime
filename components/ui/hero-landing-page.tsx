import React, { useEffect, useState } from "react"
import { ArrowRight, LogOut } from 'lucide-react'
import { cn } from "../../lib/utils"

interface TuringLandingProps {
  onSignOut?: () => void;
  onStartPreparing?: () => void;
}

export function TuringLanding({ onSignOut, onStartPreparing }: TuringLandingProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative font-sans">
      {/* Subtle blue background gradient overlays */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,132,255,0.15)] via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-bl from-[rgba(0,132,255,0.1)] via-transparent to-transparent opacity-50" />
      </div>

      {/* Header for Sign Out */}
      <header className="absolute top-0 w-full z-50 px-6 py-6 flex justify-end">
        <button 
            onClick={onSignOut}
            className="flex items-center gap-2 text-sm text-[#b8b8b8] hover:text-white transition-colors cursor-pointer z-50"
        >
            <LogOut size={16} />
            Sign Out
        </button>
      </header>

      {/* Main Content */}
      <main className="main min-h-screen flex items-center justify-center pb-20 pt-32 relative">
        {/* Background Layer with Smooth Transition */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#111]">
            {/* Fallback Image - Visible initially */}
            <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                alt="Background"
                className={cn(
                    "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000",
                    isVideoLoaded ? "opacity-0" : "opacity-60"
                )}
            />
            
            {/* Smoke Effect Video */}
            <video
                className={cn(
                    "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000",
                    isVideoLoaded ? "opacity-60" : "opacity-0"
                )}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedData={() => setIsVideoLoaded(true)}
            >
                <source src="https://mybycketvercelprojecttest.s3.sa-east-1.amazonaws.com/animation-bg.mp4" type="video/mp4" />
            </video>

            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40 z-10" />
        </div>

        <div className="content-wrapper w-full max-w-[1400px] mx-auto px-6 md:px-[60px] flex flex-col items-center justify-center relative z-[3] gap-12 text-center">
          {/* Centered Content */}
          <div className="max-w-[900px] w-full flex flex-col items-center">
            <h1 className="text-5xl md:text-[80px] font-light leading-[1.1] mb-8 tracking-[-2px]">
              Accelerate your
              <br />
              Placement Journey
            </h1>
            <p className="text-lg leading-relaxed text-[#b8b8b8] mb-12 font-normal max-w-2xl mx-auto">
              Placement Prime connects ambitious students with top-tier opportunities.
              Master technical skills, aptitude, and interviews with our intelligent platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full">
              <button 
                onClick={onStartPreparing}
                className="flex items-center justify-center gap-2.5 bg-[#0084ff] text-white py-3.5 px-7 rounded-md text-base font-medium hover:bg-[#0066cc] hover:translate-x-0.5 transition-all duration-200 shadow-[0_0_20px_rgba(0,132,255,0.3)]"
              >
                Start Preparing
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Section - Centered */}
          <div className="flex gap-10 md:gap-20 items-center justify-center w-full">
            <div className="text-center">
              <div className="text-4xl md:text-[64px] font-light leading-none mb-3">500+</div>
              <div className="text-sm md:text-base text-[#b8b8b8] font-normal">Hiring Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-[64px] font-light leading-none mb-3">10k+</div>
              <div className="text-sm md:text-base text-[#b8b8b8] font-normal">Students Placed</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}