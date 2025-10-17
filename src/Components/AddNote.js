import React from 'react'
import { useContext } from 'react'
import notecontext from '../Context/Notes/notecontext'
import { useState } from 'react'
const AddNote = (props) => {
    const context = useContext(notecontext);
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:""});
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note Added Successfully!","success");
    }
    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    return (
        <div className="container my-4">
            <div className="card border-0 shadow-sm" style={{borderRadius: '15px', overflow: 'hidden'}}>
                <div className="card-header p-4" style={{
                    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                    border: 'none'
                }}>
                    <h2 className="m-0 fw-bold text-white">Create New Note</h2>
                </div>
                <div className="card-body p-4">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label fw-semibold">Title</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{background: 'rgba(106, 17, 203, 0.1)', border: 'none'}}>
                                    <i className="fa-solid fa-heading text-primary"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="title" 
                                    name="title" 
                                    placeholder="Enter note title (min 5 characters)" 
                                    onChange={onChange} 
                                    minLength={5} 
                                    value={note.title} 
                                    required 
                                    style={{border: '1px solid #ced4da', borderLeft: 'none'}}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label fw-semibold">Description</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{background: 'rgba(106, 17, 203, 0.1)', border: 'none'}}>
                                    <i className="fa-solid fa-align-left text-primary"></i>
                                </span>
                                <textarea 
                                    className="form-control" 
                                    id="description" 
                                    name="description" 
                                    rows="3"
                                    placeholder="Enter note description (min 5 characters)" 
                                    onChange={onChange} 
                                    minLength={5} 
                                    required 
                                    value={note.description}
                                    style={{border: '1px solid #ced4da', borderLeft: 'none'}}
                                ></textarea>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tag" className="form-label fw-semibold">Tag</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{background: 'rgba(106, 17, 203, 0.1)', border: 'none'}}>
                                    <i className="fa-solid fa-tag text-primary"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="tag" 
                                    name="tag" 
                                    placeholder="Add a tag (optional)" 
                                    onChange={onChange} 
                                    value={note.tag}
                                    style={{border: '1px solid #ced4da', borderLeft: 'none'}}
                                />
                            </div>
                        </div>
                        <button 
                            disabled={note.title.length<5 || note.description.length<5} 
                            type="submit" 
                            className="btn btn-lg px-4" 
                            onClick={handleClick}
                            style={{
                                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                                color: 'white',
                                borderRadius: '50px',
                                boxShadow: '0 4px 15px rgba(106, 17, 203, 0.4)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <i className="fa-solid fa-plus me-2"></i>
                            Add Note
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNote
