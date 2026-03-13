import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import tools from "@/data/tools";
import ToolCard from "./ToolCard";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const INITIAL_COUNT = 2;

const LearningSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [expanded, setExpanded] = useState(false);

  const courses = tools
    .filter((tool) => tool.categories.includes("Courses"))
    .sort((a, b) => a.name.localeCompare(b.name));

  const visibleCourses = expanded ? courses : courses.slice(0, INITIAL_COUNT);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 border-t border-border">
      <h2 className="font-display text-xl font-bold text-foreground mb-6">
        {t.learningSection}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visibleCourses.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {courses.length > INITIAL_COUNT && (
        <div className="flex justify-start mt-6">
          <Button variant="outline" onClick={() => setExpanded(!expanded)} className="gap-2">
            {expanded ? (
              <>{language === "ar" ? "عرض أقل" : "Show Less"}<ChevronUp className="h-4 w-4" /></>
            ) : (
              <>{language === "ar" ? "عرض المزيد" : "Show More"}<ChevronDown className="h-4 w-4" /></>
            )}
          </Button>
        </div>
      )}
    </section>
  );
};

export default LearningSection;
