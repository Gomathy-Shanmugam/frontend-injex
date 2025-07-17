import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"
import { Provider } from "react-redux";
import { store, persistor } from "./Components/Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <App />
      </StrictMode>
    </PersistGate>
  </Provider>
);
