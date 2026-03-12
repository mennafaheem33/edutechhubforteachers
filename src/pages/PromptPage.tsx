import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import prompts from "@/data/prompts";
import { promptSlug } from "@/data/categoryRoutes";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

const PromptPage: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const prompt = prompts.find((p) => promptSlug(p.title) === slug);

  if (!prompt) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Prompt not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  const title = language === "ar" ? prompt.titleAr : prompt.title;
  const text = language === "ar" ? prompt.promptAr : prompt.prompt;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-8">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToHome}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {title}
            </h1>
            <span className="inline-block text-xs text-muted-foreground bg-muted rounded-full px-3 py-1 mb-6">
              {prompt.category}
            </span>

            <div className="rounded-xl border border-border bg-card p-6 md:p-8">
              <div className="text-foreground leading-relaxed whitespace-pre-wrap text-base md:text-lg max-h-[60vh] overflow-y-auto">
                {text}
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  {t.promptCopied}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {t.copyPrompt}
                </>
              )}
            </button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PromptPage;
