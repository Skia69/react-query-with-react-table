import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import "regenerator-runtime/runtime"; //fixes a weird error with useAsyncDebounce by react-table

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      emotionOptions={{ key: "mantine", prepend: false }}>
      <StrictMode>
        <App />
      </StrictMode>
    </MantineProvider>
  </QueryClientProvider>
);
