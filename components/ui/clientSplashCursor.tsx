"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import SplashCursor from "@/components/ui/splashcursor";

export default function ClientSplashCursor() {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return <SplashCursor />;
}
