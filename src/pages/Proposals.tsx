import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "/api";

const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const [bids, setBids] = useState({});
  const [selectedProposal, setSelectedProposal] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/proposals/`)
      .then((res) => res.json())
      .then((data) => setProposals(data))
      .catch((error) => console.error("Error fetching proposals:", error));
  }, []);

  const fetchBids = (proposalId) => {
    if (selectedProposal === proposalId) {
      // If already selected, toggle off
      setSelectedProposal(null);
      return;
    }
    fetch(`${API_BASE_URL}/bids/${proposalId}`)
      .then((res) => res.json())
      .then((data) => {
        setBids((prevBids) => ({ ...prevBids, [proposalId]: data }));
        setSelectedProposal(proposalId);
      })
      .catch((error) => console.error("Error fetching bids:", error));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Proposals</h2>
      <Link to="/proposals/new" className="bg-green-500 text-white px-4 py-2 rounded">
        + Create Proposal
      </Link>
      {proposals.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="border p-4 shadow-md">
              <h3 className="text-lg font-bold">{proposal.title}</h3>
              <p>{proposal.description}</p>
              <p className="text-gray-600">Budget: ${proposal.budget}</p>

              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => fetchBids(proposal.id)}
              >
                {selectedProposal === proposal.id ? "Hide Bids" : "View Bids"}
              </button>

              {/* Display Bids */}
              {selectedProposal === proposal.id && bids[proposal.id] && (
                <div className="mt-3 border-t pt-2">
                  <h4 className="font-semibold">Bids:</h4>
                  {bids[proposal.id].length === 0 ? (
                    <p className="text-gray-500">No bids yet.</p>
                  ) : (
                    <ul className="list-disc list-inside">
                      {bids[proposal.id].map((bid) => (
                        <li key={bid.id}>
                          {bid.bidder_name}: ${bid.amount.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Proposals;
