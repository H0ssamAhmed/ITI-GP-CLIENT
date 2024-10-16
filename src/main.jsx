import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../index.css";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Provider } from "react-redux";
import store from "../store.js";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // retry failed queries once
      refetchOnWindowFocus: false, // do not refetch when window regains focus
    },
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // For right-to-left text alignment
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </QueryClientProvider>
  </Provider>
);
