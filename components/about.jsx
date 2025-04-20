"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Image from "next/image";

export default function About() {
  const containerRef = useRef(null);

  return (
    <section id="about" className="py-16 md:py-24 container relative">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square w-full max-w-md mx-auto rounded-xl overflow-hidden">
          <Image
            src="/logo.jpg"
            alt="Profile"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-muted-foreground mb-4">
            I'm a passionate web developer with expertise in creating modern,
            responsive websites and applications. With a background in both
            design and development, I bring a unique perspective to every
            project.
          </p>
          <p className="text-muted-foreground mb-6">
            My journey in web development started 3 years ago, and since then,
            I've worked on various projects from business websites and even meme
            coin projects.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="font-medium mb-2">Skills</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>React & Next.js</li>
                <li>Seo Optimization</li>
                <li>UI/UX Design</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Interests</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>Web3 Development</li>
                <li>Blockchain</li>
                <li>Artificial Intelligence</li>
                <li>Business</li>
              </ul>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Download Resume
          </Button>
        </div>
      </div>
    </section>
  );
}
