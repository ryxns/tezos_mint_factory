import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Crowdsale from "./views/Crowdsale";
import Home from "./views/Home";

const App = () => {
  return (
    <div className="min-h-screen" style={{ background: "#f4f4f4" }}>
      <Navbar />
      <Loader />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crowdsales/:crowdsaleAddress" element={<Crowdsale />} />
      </Routes>
    </div>
  );
};

export default App;
