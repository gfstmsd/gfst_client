const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove authentication tokens or user session data
    localStorage.removeItem("token");  // Example for JWT token
    localStorage.removeItem("user");

    // Redirect to login page after logout
    navigate("/login");
  }, [navigate]);

  return null; // No UI required
};

export default Logout;
