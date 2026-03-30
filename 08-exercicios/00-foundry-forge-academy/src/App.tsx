import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { Header } from "@/components/Header";
import Dashboard from "@/pages/Dashboard";
import Exercises from "@/pages/Exercises";
import ExerciseDetail from "@/pages/ExerciseDetail";
import CheatSheet from "@/pages/CheatSheet";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <ProgressProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background bg-grid-pattern">
              <Header />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/exercise/:id" element={<ExerciseDetail />} />
                <Route path="/cheatsheet" element={<CheatSheet />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ProgressProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
