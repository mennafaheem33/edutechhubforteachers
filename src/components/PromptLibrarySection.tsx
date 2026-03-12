import React from "react";
import { Link } from "react-router-dom";
import prompts from "@/data/prompts";
import { promptSlug } from "@/data/categoryRoutes";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const PromptLibrarySection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 border-t border-border">
      <h2 className="font-display text-xl font-bold text-foreground mb-6">
        {t.promptLibrary}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {prompts.map((prompt, i) => {
          const title = language === "ar" ? prompt.titleAr : prompt.title;
          return (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.02 }}
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
      </div>
    </section>
  );
};

export default PromptLibrarySection;
