import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ChatPage from "@/pages/ChatPage";
import RecommendationsPage from "@/pages/RecommendationsPage";
import AssetDetailPage from "@/pages/AssetDetailPage";
import RecommendationDetailPage from "@/pages/RecommendationDetailPage";
import DataAssetsPage from "@/pages/DataAssetsPage";
import DataProductsPage from "@/pages/DataProductsPage";
import DataProductDetailPage from "@/pages/DataProductDetailPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ChatPage} />
      <Route path="/recommendations" component={RecommendationsPage} />
      <Route path="/recommendation/:id" component={RecommendationDetailPage} />
      <Route path="/data-products" component={DataProductsPage} />
      <Route path="/data-product/:id" component={DataProductDetailPage} />
      <Route path="/asset/:id" component={AssetDetailPage} />
      <Route path="/assets" component={DataAssetsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <main className="flex-1 overflow-auto">
              <Router />
            </main>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
