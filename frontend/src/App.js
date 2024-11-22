import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import CompanyRouter from "./Components/CompanyRouter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/:companyName/*" element={<CompanyRouter />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
