"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import dynamic from "next/dynamic";

// Dynamically import SplashCursor, only on desktop
const SplashCursor = dynamic(() => import("@/components/ui/splashcursor"), {
  ssr: false,
});

export default function ClientSplashCursor() {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return <SplashCursor />;
}
