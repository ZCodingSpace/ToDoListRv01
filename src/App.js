import "./App.css";
import { ThemeProvider } from "./ContextProvider";
import HeaderSection from "./HeaderSection";
import MainLlistsCreator from "./MainListsCreator";
import ListCategory from "./ToDos/ListCategory";

function App() {
  return (
    <ThemeProvider>
      <div dir="rtl" className="app" style={{ backgroundColor: "gray" }}>
        <HeaderSection />
        <MainLlistsCreator />
        <ListCategory />
      </div>
    </ThemeProvider>
  );
}

export default App;
