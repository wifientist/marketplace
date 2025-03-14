import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/auth/status", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          navigate("/login"); // Redirect if not authenticated
          return;
        }

        const data = await response.json();
        console.log(data);
        if (data.role !== "admin") {
          navigate("/"); // Redirect if not an admin
          return;
        }

        setIsAdmin(true);
      } catch (error) {
        navigate("/login"); // Redirect on error
      }
    };

    checkAdmin();
  }, [navigate]);

  if (isAdmin === null) {
    return <div>Loading...</div>; // Show a loading state
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      {/* Add more admin features here */}
    </div>
  );
};

export default Admin;
