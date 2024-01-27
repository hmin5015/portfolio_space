import { Outlet } from "react-router-dom";
import { Footer, Header } from "./pages/_index";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
