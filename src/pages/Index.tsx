import React from "react";
import Header from "@/components/Header";
import FilterSection from "@/components/FilterSection";
import ToolGrid from "@/components/ToolGrid";
import Footer from "@/components/Footer";
import { useFilterState } from "@/hooks/useFilterState";

const Index: React.FC = () => {
  const { filters, setFilter } = useFilterState();

  const isQuickPrompts = filters.category === "Quick Prompts";

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        searchValue={filters.search}
        onSearchChange={(v) => setFilter("search", v)}
        isQuickPrompts={isQuickPrompts}
      />
      <FilterSection filters={filters} onFilterChange={setFilter} />
      <main className="flex-1">
        <ToolGrid filters={filters} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
