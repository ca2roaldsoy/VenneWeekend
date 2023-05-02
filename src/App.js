import "./App.css";
import "./styles/styles.scss";
import NavMenu from "./components/menu/NavMenu";
import { AdminContextProvider } from "./context/AdminContext";
import { foodMenu } from "./constants/foodMenu";
import "react-multi-carousel/lib/styles.css";

function App() {
  function setLocalStorage() {
    localStorage.setItem("foodMenu", JSON.stringify(foodMenu));
  }

  setLocalStorage();

  return (
    <div className="App">
      <AdminContextProvider>
        <NavMenu />
      </AdminContextProvider>
    </div>
  );
}

export default App;
