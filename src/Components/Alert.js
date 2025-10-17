import React from 'react'

function Alert({ alert }) {
  const capitalize = (word) => {
    if(word==="danger"){
        word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  // Define alert styles based on type
  const getAlertStyle = (type) => {
    const baseStyle = {
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      padding: '12px 20px',
      fontWeight: '600',
      opacity: '0.95'
    };
    
    switch(type) {
      case 'success':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, rgba(40, 167, 69, 0.85) 0%, rgba(40, 167, 69, 0.95) 100%)',
          borderLeft: '4px solid #28a745',
          color: 'white'
        };
      case 'danger':
      case 'error':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.85) 0%, rgba(220, 53, 69, 0.95) 100%)',
          borderLeft: '4px solid #dc3545',
          color: 'white'
        };
      case 'warning':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.85) 0%, rgba(255, 193, 7, 0.95) 100%)',
          borderLeft: '4px solid #ffc107',
          color: 'white'
        };
      default:
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, rgba(106, 17, 203, 0.85) 0%, rgba(106, 17, 203, 0.95) 100%)',
          borderLeft: '4px solid #6a11cb',
          color: 'white'
        };
    }
  };

  // Get icon based on alert type
  const getAlertIcon = (type) => {
    switch(type) {
      case 'success':
        return <i className="fa-solid fa-circle-check me-2"></i>;
      case 'danger':
      case 'error':
        return <i className="fa-solid fa-circle-exclamation me-2"></i>;
      case 'warning':
        return <i className="fa-solid fa-triangle-exclamation me-2"></i>;
      default:
        return <i className="fa-solid fa-info-circle me-2"></i>;
    }
  };

  return (
    <div style={{height: '50px', position: 'fixed', top: '15px', left: '50%', transform: 'translateX(-50%)', zIndex: 1050, width: '90%', maxWidth: '600px'}} >
      {alert && (
        <div 
          style={getAlertStyle(alert.type)} 
          className="fade show" 
          role="alert"
        >
          {getAlertIcon(alert.type)}
          <strong>{capitalize(alert.type)}</strong>: {alert.msg}
        </div>
      )}
    </div>
  )
}

export default Alert
