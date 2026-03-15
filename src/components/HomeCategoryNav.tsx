import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORY_ROUTES } from "@/data/categoryRoutes";
import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/data/translations";
import eduIllustration from "@/assets/edu-illustration.png";
import {
  BookOpen,
  ClipboardList,
  Presentation,
  Image,
  Video,
  BookText,
  AudioLines,
  Smile,
  Glasses,
  Gamepad2,
  Wand2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SUBJECTS = [
  "Arabic", "English", "German", "French", "Math", "Science", "ICT",
  "Religion", "Christianity", "Philosophy", "Montessori", "Social Studies",
  "Business", "Skills", "Art", "Music and Songs", "PE", "Library",
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Lesson Planning": <BookOpen className="h-5 w-5 text-primary" />,
  "Quizzes and Worksheets": <ClipboardList className="h-5 w-5 text-primary" />,
  "Presentation": <Presentation className="h-5 w-5 text-accent" />,
  "Photo Generation": <Image className="h-5 w-5 text-accent" />,
  "Video Generation": <Video className="h-5 w-5 text-accent" />,
  "Story Book Creation": <BookText className="h-5 w-5 text-primary" />,
  "Text to Speech": <AudioLines className="h-5 w-5 text-accent" />,
  "Lip Sync": <Smile className="h-5 w-5 text-primary" />,
  "VR and AR": <Glasses className="h-5 w-5 text-primary" />,
  "Gamification": <Gamepad2 className="h-5 w-5 text-accent" />,
  "Prompt Maker": <Wand2 className="h-5 w-5 text-primary" />,
};

const HomeCategoryNav: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const handleSubjectChange = (value: string) => {
    navigate(`/subject/${value.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 space-y-8 overflow-hidden">
      {/* Educational illustration - right side */}
      <img
        src={eduIllustration}
        alt=""
        aria-hidden="true"
        className="absolute right-0 -top-16 w-72 md:w-96 opacity-20 dark:opacity-10 pointer-events-none select-none -z-10"
      />

      {/* Section Title */}
      <h2 className="font-display text-2xl md:text-3xl font-bold text-primary relative z-10">
        {t.categoryFilter}
      </h2>

      {/* Category Cards Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {CATEGORY_ROUTES.map((route) => {
          const label =
            t.categories[route.category as keyof typeof t.categories] ||
            route.category;
          return (
            <Link
              key={route.category}
              to={route.path}
              className="category-card"
            >
              <span className="flex-shrink-0 rounded-lg bg-muted p-2">
                {CATEGORY_ICONS[route.category] || <BookOpen className="h-5 w-5 text-primary" />}
              </span>
              <span className="font-medium text-sm text-foreground">{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Subject Discovery Dropdown */}
      <div className="relative z-10 flex flex-col items-center gap-3 pt-4">
        <p className="text-sm md:text-base font-medium text-muted-foreground">
          {t.subjectDropdownLabel || "Looking for something related to your subject?"}
        </p>
        <Select onValueChange={handleSubjectChange}>
          <SelectTrigger className="w-60 rounded-full border-primary/20 bg-card shadow-sm">
            <SelectValue placeholder={t.subjectDropdownDefault || "General"} />
          </SelectTrigger>
          <SelectContent>
            {SUBJECTS.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {t.subjects?.[subject as keyof typeof t.subjects] || subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default HomeCategoryNav;
