import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import tools, { SUBJECTS } from "@/data/tools";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const SubjectPage: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { subject } = useParams<{ subject: string }>();

  // Match subject by lowercased slug
  const matchedSubject = SUBJECTS.find(
    (s) => s.toLowerCase().replace(/\s+/g, "-") === subject?.toLowerCase()
  );

  const filteredTools = useMemo(() => {
    if (!matchedSubject) return [];
    return tools
      .filter((tool) => tool.subjects.includes(matchedSubject))
      .sort((a, b) => {
        if (a.topPick && !b.topPick) return -1;
        if (!a.topPick && b.topPick) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [matchedSubject]);

  const subjectLabel = matchedSubject
    ? (t.subjects[matchedSubject as keyof typeof t.subjects] || matchedSubject)
    : subject;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-8">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToHome}
          </Link>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {subjectLabel}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {filteredTools.length} {t.results}
          </p>

          {filteredTools.length > 0 ? (
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
      </main>
      <Footer />
    </div>
  );
};

export default SubjectPage;
