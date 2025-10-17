import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from "../config";

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ name:"",email: "", password: "",cpassword:"" });
    
    const host = API_BASE_URL;
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate password confirmation
        if (credentials.password !== credentials.cpassword) {
            props.showAlert("Passwords do not match!", "danger");
            return;
        }
        
        const response = await fetch(`${host}/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:credentials.name,email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authToken);
            props.setIsAuthenticated(true);
            navigate("/");
            props.showAlert("Account Created Successfully!","success")
        }
        else {
            props.showAlert("User with this email already exists!","danger")
        }
        console.log(json);
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card border-0 shadow-lg" style={{
                        borderRadius: '15px',
                        overflow: 'hidden',
                        background: 'white'
                    }}>
                        <div className="card-header text-center py-4" style={{
                            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                            color: 'white',
                            border: 'none'
                        }}>
                            <h3 className="mb-0 fw-bold">Create Account</h3>
                            <p className="text-white-50 mb-0">Join NoteNest today</p>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label fw-semibold text-secondary">Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="bi bi-person"></i>
                                        </span>
                                        <input 
                                            type="text" 
                                            className="form-control bg-light border-start-0" 
                                            id="name" 
                                            name='name' 
                                            onChange={onChange} 
                                            placeholder="Enter your name"
                                            required
                                            style={{padding: '12px 15px'}}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold text-secondary">Email address</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="bi bi-envelope"></i>
                                        </span>
                                        <input 
                                            type="email" 
                                            className="form-control bg-light border-start-0" 
                                            id="email" 
                                            name='email' 
                                            onChange={onChange} 
                                            placeholder="Enter your email"
                                            required
                                            style={{padding: '12px 15px'}}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold text-secondary">Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="bi bi-lock"></i>
                                        </span>
                                        <input 
                                            type="password" 
                                            className="form-control bg-light border-start-0" 
                                            id="password" 
                                            name='password' 
                                            minLength={5} 
                                            required 
                                            onChange={onChange}
                                            placeholder="Create a password"
                                            style={{padding: '12px 15px'}}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpassword" className="form-label fw-semibold text-secondary">Confirm Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="bi bi-shield-lock"></i>
                                        </span>
                                        <input 
                                            type="password" 
                                            className="form-control bg-light border-start-0" 
                                            id="cpassword" 
                                            name='cpassword' 
                                            minLength={5} 
                                            required 
                                            onChange={onChange}
                                            placeholder="Confirm your password"
                                            style={{padding: '12px 15px'}}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn w-100 py-2 mt-3" style={{
                                    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                                    color: 'white',
                                    borderRadius: '50px',
                                    fontWeight: '600',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                }}>
                                    Create Account
                                </button>
                            </form>
                            <div className="text-center mt-4">
                                <p className="mb-0 text-secondary">
                                    Already have an account? <Link to="/login" style={{color: '#6a11cb', fontWeight: '600'}}>Sign In</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
};

export default SignUp
