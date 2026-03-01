import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen bg-[#1a110d] text-[#f4ebd0] text-sm tracking-widest uppercase opacity-60">
        Loading...
    </div>
);

const ProtectedRoute = ({ children, requireMember = false }) => {
    const { user, userProfile, loading } = useAuth();
    if (loading) return <PageLoader />;
    if (!user) return <Navigate to="/portal" replace />;
    if (requireMember && !userProfile?.isMember) return <Navigate to="/dashboard" replace />;
    return children;
};

export default ProtectedRoute;
