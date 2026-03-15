import React, { useMemo } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { getCategoryByPath } from "@/data/categoryRoutes";
import tools, { SUBJECTS } from "@/data/tools";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const CategoryPage: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const params = useParams<{ "*": string }>();
  const path = "/" + (params["*"] || "");
  const route = getCategoryByPath(path);

  const [searchParams, setSearchParams] = useSearchParams();
  const subject = searchParams.get("subject") || "";
  const sort = searchParams.get("sort") || "top-picks";
  const type = searchParams.get("type") || "";

  const setFilter = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    }, { replace: true });
  };

  const filteredTools = useMemo(() => {
    if (!route) return [];
    let result = tools.filter((tool) => tool.categories.includes(route.category));

    if (subject) {
      result = result.filter((t) => t.subjects.includes(subject));
    }
    if (type) {
      result = result.filter((t) => t.type === type);
    }

    switch (sort) {
      case "a-z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        result.sort((a, b) => {
          if (a.topPick && !b.topPick) return -1;
          if (!a.topPick && b.topPick) return 1;
          return a.name.localeCompare(b.name);
        });
    }

    return result;
  }, [route, subject, sort, type]);

  if (!route) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Page not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  const pageTitle = language === "ar" ? route.titleAr : route.titleEn;

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

          <h1 className="font-display text-3xl font-bold text-foreground mb-6">
            {pageTitle}
          </h1>

          {/* Filters */}
          <div className="space-y-5 mb-8">
            {/* Subject Filter */}
            <div>
              <h2 className="mb-3 text-sm font-semibold text-foreground font-display">
                {t.subjectFilter}
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("subject", "")}
                  className={`filter-btn ${!subject ? "filter-btn-active" : ""}`}
                >
                  {t.all}
                </button>
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter("subject", subject === s ? "" : s)}
                    className={`filter-btn ${subject === s ? "filter-btn-active" : ""}`}
                  >
                    {t.subjects[s as keyof typeof t.subjects] || s}
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
                    value={sort}
                    onChange={(e) => setFilter("sort", e.target.value)}
                    className="appearance-none rounded-lg border border-border bg-card px-4 py-2 pr-8 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="top-picks">{t.topPicks}</option>
                    <option value="a-z">{t.aToZ}</option>
                    <option value="z-a">{t.zToA}</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                    style={{
                      right: language === "ar" ? "auto" : "0.5rem",
                      left: language === "ar" ? "0.5rem" : "auto",
                    }}
                  />
                </div>
              </div>

              {/* Tool Type */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-foreground font-display">
                  {t.toolType}:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter("type", "")}
                    className={`filter-btn ${!type ? "filter-btn-active" : ""}`}
                  >
                    {t.all}
                  </button>
                  <button
                    onClick={() => setFilter("type", type === "ai" ? "" : "ai")}
                    className={`filter-btn ${type === "ai" ? "filter-btn-active" : ""}`}
                  >
                    {t.aiTools}
                  </button>
                  <button
                    onClick={() => setFilter("type", type === "edtech" ? "" : "edtech")}
                    className={`filter-btn ${type === "edtech" ? "filter-btn-active" : ""}`}
                  >
                    {t.edtechTools}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
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

export default CategoryPage;
