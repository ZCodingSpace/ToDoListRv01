// import styles
import "./App.css";

// import components
import ContextsProvider from "./ContextsProvider";
// import HeaderSection from "./HeaderSection";
import MainLlistsCreator from "./ToDos/MainListsCreator";

export default function App() {
  return (
    <ContextsProvider>
      <div dir="rtl" className="app">
        {/* <HeaderSection /> */}
        <MainLlistsCreator />
      </div>
    </ContextsProvider>
  );
}

