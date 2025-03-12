import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Marketplace</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/proposals" className="hover:underline">Proposals</Link>
          <Link to="/proposals/new" className="bg-green-500 px-3 py-1 rounded">+ New Proposal</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
