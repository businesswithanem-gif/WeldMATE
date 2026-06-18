import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { UnitsProvider } from "@/hooks/use-units";

import Dashboard from "@/pages/Dashboard";
import Profiles from "@/pages/Profiles";
import Reference from "@/pages/Reference";
import Troubleshooting from "@/pages/Troubleshooting";
import IndianStandards from "@/pages/IndianStandards";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/reference" component={Reference} />
        <Route path="/troubleshooting" component={Troubleshooting} />
        <Route path="/indian-standards" component={IndianStandards} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UnitsProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </UnitsProvider>
    </QueryClientProvider>
  );
}

export default App;
