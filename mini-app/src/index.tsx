import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import {QueryClient,QueryClientProvider} from 'react-query'
// import {createRoot } from 'react-dom/client'





// Init VK  Mini App
bridge.send("VKWebAppInit");

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
  , document.getElementById("root"));

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App/>
//     </QueryClientProvider>
//     </React.StrictMode>
