"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Facebook, Linkedin, Instagram } from "lucide-react";
import { PortfolioScene } from "@/components/portfolio-scene";
import { LoadingScreen } from "@/components/loading-screen";
import { useState } from "react";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSceneLoaded = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen with smooth transition */}
      <LoadingScreen isLoading={isLoading} />

      <section className="relative container">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <PortfolioScene onLoaded={handleSceneLoaded} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center h-screen flex items-center justify-center flex-col">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Creative Developer & <span className="text-blue-500">Designer</span>
          </h1>
          <p className="text-sm md:text-xl text-gray-300 mb-8 font-extralight">
            Building innovative web experiences with a focus on performance,
            accessibility, and cutting-edge design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="px-6 py-6 md:text-base font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              <Link
                href="/#projects"
                className="flex items-center font-extralight"
              >
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-6 py-6 md:text-base font-extralight border-blue-500 text-blue-400 hover:bg-blue-900/20"
            >
              <Link href="/#contact">Contact Me</Link>
            </Button>
          </div>
          <div className="flex justify-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-white hover:text-blue-400"
            >
              <Link
                href="https://www.facebook.com/IanDev18"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-white hover:text-blue-400"
            >
              <Link
                href="https://www.linkedin.com/in/gavin-hadrian-lodor-full-stack-web-developer-188a38322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app&fbclid=IwY2xjawJx1gZleHRuA2FlbQIxMAABHgusCqq2j3ttZolnwZyEspyVdsMy_PADteNaHF0z2ukLnaWX2PecZOgWwfPH_aem_8-tKMy4e_5G-gJGviDLOJA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-white hover:text-blue-400"
            >
              <Link
                href="https://www.instagram.com/iandev18/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
