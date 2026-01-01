import GetCurrentUser from "../customHooks/getCurrentUser";

const Layout = ({ children }) => {
  const loading = GetCurrentUser();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return <>{children}</>;
};

export default Layout;
