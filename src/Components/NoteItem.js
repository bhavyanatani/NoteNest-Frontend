import React from 'react'
import { useContext } from 'react'
import notecontext from '../Context/Notes/notecontext'
const NoteItem = (props) => {
    const {showAlert} = props;
    const { note, updateNote } = props;
    const context = useContext(notecontext);
    const {deleteNote} = context;
    
    // Use consistent gradient based on note ID
    const gradients = [
        'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)',
        'linear-gradient(135deg, #43C6AC 0%, #191654 100%)',
        'linear-gradient(135deg, #834d9b 0%, #d04ed6 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    ];
    
    // Use the last character of the note ID to determine gradient index
    const gradientIndex = note._id ? parseInt(note._id.slice(-1), 16) % gradients.length : 0;
    const noteGradient = gradients[gradientIndex];
    
    return (
        <div className='col-md-4 col-lg-3 mb-4'>
            <div className="card border-0 shadow-sm h-100" style={{ 
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}>
                <div className="card-header p-3" style={{ 
                    background: noteGradient,
                    border: 'none',
                    height: '8px'
                }}></div>
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="card-title fw-bold mb-0" style={{color: '#333'}}>{note.title}</h5>
                        <span className="badge rounded-pill" style={{
                            background: 'rgba(106, 17, 203, 0.1)',
                            color: '#6a11cb',
                            padding: '5px 10px'
                        }}>{note.tag}</span>
                    </div>
                    <p className="card-text text-secondary mb-4" style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                    }}>{note.description}</p>
                    <div className='d-flex align-items-center justify-content-end'>
                        <button className="btn btn-sm me-2" style={{
                            background: 'rgba(220, 53, 69, 0.1)',
                            color: '#dc3545',
                            borderRadius: '50px'
                        }} onClick={()=>{deleteNote(note._id);showAlert("Note Deleted Successfully!","success")}}>
                            <i className="fa-solid fa-trash me-1"></i> Delete
                        </button>
                        <button className="btn btn-sm" style={{
                            background: 'rgba(106, 17, 203, 0.1)',
                            color: '#6a11cb',
                            borderRadius: '50px'
                        }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{updateNote(note)}}>
                            <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
