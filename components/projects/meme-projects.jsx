"use client";

import Image from "next/image";
import Link from "next/link";
import { memeProjects } from "@/data/projects";

export default function MemeProjects() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {memeProjects.map((project) => (
        <Link
          key={project.id}
          href={`/project/${project.id}`}
          className="group relative overflow-hidden rounded-lg aspect-square"
        >
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-sm text-gray-300 mb-3 line-clamp-3">
              All-time High{" "}
              <span className="text-green-500">{project.description}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
