import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeCategoryNav from "@/components/HomeCategoryNav";
import PromptLibrarySection from "@/components/PromptLibrarySection";
import AIAgentsSection from "@/components/AIAgentsSection";
import LearningSection from "@/components/LearningSection";

const Index: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HomeCategoryNav />
        <PromptLibrarySection />
        <AIAgentsSection />
        <LearningSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
