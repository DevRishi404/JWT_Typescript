import { useAuth } from "./AuthContext";
import { Redirect } from "wouter";

const ProtectedRoute: React.FC<{ component: React.ComponentType }> = ({ component: Component }) => {
    const { user } = useAuth();

    if (!user) {
        return <Redirect to="/login" />;
    }

    return <Component />; // Render the protected component if user is authenticated
}

export default ProtectedRoute;