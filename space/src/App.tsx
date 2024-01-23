import { Routes, Route } from "react-router-dom";
import {
  Feed,
  Footer,
  Header,
  Home,
  Manage,
  NotFound,
  Search,
} from "./components/_index";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/search" element={<Search />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
