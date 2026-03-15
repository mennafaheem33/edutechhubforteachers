import React, { useState } from "react";
import { Link } from "react-router-dom";
import prompts from "@/data/prompts";
import { promptSlug } from "@/data/categoryRoutes";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Calendar,
  List,
  Users,
  HelpCircle,
  FileEdit,
  CheckSquare,
  BarChart3,
  Ticket,
  Lightbulb,
  Snowflake,
  MessageSquare,
  FolderKanban,
  Gamepad2,
  FileText,
  BookOpen,
  FileSearch,
  ListChecks,
  Layers,
  HeartHandshake,
  Languages,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const PROMPT_ICONS: Record<string, React.ReactNode> = {
  "Lesson Plan Generator": <ClipboardList className="h-5 w-5 text-primary" />,
  "Weekly Plan Builder": <Calendar className="h-5 w-5 text-primary" />,
  "Unit Outline Creator": <List className="h-5 w-5 text-primary" />,
  "Differentiated Lesson Planner": <Users className="h-5 w-5 text-secondary" />,
  "Quiz Generator": <HelpCircle className="h-5 w-5 text-accent" />,
  "Exam Question Builder": <FileEdit className="h-5 w-5 text-accent" />,
  "Multiple Choice Maker": <CheckSquare className="h-5 w-5 text-accent" />,
  "Rubric Creator": <BarChart3 className="h-5 w-5 text-primary" />,
  "Exit Ticket Generator": <Ticket className="h-5 w-5 text-secondary" />,
  "Interactive Activity Ideas": <Lightbulb className="h-5 w-5 text-secondary" />,
  "Icebreaker Generator": <Snowflake className="h-5 w-5 text-secondary" />,
  "Class Discussion Prompts": <MessageSquare className="h-5 w-5 text-primary" />,
  "Project-Based Learning Ideas": <FolderKanban className="h-5 w-5 text-primary" />,
  "Gamified Lesson Creator": <Gamepad2 className="h-5 w-5 text-accent" />,
  "Simplify This Text": <FileText className="h-5 w-5 text-secondary" />,
  "Explain Like I'm 10": <BookOpen className="h-5 w-5 text-secondary" />,
  "Summary Generator": <FileSearch className="h-5 w-5 text-primary" />,
  "Key Points Extractor": <ListChecks className="h-5 w-5 text-primary" />,
  "Vocabulary List Builder": <Languages className="h-5 w-5 text-accent" />,
  "Adapt for Different Levels": <Layers className="h-5 w-5 text-secondary" />,
  "Support Plan Ideas": <HeartHandshake className="h-5 w-5 text-primary" />,
  "ELL Support Prompt": <Languages className="h-5 w-5 text-secondary" />,
  "Learning Style Adapter": <Eye className="h-5 w-5 text-accent" />,
};

const INITIAL_COUNT = 2;

const PromptLibrarySection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [expanded, setExpanded] = useState(false);

  const visiblePrompts = expanded ? prompts : prompts.slice(0, INITIAL_COUNT);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6">
        {t.promptLibrary}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <AnimatePresence initial={false}>
          {visiblePrompts.map((prompt, i) => {
            const title = language === "ar" ? prompt.titleAr : prompt.title;
            const icon = PROMPT_ICONS[prompt.title] || <FileText className="h-5 w-5 text-primary" />;
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
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-secondary/40"
                >
                  <div className="flex-shrink-0 rounded-lg bg-muted p-2.5">
                    {icon}
                  </div>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {title}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {prompts.length > INITIAL_COUNT && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 rounded-full border border-secondary px-8 py-2.5 text-sm font-medium text-secondary transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground"
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
          </button>
        </div>
      )}
    </section>
  );
};

export default PromptLibrarySection;
