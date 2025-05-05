"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BusinessProjects from "@/components/projects/business-projects";
import MemeProjects from "@/components/projects/meme-projects";
import ExperimentalProjects from "@/components/projects/experimental-projects";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("business");

  return (
    <section id="projects" className="py-16 md:py-24 container">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">My Projects</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-xs md:text-sm">
          Explore my portfolio of work across different categories, from
          business websites to creative experiments and meme coin projects.
        </p>
      </div>

      <Tabs
        defaultValue="business"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="meme">Meme Coin</TabsTrigger>
          <TabsTrigger value="experimental">Personal</TabsTrigger>
        </TabsList>
        <TabsContent value="business">
          <BusinessProjects />
        </TabsContent>
        <TabsContent value="meme">
          <MemeProjects />
        </TabsContent>
        <TabsContent value="experimental">
          <ExperimentalProjects />
        </TabsContent>
      </Tabs>
    </section>
  );
}
