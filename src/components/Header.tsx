import React from "react";
import { Search, Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  isQuickPrompts: boolean;
}

const Header: React.FC<HeaderProps> = ({ searchValue, onSearchChange, isQuickPrompts }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-1">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 overflow-visible">
            <img
              src={theme === "dark" ? logoDark : logoLight}
              alt="EduTech Hub"
              className="h-36 w-auto sm:h-40 md:h-48 origin-center"
              style={{ transform: "scale(1.5)" }}
            />
          </div>

          {/* Search Bar - Center */}
          <div className="relative flex-1 max-w-xl mx-4 hidden sm:block">
            <Search className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ltr:left-4 rtl:right-4" style={{ left: language === "ar" ? "auto" : "1rem", right: language === "ar" ? "1rem" : "auto" }} />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isQuickPrompts ? t.searchPromptsPlaceholder : t.searchPlaceholder}
              className="search-input"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{t.language}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="relative mt-3 sm:hidden">
          <Search className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" style={{ left: language === "ar" ? "auto" : "1rem", right: language === "ar" ? "1rem" : "auto" }} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={isQuickPrompts ? t.searchPromptsPlaceholder : t.searchPlaceholder}
            className="search-input"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
