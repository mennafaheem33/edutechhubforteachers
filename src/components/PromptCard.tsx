import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { PromptTemplate } from "@/data/prompts";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import { motion } from "framer-motion";

interface PromptCardProps {
  prompt: PromptTemplate;
  index: number;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, index }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [copied, setCopied] = useState(false);

  const title = language === "ar" ? prompt.titleAr : prompt.title;
  const text = language === "ar" ? prompt.promptAr : prompt.prompt;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="prompt-card"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2.5 py-0.5">{prompt.category}</span>
      </div>
      <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
        {text}
      </div>
      <button
        onClick={handleCopy}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
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
  );
};

export default PromptCard;
