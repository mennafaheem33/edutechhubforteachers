import React from "react";
import { ChevronDown } from "lucide-react";
import { SUBJECTS, CATEGORIES } from "@/data/tools";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import { FilterState } from "@/hooks/useFilterState";

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const handleSubject = (s: string) => {
    onFilterChange("subject", filters.subject === s ? "" : s);
  };

  const handleCategory = (c: string) => {
    onFilterChange("category", filters.category === c ? "" : c);
  };

  const handleType = (type: string) => {
    onFilterChange("type", filters.type === type ? "" : type);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 space-y-6">
      {/* Subject Filter */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground font-display">
          {t.subjectFilter}
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange("subject", "")}
            className={`filter-btn ${!filters.subject ? "filter-btn-active" : ""}`}
          >
            {t.all}
          </button>
          {SUBJECTS.map((subject) => (
            <button
              key={subject}
              onClick={() => handleSubject(subject)}
              className={`filter-btn ${filters.subject === subject ? "filter-btn-active" : ""}`}
            >
              {t.subjects[subject as keyof typeof t.subjects] || subject}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground font-display">
          {t.categoryFilter}
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange("category", "")}
            className={`filter-btn ${!filters.category ? "filter-btn-active" : ""}`}
          >
            {t.all}
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategory(category)}
              className={`filter-btn ${filters.category === category ? "filter-btn-active" : ""}`}
            >
              {t.categories[category as keyof typeof t.categories] || category}
            </button>
          ))}
        </div>
      </div>

      {/* Sort + Type Row */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-foreground font-display">
            {t.sortBy}:
          </label>
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => onFilterChange("sort", e.target.value)}
              className="appearance-none rounded-lg border border-border bg-card px-4 py-2 pr-8 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="top-picks">{t.topPicks}</option>
              <option value="a-z">{t.aToZ}</option>
              <option value="z-a">{t.zToA}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" style={{ right: language === "ar" ? "auto" : "0.5rem", left: language === "ar" ? "0.5rem" : "auto" }} />
          </div>
        </div>

        {/* Tool Type */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-foreground font-display">
            {t.toolType}:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onFilterChange("type", "")}
              className={`filter-btn ${!filters.type ? "filter-btn-active" : ""}`}
            >
              {t.all}
            </button>
            <button
              onClick={() => handleType("ai")}
              className={`filter-btn ${filters.type === "ai" ? "filter-btn-active" : ""}`}
            >
              {t.aiTools}
            </button>
            <button
              onClick={() => handleType("edtech")}
              className={`filter-btn ${filters.type === "edtech" ? "filter-btn-active" : ""}`}
            >
              {t.edtechTools}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
