import { useState } from "react";

//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = "/api"; 


const NewProposalForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const response = await fetch(`${API_BASE_URL}/proposals/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        budget: parseFloat(budget),
        location: "Remote",
        deadline: new Date().toISOString(),
        created_by: 1, // Replace with actual user ID
      }),
    });
  
    const result = await response.json();
    
    if (response.ok) {
      alert("Proposal created successfully!");
      setTitle("");
      setDescription("");
      setBudget("");
    } else {
      alert(`Error: ${result.detail || "Failed to create proposal"}`);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold">New Proposal</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded mt-2" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded mt-2" />
      <input type="number" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full p-2 border rounded mt-2" />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Create Proposal</button>
    </form>
  );
};

export default NewProposalForm;
