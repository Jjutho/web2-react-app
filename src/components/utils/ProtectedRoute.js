import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ user, adminOnly = false, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (adminOnly && !user.isAdministrator) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoutes;