import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

const SignUp = ({ showAlert, setIsAuthenticated, isAuthenticated }) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
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

    if (credentials.password !== credentials.cpassword) {
      showAlert("Passwords do not match!", "danger");
      return;
    }

    try {
      const response = await fetch(`${host}/api/auth/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        setIsAuthenticated(true);
        showAlert("Account Created Successfully!", "success");
        navigate("/");
      } else {
        showAlert("User with this email already exists!", "danger");
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
              <h3 className="mb-0 fw-bold">Create Account</h3>
              <p className="text-white-50 mb-0">Join NoteNest today</p>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold text-secondary">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={onChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold text-secondary">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={onChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold text-secondary">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={onChange}
                    minLength={5}
                    required
                    placeholder="Create a password"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cpassword" className="form-label fw-semibold text-secondary">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    name="cpassword"
                    onChange={onChange}
                    minLength={5}
                    required
                    placeholder="Confirm your password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100 py-2 mt-3"
                  style={{
                    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                    color: "white",
                    borderRadius: "50px",
                    fontWeight: "600",
                  }}
                >
                  Create Account
                </button>
              </form>
              <div className="text-center mt-4">
                <p className="mb-0 text-secondary">
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#6a11cb", fontWeight: "600" }}>Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
