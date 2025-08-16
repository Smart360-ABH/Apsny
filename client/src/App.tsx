import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Services from "@/pages/services";
import ChatbotDemo from "@/pages/chatbot-demo";
import VirtualTour from "@/pages/virtual-tour";
import YandexMaps from "@/pages/yandex-maps";
import TextGenerator from "@/pages/text-generator";
import Portfolio from "@/pages/portfolio";
import Pricing from "@/pages/pricing";
import Contact from "@/pages/contact";
import Admin from "@/pages/admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/demo/chatbot" component={ChatbotDemo} />
      <Route path="/demo/virtual-tour" component={VirtualTour} />
      <Route path="/demo/yandex-maps" component={YandexMaps} />
      <Route path="/demo/text-generator" component={TextGenerator} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
