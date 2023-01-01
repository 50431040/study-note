import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Logs from "./Logs";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

const container = document.getElementById("root")!;
const root = createRoot(container);

// 监听error事件
window.addEventListener("error", (ev) => {
  const { error, message, filename } = ev;
  const errorLog = {
    filename,
    message,
    error,
  };

  console.log(errorLog);

  new Image().src = `http://localhost:3001/api/trace?msg=${JSON.stringify(
    errorLog
  )}`;
});

// throw new TypeError('custom error')

root.render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        {/* <App /> */}
        <Logs
          data={[
            {
              filename: "http://localhost:3000/static/js/bundle.js",
              message: "Uncaught ReferenceError: asdf is not defined",
            },
          ]}
        />
        {/* <button onClick={asdf}>aaa</button> */}
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
