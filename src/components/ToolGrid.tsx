import React, { useMemo } from "react";
import tools, { Tool } from "@/data/tools";
import prompts from "@/data/prompts";
import { FilterState } from "@/hooks/useFilterState";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import ToolCard from "./ToolCard";
import PromptCard from "./PromptCard";
import { AnimatePresence } from "framer-motion";

interface ToolGridProps {
  filters: FilterState;
}

const ToolGrid: React.FC<ToolGridProps> = ({ filters }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const isQuickPrompts = filters.category === "Quick Prompts";

  const filteredPrompts = useMemo(() => {
    if (!isQuickPrompts) return [];
    const search = filters.search.toLowerCase();
    return prompts.filter((p) => {
      const title = language === "ar" ? p.titleAr : p.title;
      const text = language === "ar" ? p.promptAr : p.prompt;
      if (search && !title.toLowerCase().includes(search) && !text.toLowerCase().includes(search)) {
        return false;
      }
      return true;
    });
  }, [filters.search, isQuickPrompts, language]);

  const filteredTools = useMemo(() => {
    if (isQuickPrompts) return [];

    let result = [...tools];

    // Subject filter
    if (filters.subject) {
      result = result.filter((t) => t.subjects.includes(filters.subject));
    }

    // Category filter
    if (filters.category) {
      result = result.filter((t) => t.categories.includes(filters.category));
    }

    // Type filter
    if (filters.type) {
      result = result.filter((t) => t.type === filters.type);
    }

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(search) ||
          t.description.toLowerCase().includes(search) ||
          t.descriptionAr.toLowerCase().includes(search)
      );
    }

    // Sort
    switch (filters.sort) {
      case "a-z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "top-picks":
      default:
        result.sort((a, b) => {
          if (a.topPick && !b.topPick) return -1;
          if (!a.topPick && b.topPick) return 1;
          return a.name.localeCompare(b.name);
        });
        break;
    }

    return result;
  }, [filters]);

  const count = isQuickPrompts ? filteredPrompts.length : filteredTools.length;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12">
      <div className="mb-4 text-sm text-muted-foreground">
        {count} {t.results}
      </div>

      {isQuickPrompts ? (
        filteredPrompts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredPrompts.map((prompt, i) => (
                <PromptCard key={prompt.id} prompt={prompt} index={i} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center text-muted-foreground">
            {t.noPromptsFound}
          </div>
        )
      ) : filteredTools.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex min-h-[200px] items-center justify-center text-muted-foreground">
          {t.noToolsFound}
        </div>
      )}
    </section>
  );
};

export default ToolGrid;
