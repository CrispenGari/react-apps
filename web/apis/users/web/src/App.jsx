import React from "react";
import Root from "./pages/Root";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Elements } from "@stripe/react-stripe-js";

import { stripe } from "./constants";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
}); //

const App = () => {
  return (
    <Elements
      stripe={stripe}
      options={{
        mode: "payment",
        currency: "zar",
        amount: 5000,
        appearance: {
          theme: "night",
        },
      }}
    >
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Elements>
  );
};

export default App;
