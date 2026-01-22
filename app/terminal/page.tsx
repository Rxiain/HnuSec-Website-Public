"use client";

import { useEffect, useState } from "react";
import Terminal from "@/components/terminal";
import BootSequence from "@/components/boot-sequence";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CyberParticles } from "@/components/cyber-particles";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function TerminalPage() {
  const [booting, setBooting] = useState(true);
  const router = useRouter();
  const [command, setCommand] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Reset booting state when component mounts to ensure animation always plays
  useEffect(() => {
    setBooting(true);
    setIsLoaded(true);

    // Shorter boot sequence on mobile
    const timer = setTimeout(
      () => {
        setBooting(false);
      },
      isMobile ? 1500 : 2500,
    );

    // Check if there's a command to execute from sessionStorage
    const savedCommand = sessionStorage.getItem("terminalCommand");
    if (savedCommand) {
      setCommand(savedCommand);
      // Note: We don't clear the command here, it will be cleared in the Terminal component
    }

    return () => clearTimeout(timer);
  }, [isMobile]);

  const handleBackClick = () => {
    if (isNavigating) return;

    setIsNavigating(true);

    // Add a small delay to allow for animation
    setTimeout(() => {
      router.push("/");
    }, 100);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f0f0f5]">
      {/* Full-page background animation */}
      <div className="fixed inset-0 z-0">
        <CyberParticles />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-4 top-4 z-50"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={handleBackClick}
          className="border-var-color-5/30 bg-var-color-3/50 text-gray-900 backdrop-blur-sm hover:bg-var-color-4/30"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </motion.div>

      <div className="container relative z-10 mx-auto flex h-[calc(100vh-6rem)] flex-col px-2 pt-16 pb-8 md:px-4">
        {booting ? (
          <BootSequence isMobile={isMobile} />
        ) : (
          <Terminal initialCommand={command} />
        )}
      </div>
    </main>
  );
}
