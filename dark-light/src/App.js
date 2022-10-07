import { useTheme } from "./context/ThemeContext";
import Header from "./component/header";
import "./App.css";

function App() {
  const {theme} = useTheme();
  return (
    <div className={`app ${theme}`}>
        <Header />
    </div>
  );
}

export default App;
