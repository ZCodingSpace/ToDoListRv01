import "./App.css";
import HeaderSection from "./HeaderSection";
import { ThemeProvider } from "./ContextProvider";

function App() {
  return (
    <ThemeProvider>
      <div dir="rtl" className="app">
        <HeaderSection />
      </div>
    </ThemeProvider>
  );
}

export default App;
