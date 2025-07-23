"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Image from "next/image";
import TiltedCard from "./TiltedCard";
import ShinyText from "./ShinyText";
import { useIsMobile } from "@/hooks/use-mobile";

export default function About() {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  return (
    <section id="about" className="py-16 md:py-24 container relative ">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square w-full max-w-md mx-auto rounded-xl">
          {isMobile ? (
            <Image
              src="/logo.jpg"
              alt="Profile"
              width={350}
              height={350}
              className="rounded-xl object-cover w-full h-full"
              priority
            />
          ) : (
            <TiltedCard
              imageSrc="/logo.jpg"
              altText="Profile"
              captionText="That's me!"
              containerHeight="350px"
              containerWidth="100%"
              imageHeight="350px"
              imageWidth="350px"
              rotateAmplitude={12}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={false}
              overlayContent={
                <p className="text-white text-center text-sm font-semibold">
                  Web Developer & Designer
                </p>
              }
            />
          )}
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            <ShinyText
              text="About Me"
              speed={3}
              className="text-2xl md:text-3xl font-bold mb-6"
            />
          </h2>
          <p className="text-muted-foreground mb-4 text-xs md:text-sm font-extralight">
            I'm a passionate web developer with expertise in creating modern,
            responsive websites and applications. With a background in both
            design and development, I bring a unique perspective to every
            project.
          </p>
          <p className="text-muted-foreground mb-6 text-xs md:text-sm font-extralight">
            My journey in web development started 3 years ago, and since then,
            I've worked on various projects from business websites and even meme
            coin projects.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8 font-extralight">
            <div>
              <h3 className="font-medium mb-2">
                <ShinyText
                  text="Skills"
                  speed={3}
                  className="font-medium mb-2"
                />
              </h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>Next.js & Supabase</li>
                <li>Seo Optimization</li>
                <li>UI/UX Design</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">
                <ShinyText
                  text="Interests"
                  speed={3}
                  className="font-medium mb-2"
                />
              </h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>AI Workflow & Agents</li>
                <li>AI Automation</li>
                <li>Web3 Development</li>
                <li>Ecommerce</li>
              </ul>
            </div>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => alert("Resume is not available at the moment.")}
          >
            <FileText className="h-4 w-4" />
            <ShinyText text="Download Resume" speed={3} className="inline" />
          </Button>
        </div>
      </div>
    </section>
  );
}
