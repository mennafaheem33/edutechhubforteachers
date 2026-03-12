import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { CATEGORY_ROUTES } from "@/data/categoryRoutes";
import { SUBJECTS } from "@/data/tools";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";

const HomeCategoryNav: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      navigate(`/subject/${value.toLowerCase().replace(/\s+/g, "-")}`);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      {/* Category Title */}
      <h2 className="font-display text-xl font-bold text-foreground">
        {t.categoryFilter}
      </h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORY_ROUTES.map((route) => {
          const label =
            t.categories[route.category as keyof typeof t.categories] ||
            route.category;
          return (
            <Link
              key={route.category}
              to={route.path}
              className="filter-btn whitespace-nowrap hover:border-primary hover:text-primary transition-all"
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Subject Dropdown */}
      <div className="space-y-2 pt-2">
        <p className="text-sm font-medium text-muted-foreground">
          {t.subjectDropdownLabel}
        </p>
        <div className="relative inline-block">
          <select
            onChange={handleSubjectChange}
            defaultValue=""
            className="appearance-none rounded-lg border border-border bg-card px-4 py-2.5 pr-10 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
          >
            <option value="" disabled>
              {t.subjectDropdownDefault}
            </option>
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {t.subjects[subject as keyof typeof t.subjects] || subject}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" style={{ right: language === "ar" ? "auto" : "0.75rem", left: language === "ar" ? "0.75rem" : "auto" }} />
        </div>
      </div>
    </section>
  );
};

export default HomeCategoryNav;
