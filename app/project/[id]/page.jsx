"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allProjects } from "@/data/projects";
import { notFound } from "next/navigation";

export default function ProjectPage() {
  const { id } = useParams();
  const project = allProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const isExperimental = project.category === "experimental";

  return (
    <main className="container py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/#projects" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
          />
          {isExperimental && (
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              Just for fun
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-muted px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="prose dark:prose-invert mb-8">
            <p className="text-muted-foreground md:text-sm text-xs mb-4">
              {project.description}
            </p>
            <ul className="text-muted-foreground mb-4 md:text-sm text-xs list-disc pl-5">
              {project.longDescription.split("\n").map((line, index) => (
                <li key={index}>{line.replace(/^- /, "")}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button asChild>
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {isExperimental ? "See it live" : "Visit Website"}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}

            {project.githubUrl && (
              <Button variant="outline" asChild>
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  View Code
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
