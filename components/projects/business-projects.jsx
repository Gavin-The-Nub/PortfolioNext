"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { businessProjects } from "@/data/projects";

export default function BusinessProjects() {
  const [current, setCurrent] = useState(0);
  const length = businessProjects.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  if (!Array.isArray(businessProjects) || businessProjects.length <= 0) {
    return null;
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl relative h-[450px] md:h-[500px]">
        {businessProjects.map((project, index) => (
          <div
            key={project.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              index === current
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex flex-col md:grid md:grid-cols-5 h-full">
              {/* Image */}
              <div className="w-full md:col-span-3 flex items-center justify-center p-4 md:p-0">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="object-contain w-full h-auto max-h-80 md:max-h-full"
                />
              </div>

              {/* Details */}
              <div className="w-full md:col-span-2 bg-card p-4 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-muted px-3 py-1 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  >
                    <Link href={`/project/${project.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Live Site
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 bottom-4 z-10 bg-background/80 backdrop-blur-sm md:left-4 md:top-1/2 md:bottom-auto md:-translate-y-1/2"
        onClick={prevSlide}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 bottom-4 z-10 bg-background/80 backdrop-blur-sm md:right-4 md:top-1/2 md:bottom-auto md:-translate-y-1/2"
        onClick={nextSlide}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {businessProjects.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? "bg-primary" : "bg-muted"
            }`}
            onClick={() => setCurrent(index)}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
