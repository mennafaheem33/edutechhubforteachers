import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import tools from "@/data/tools";
import ToolCard from "./ToolCard";
import { AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const AI_AGENT_CATEGORIES = ["Chatbots"];
const INITIAL_COUNT = 2;

const AIAgentsSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [expanded, setExpanded] = useState(false);

  const agents = tools
    .filter((tool) => tool.categories.some((c) => AI_AGENT_CATEGORIES.includes(c)))
    .sort((a, b) => {
      if (a.topPick && !b.topPick) return -1;
      if (!a.topPick && b.topPick) return 1;
      return a.name.localeCompare(b.name);
    });

  const visibleAgents = expanded ? agents : agents.slice(0, INITIAL_COUNT);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 border-t border-border">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6">
        {t.aiAgents}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visibleAgents.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {agents.length > INITIAL_COUNT && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 rounded-full border border-secondary px-8 py-2.5 text-sm font-medium text-secondary transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground"
          >
            {expanded ? (
              <>{language === "ar" ? "عرض أقل" : "Show Less"}<ChevronUp className="h-4 w-4" /></>
            ) : (
              <>{language === "ar" ? "عرض المزيد" : "Show More"}<ChevronDown className="h-4 w-4" /></>
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default AIAgentsSection;
