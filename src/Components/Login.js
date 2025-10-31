import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

const Login = ({ showAlert, setIsAuthenticated, isAuthenticated }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const host = API_BASE_URL;
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set loading state if needed
      
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        // Update authentication state before localStorage to speed up the process
        setIsAuthenticated(true);
        localStorage.setItem("token", json.authToken);
        
        // Navigate immediately, then show alert
        navigate("/");
        showAlert("Logged in Successfully!", "success");
      } else {
        showAlert(json.error || "Invalid Credentials!", "danger");
      }
    } catch (err) {
      console.error(err);
      showAlert("Server error, please try again later", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div
            className="card border-0 shadow-lg"
            style={{ borderRadius: "15px", overflow: "hidden", background: "white" }}
          >
            <div
              className="card-header text-center py-4"
              style={{
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                color: "white",
                border: "none",
              }}
            >
              <h3 className="mb-0 fw-bold">Welcome Back</h3>
              <p className="text-white-50 mb-0">Sign in to continue to NoteNest</p>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-semibold text-secondary">
                    Email address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control bg-light border-start-0"
                      value={credentials.email}
                      onChange={onChange}
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      style={{ padding: "12px 15px" }}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold text-secondary">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control bg-light border-start-0"
                      value={credentials.password}
                      onChange={onChange}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                      style={{ padding: "12px 15px" }}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn w-100 py-2 mt-3"
                  style={{
                    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                    color: "white",
                    borderRadius: "50px",
                    fontWeight: "600",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Sign In
                </button>
              </form>
              <div className="text-center mt-4">
                <p className="mb-0 text-secondary">
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ color: "#6a11cb", fontWeight: "600" }}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
