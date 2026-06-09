import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoaderProvider } from "./components/contexts/LoaderComtext.tsx";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </QueryClientProvider>
  </StrictMode>,
);
