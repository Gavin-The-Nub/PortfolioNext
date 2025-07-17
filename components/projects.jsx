"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  businessProjects,
  memeProjects,
  experimentalProjects,
} from "@/data/projects";
import ShinyText from "./ShinyText";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("default");

  const categories = [
    { key: "default", label: "Default" },
    { key: "business", label: "Business" },
    { key: "personal", label: "Personal" },
    { key: "memecoin", label: "Meme Coin" },
  ];

  // Interleave business and personal projects for the default category
  function interleave(arr1, arr2) {
    const maxLength = Math.max(arr1.length, arr2.length);
    const result = [];
    for (let i = 0; i < maxLength; i++) {
      if (i < arr1.length) result.push({ ...arr1[i], category: "business" });
      if (i < arr2.length) result.push({ ...arr2[i], category: "personal" });
    }
    return result;
  }

  const businessList = businessProjects;
  const personalList = experimentalProjects;

  const allProjects = [
    ...businessProjects.map((p) => ({ ...p, category: "business" })),
    ...memeProjects.map((p) => ({ ...p, category: "memecoin" })),
    ...experimentalProjects.map((p) => ({ ...p, category: "personal" })),
  ];

  let filteredProjects;
  if (selectedCategory === "default") {
    filteredProjects = interleave(businessList, personalList);
  } else {
    filteredProjects = allProjects.filter(
      (project) => project.category === selectedCategory
    );
  }

  return (
    <section
      className="bg-gray-50 py-20 dark:bg-black transition-colors"
      id="projects"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          <ShinyText
            text="My Projects"
            speed={3}
            className="text-2xl md:text-3xl font-bold mb-4"
          />
        </h2>
        {/* Category Buttons */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              variant={selectedCategory === cat.key ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.key)}
              className="text-sm capitalize"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Grid of Cards */}
        <motion.div
          layout
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden bg-zinc-100 dark:bg-zinc-900 transition-colors">
                  <CardContent className="p-0">
                    <div className="group relative">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 dark:bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="text-xl font-semibold text-white dark:text-zinc-100 mb-2">
                          {project.title}
                        </h3>
                        <p className="mb-2 text-xs text-gray-300 dark:text-zinc-300 text-center px-2">
                          {project.description}
                        </p>
                        {/* Stack/Technologies */}
                        {project.technologies && (
                          <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {project.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-800 text-gray-200 text-xs px-2 py-1 rounded dark:bg-gray-200 dark:text-gray-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2">
                          {/* View Details Button */}
                          <a
                            href={`/project/${project.id}`}
                            className="inline-block mt-2 px-4 py-2 bg-gray-100/50 text-white rounded hover:bg-gray-600 text-xs font-semibold transition-colors"
                          >
                            View Details
                          </a>
                          {/* Visit Site Button */}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold transition-colors"
                            >
                              Visit Site
                            </a>
                          )}
                        </div>
                        {/* Disclaimer for specific projects */}
                        {[
                          "DLSL Admission Office",
                          "Forbes Capital Cars",
                          "F2A Cars",
                          "Feralde",
                        ].includes(project.title) && (
                          <div className="w-full mt-4 px-5 text-[10px] text-gray-300 dark:text-gray-400 text-center absolute bottom-5 left-0">
                            Disclaimer: This website was created as a personal
                            portfolio project and is not affiliated with or
                            endorsed by {project.title}. All content, including
                            branding, is used for educational and demonstration
                            purposes only.
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
