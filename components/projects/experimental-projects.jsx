"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { experimentalProjects } from "@/data/projects";

export default function ExperimentalProjects() {
  return (
    <div className="space-y-8">
      <p className="text-muted-foreground text-center mb-6">
        These are just for fun experiments and coding adventures I've created
        while learning and exploring new technologies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experimentalProjects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden border-dashed hover:border-primary/50 transition-colors flex flex-col"
          >
            {/* Full view image */}
            <div className="relative w-full h-56 md:h-64">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                Just for fun
              </div>
            </div>

            {/* Content section */}
            <div className="flex flex-col flex-1 justify-between">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {project.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline "
                      className="bg-muted px-3 py-1 rounded-full text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground hidden">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between mt-auto">
                <Button
                  asChild
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                >
                  <Link href={`/project/${project.id}`}>View Details</Link>
                </Button>
                {project.liveUrl && (
                  <Button variant="outline" asChild>
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      See it live
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
