export interface CategoryRoute {
  category: string;
  path: string;
  titleEn: string;
  titleAr: string;
}

export const CATEGORY_ROUTES: CategoryRoute[] = [
  { category: "Lesson Planning", path: "/lesson-planning-tools", titleEn: "Lesson Planning AI Tools", titleAr: "أدوات الذكاء الاصطناعي لتخطيط الدروس" },
  { category: "Quizzes and Worksheets", path: "/quiz-worksheet-tools", titleEn: "Quiz & Worksheet Creation Tools", titleAr: "أدوات إنشاء الاختبارات وأوراق العمل" },
  { category: "Presentation", path: "/presentation-tools", titleEn: "AI Presentation Tools", titleAr: "أدوات العروض التقديمية الذكية" },
  { category: "Photo Generation", path: "/ai-image-tools", titleEn: "AI Image Generation Tools", titleAr: "أدوات توليد الصور بالذكاء الاصطناعي" },
  { category: "Video Generation", path: "/ai-video-tools", titleEn: "AI Video Creation Tools", titleAr: "أدوات إنشاء الفيديو الذكية" },
  { category: "Story Book Creation", path: "/story-book-tools", titleEn: "Story Book Creation Tools", titleAr: "أدوات إنشاء كتب القصص" },
  { category: "Text to Speech", path: "/text-to-speech-tools", titleEn: "Text to Speech Tools", titleAr: "أدوات تحويل النص إلى كلام" },
  { category: "Lip Sync", path: "/lip-sync-tools", titleEn: "AI Lip Sync Tools", titleAr: "أدوات مزامنة الشفاه الذكية" },
  { category: "VR and AR", path: "/vr-ar-tools", titleEn: "VR & AR Educational Tools", titleAr: "أدوات الواقع الافتراضي والمعزز التعليمية" },
  { category: "Gamification", path: "/gamification-tools", titleEn: "Gamification Tools for Education", titleAr: "أدوات التلعيب للتعليم" },
  { category: "Prompt Maker", path: "/prompt-maker-tools", titleEn: "Prompt Maker Tools", titleAr: "أدوات صانع الأوامر" },
];

export function getCategoryByPath(path: string): CategoryRoute | undefined {
  return CATEGORY_ROUTES.find((r) => r.path === path);
}

export function getRouteByCategory(category: string): CategoryRoute | undefined {
  return CATEGORY_ROUTES.find((r) => r.category === category);
}

export function promptSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
