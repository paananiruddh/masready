import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout/Layout";
import Design2Layout from "@/components/layout/Design2Layout";

import Home from "@/pages/home";
import MAS9Power from "@/pages/mas9-power";
import Features from "@/pages/features";
import Trust from "@/pages/trust";
import Architecture from "@/pages/architecture";
import Media from "@/pages/media";
import DemoWalkthrough from "@/pages/demo-walkthrough";
import Launch from "@/pages/launch";
import Contact from "@/pages/contact";

import Design2Home from "@/pages/design2/home";
import Design2MAS9Power from "@/pages/design2/mas9-power";
import Design2Features from "@/pages/design2/features";
import Design2Trust from "@/pages/design2/trust";
import Design2Architecture from "@/pages/design2/architecture";
import Design2Media from "@/pages/design2/media";
import Design2DemoWalkthrough from "@/pages/design2/demo-walkthrough";
import Design2Launch from "@/pages/design2/launch";
import Design2Contact from "@/pages/design2/contact";

import Design3Layout from "@/components/layout/Design3Layout";
import Design3Home from "@/pages/design3/home";
import Design3MAS9Power from "@/pages/design3/mas9-power";
import Design3Features from "@/pages/design3/features";
import Design3Trust from "@/pages/design3/trust";
import Design3Architecture from "@/pages/design3/architecture";
import Design3Media from "@/pages/design3/media";
import Design3DemoWalkthrough from "@/pages/design3/demo-walkthrough";
import Design3Launch from "@/pages/design3/launch";
import Design3Contact from "@/pages/design3/contact";

import Simulator from "@/pages/simulator";
import Compare from "@/pages/compare";
import DemoStatus from "@/pages/demo-status";

const queryClient = new QueryClient();

function Design3Router() {
  return (
    <Design3Layout>
      <Switch>
        <Route path="/design3" component={Design3Home} />
        <Route path="/design3/mas9-power" component={Design3MAS9Power} />
        <Route path="/design3/features" component={Design3Features} />
        <Route path="/design3/trust" component={Design3Trust} />
        <Route path="/design3/architecture" component={Design3Architecture} />
        <Route path="/design3/media" component={Design3Media} />
        <Route path="/design3/demo-walkthrough" component={Design3DemoWalkthrough} />
        <Route path="/design3/launch" component={Design3Launch} />
        <Route path="/design3/contact" component={Design3Contact} />
      </Switch>
    </Design3Layout>
  );
}

function Design2Router() {
  return (
    <Design2Layout>
      <Switch>
        <Route path="/design2" component={Design2Home} />
        <Route path="/design2/mas9-power" component={Design2MAS9Power} />
        <Route path="/design2/features" component={Design2Features} />
        <Route path="/design2/trust" component={Design2Trust} />
        <Route path="/design2/architecture" component={Design2Architecture} />
        <Route path="/design2/media" component={Design2Media} />
        <Route path="/design2/demo-walkthrough" component={Design2DemoWalkthrough} />
        <Route path="/design2/launch" component={Design2Launch} />
        <Route path="/design2/contact" component={Design2Contact} />
      </Switch>
    </Design2Layout>
  );
}

function Design1Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/mas9-power" component={MAS9Power} />
        <Route path="/features" component={Features} />
        <Route path="/trust" component={Trust} />
        <Route path="/architecture" component={Architecture} />
        <Route path="/media" component={Media} />
        <Route path="/demo-walkthrough" component={DemoWalkthrough} />
        <Route path="/launch" component={Launch} />
        <Route path="/contact" component={Contact} />
        <Route path="/simulator" component={Simulator} />
        <Route path="/compare" component={Compare} />
        <Route path="/demo-status" component={DemoStatus} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function Router() {
  const [location] = useLocation();
  const isDesign3 = location.startsWith("/design3");
  const isDesign2 = location.startsWith("/design2");
  
  if (isDesign3) return <Design3Router />;
  if (isDesign2) return <Design2Router />;
  return <Design1Router />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
