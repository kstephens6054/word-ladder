import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WordLadderProvider } from "./providers/WordLadderContext.tsx";

import "./index.css";

import "@fontsource-variable/roboto";
import "@fontsource/agbalumo";
import "@fontsource/handlee";

import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WordLadderProvider>
        <App />
      </WordLadderProvider>
    </QueryClientProvider>
  </StrictMode>,
);
