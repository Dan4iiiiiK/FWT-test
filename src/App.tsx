import Filter from "./components/Filter/Filter";
import Header from "./components/Header/Header";
import PictureList from "./components/PictureList/PictureList";
import "./index.scss";
import ThemeProvider from "./provider/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <>
        <Header />
        <Filter />
        <PictureList />
      </>
    </ThemeProvider>
  );
}

export default App;
