import React, { useState } from "react";
import { Link } from "react-router-dom";
import prompts from "@/data/prompts";
import { promptSlug } from "@/data/categoryRoutes";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const INITIAL_COUNT = 2;

const PromptLibrarySection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [expanded, setExpanded] = useState(false);

  const visiblePrompts = expanded ? prompts : prompts.slice(0, INITIAL_COUNT);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 border-t border-border">
      <h2 className="font-display text-xl font-bold text-foreground mb-6">
        {t.promptLibrary}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence initial={false}>
          {visiblePrompts.map((prompt, i) => {
            const title = language === "ar" ? prompt.titleAr : prompt.title;
            return (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: i < INITIAL_COUNT ? 0 : (i - INITIAL_COUNT) * 0.03 }}
              >
                <Link
                  to={`/prompt/${promptSlug(prompt.title)}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30"
                >
                  <div className="flex-shrink-0 rounded-lg bg-muted p-2">
                    <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {title}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {prompts.length > INITIAL_COUNT && (
        <div className="flex justify-start mt-6">
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="gap-2"
          >
            {expanded ? (
              <>
                {language === "ar" ? "عرض أقل" : "Show Less"}
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                {language === "ar" ? "عرض المزيد" : "Show More"}
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
};

export default PromptLibrarySection;
