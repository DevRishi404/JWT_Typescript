import { useAuth } from "../Auth/AuthContext";
import { Button } from "@radix-ui/themes";


const Dashboard = () => {

  const { logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      {/* Add more components or features as needed */}
      {
        loading ? (
          <Button onClick={handleLogout} variant="outline" disabled>Logging Out</Button>
        ) : (
          <Button onClick={handleLogout} variant="outline">Log Out</Button>
        )
      }
    </div>
  );
}

export default Dashboard;