import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Stats from "./pages/Stats";
import Calendar from "./pages/Calendar";
import AsiaSession from "./pages/sessions/AsiaSession";
import LondonSession from "./pages/sessions/LondonSession";
import NYOpenSession from "./pages/sessions/NYOpenSession";
import NYCloseSession from "./pages/sessions/NYCloseSession";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center border-b border-border bg-card">
                <SidebarTrigger className="ml-4" />
                <div className="ml-4">
                  <h1 className="text-lg font-semibold text-card-foreground">ORB Trading Journal</h1>
                </div>
              </header>
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/sessions/asia" element={<AsiaSession />} />
                  <Route path="/sessions/london" element={<LondonSession />} />
                  <Route path="/sessions/ny-open" element={<NYOpenSession />} />
                  <Route path="/sessions/ny-close" element={<NYCloseSession />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
