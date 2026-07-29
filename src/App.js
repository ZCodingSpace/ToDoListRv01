import "./App.css";
import { ThemeProvider } from "./ContextProvider";
import HeaderSection from "./HeaderSection";
import MainLlistsCreator from "./ToDos/MainListsCreator";

function App() {
  return (
    <ThemeProvider>
      <div dir="rtl" className="app">
        <HeaderSection />
        <MainLlistsCreator />
      </div>
    </ThemeProvider>
  );
}

export default App;
