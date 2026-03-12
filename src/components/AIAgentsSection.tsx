import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import tools from "@/data/tools";
import ToolCard from "./ToolCard";
import { AnimatePresence } from "framer-motion";

// AI Agents are tools categorized as "Chatbots" — AI conversational agents
const AI_AGENT_CATEGORIES = ["Chatbots"];

const AIAgentsSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const agents = tools.filter((tool) =>
    tool.categories.some((c) => AI_AGENT_CATEGORIES.includes(c))
  ).sort((a, b) => {
    if (a.topPick && !b.topPick) return -1;
    if (!a.topPick && b.topPick) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 border-t border-border">
      <h2 className="font-display text-xl font-bold text-foreground mb-6">
        {t.aiAgents}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {agents.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AIAgentsSection;
