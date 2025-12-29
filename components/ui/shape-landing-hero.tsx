"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Circle, LogOut, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { SlidingNumber } from "./sliding-number";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

interface HeroGeometricProps {
    badge?: string;
    title1?: string;
    title2?: string;
    onSignOut?: () => void;
    onStartPreparing?: () => void;
}

function HeroGeometric({
    badge = "Placement Prime",
    title1 = "Accelerate your",
    title2 = "Placement Journey",
    onSignOut,
    onStartPreparing
}: HeroGeometricProps) {
    const [partnersCount, setPartnersCount] = useState(0);
    const [placedCount, setPlacedCount] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPartnersCount(500);
            setPlacedCount(10);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303] text-white font-sans">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

            <header className="absolute top-0 w-full z-50 px-6 py-6 flex justify-end">
                <button 
                    onClick={onSignOut}
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            </header>

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />
                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />
                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />
                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
                    >
                        <Circle className="h-2 w-2 fill-rose-500/80" />
                        <span className="text-sm text-white/60 tracking-wide">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-6 md:mb-8 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                {title1}
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-base sm:text-lg md:text-xl text-white/40 mb-12 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
                            Connect with top-tier opportunities. Master technical skills, aptitude, and interviews with our intelligent platform.
                        </p>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center gap-12"
                    >
                        <button 
                            onClick={onStartPreparing}
                            className="group flex items-center justify-center gap-2.5 bg-white text-black py-4 px-10 rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300"
                        >
                            Start Preparing
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="flex gap-16 md:gap-32 items-center justify-center w-full mt-4">
                            <div className="text-center">
                                <div className="text-4xl md:text-6xl font-light leading-none mb-3 flex items-center justify-center gap-1">
                                    <SlidingNumber value={partnersCount} />+
                                </div>
                                <div className="text-sm md:text-base text-white/40 font-normal uppercase tracking-[2px]">Hiring Partners</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-6xl font-light leading-none mb-3 flex items-center justify-center gap-1">
                                    <SlidingNumber value={placedCount} />k+
                                </div>
                                <div className="text-sm md:text-base text-white/40 font-normal uppercase tracking-[2px]">Students Placed</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric }