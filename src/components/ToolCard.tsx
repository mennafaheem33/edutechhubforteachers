import React from "react";
import { ExternalLink } from "lucide-react";
import { Tool } from "@/data/tools";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import { motion } from "framer-motion";

interface ToolCardProps {
  tool: Tool;
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, index }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=64`;

  const gradeLevelLabel = tool.gradeLevel
    ? tool.gradeLevel === "kg"
      ? (language === "ar" ? "رياض الأطفال والصفوف الدنيا" : "KG & Lower Grades")
      : tool.gradeLevel === "upper"
      ? (language === "ar" ? "الصفوف العليا" : "Upper Grades")
      : (language === "ar" ? "جميع المراحل" : "All Grades")
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="tool-card group"
    >
      <div className="flex items-start gap-4">
        <img
          src={faviconUrl}
          alt={`${tool.name} logo`}
          className="h-12 w-12 rounded-lg object-contain bg-muted p-1.5 flex-shrink-0"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground truncate">
            {tool.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {language === "ar" ? tool.descriptionAr : tool.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground capitalize">
            {tool.type === "ai" ? t.aiTools : t.edtechTools}
          </span>
          {gradeLevelLabel && (
            <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
              {gradeLevelLabel}
            </span>
          )}
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:opacity-90"
        >
          {t.visitWebsite}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.div>
  );
};

export default ToolCard;
