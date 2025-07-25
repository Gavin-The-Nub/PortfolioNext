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
import Image from "next/image";

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
            {filteredProjects.slice(0, 5).map((project) => (
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
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={400}
                        className="w-full transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Overlay temporarily removed for testing */}
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
