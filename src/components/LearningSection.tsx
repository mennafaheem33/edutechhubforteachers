import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import tools from "@/data/tools";
import ToolCard from "./ToolCard";
import { AnimatePresence } from "framer-motion";

const LearningSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const courses = tools.filter((tool) =>
    tool.categories.includes("Courses")
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 border-t border-border">
      <h2 className="font-display text-xl font-bold text-foreground mb-6">
        {t.learningSection}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {courses.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LearningSection;
