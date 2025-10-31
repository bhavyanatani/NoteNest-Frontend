import {
    Link,
    useLocation,
    useNavigate
  } from "react-router-dom";
export default function Navbar({ setIsAuthenticated }) {
    let history = useNavigate();
    let location = useLocation();
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '12px 0'
            }}>
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to="/" style={{color: 'white', fontWeight: '700', fontSize: '1.5rem'}}>
                        <img 
                            src="https://i.pinimg.com/1200x/bc/df/29/bcdf29edabd1b961a70140cabcc8cfb5.jpg" 
                            alt="Logo" 
                            width="40" 
                            height="40" 
                            className="d-inline-block me-2"
                            style={{objectFit: 'cover', borderRadius: '50%', border: '2px solid white'}}
                        />
                        <span>NoteNest</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{border: '1px solid rgba(255,255,255,0.5)'}}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/" style={{color: 'white', fontWeight: '500', marginLeft: '10px'}}>Home</Link>
                            </li>
                        </ul>
                    </div>
                    {!localStorage.getItem("token")?
                    <>
                    <Link className="btn mx-1" to="/login" role="button" style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        borderRadius: '50px',
                        padding: '8px 20px',
                        fontWeight: '500',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}>Login</Link>
                    <Link className="btn mx-1" to="/signup" role="button" style={{
                        background: 'white',
                        color: '#6a11cb',
                        borderRadius: '50px',
                        padding: '8px 20px',
                        fontWeight: '600',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}>Sign Up</Link>
                    </>:
                    <button onClick={()=>{
                        localStorage.removeItem("token");
                        setIsAuthenticated(false);
                        history("/login");
                    }} className="btn mx-1" role="button" style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        borderRadius: '50px',
                        padding: '8px 20px',
                        fontWeight: '500',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}>Logout</button>}
                </div>
            </nav>
        </div>
    )
}
