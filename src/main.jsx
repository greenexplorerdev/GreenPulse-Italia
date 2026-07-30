import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { DashboardProvider } from "./context/DashboardContext";



createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
