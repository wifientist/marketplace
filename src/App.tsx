import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Proposals from "@/pages/Proposals";
import NewProposalForm from "@/components/NewProposalForm";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/proposals/new" element={<NewProposalForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
