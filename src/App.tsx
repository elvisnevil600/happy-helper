import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import HymnDetail from "./pages/HymnDetail.tsx";
import Favorites from "./pages/Favorites.tsx";
import Recent from "./pages/Recent.tsx";
import Worship from "./pages/Worship.tsx";
import WorshipService from "./pages/WorshipService.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hymn/:number" element={<HymnDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/worship" element={<Worship />} />
          <Route path="/worship/:id" element={<WorshipService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
