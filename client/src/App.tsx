import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import HomePage from "@/pages/HomePage";
import OverscaleMatrixPage from "@/pages/OverscaleMatrixPage";
import WarCodexPage from "@/pages/WarCodexPage";
import HiddenSocietiesPage from "@/pages/HiddenSocietiesPage";
import MallCommandPage from "@/pages/MallCommandPage";
import CeremonialPage from "@/pages/CeremonialPage";
import MarketIntelligencePage from "@/pages/MarketIntelligencePage";
import StoryModePage from "@/pages/StoryModePage";
import ProductShowcasePage from "@/pages/ProductShowcasePage";
import EvolStudiosPage from "@/pages/EvolStudiosPage";
import MythologyConsolePage from "@/pages/MythologyConsolePage";
import CodexAuditConsolePage from "@/pages/CodexAuditConsolePage";
import MetaScaleObservatoryPage from "@/pages/MetaScaleObservatoryPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/overscale-matrix" component={OverscaleMatrixPage} />
      <Route path="/war-codex" component={WarCodexPage} />
      <Route path="/hidden-societies" component={HiddenSocietiesPage} />
      <Route path="/mall-command" component={MallCommandPage} />
      <Route path="/ceremonial" component={CeremonialPage} />
      <Route path="/market-intelligence" component={MarketIntelligencePage} />
      <Route path="/story-mode" component={StoryModePage} />
      <Route path="/products" component={ProductShowcasePage} />
      <Route path="/evol-studios" component={EvolStudiosPage} />
      <Route path="/mythology" component={MythologyConsolePage} />
      <Route path="/codex-audit" component={CodexAuditConsolePage} />
      <Route path="/metascale-observatory" component={MetaScaleObservatoryPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <header className="flex items-center justify-between p-4 border-b gap-4">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="flex-1" />
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-auto p-8">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
