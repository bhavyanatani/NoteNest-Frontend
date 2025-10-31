import { useContext, useEffect, useState,useRef } from 'react'
import notecontext from '../Context/Notes/notecontext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(notecontext);
  const { notes, getNotes,editNote } = context;
  const { showAlert } = props;
  const [note,setNote] = useState({id:"",editTitle:"",editDescription:"",editTag:""});
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate('/login');
    }
    //eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const updateNote = (currentnote) => {
    setNote({id:currentnote._id,editTitle:currentnote.title,editDescription:currentnote.description,editTag:currentnote.tag});
    // prepare note for editing here if needed
  }
  const handleClick = (e) =>{
    editNote(note.id,note.editTitle,note.editDescription,note.editTag);
    ref.current.click();
}
const onChange = (e) =>{
    setNote({...note,[e.target.name]:e.target.value});
}
  return (
    <>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-12">
            <h2 className="mb-4 fw-bold" style={{
              background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>Your Notes</h2>
          </div>
        </div>
        <AddNote showAlert={showAlert} />
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{display:"none"}} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
            <div className="modal-header" style={{
              background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
              color: 'white',
              border: 'none',
              borderTopLeftRadius: '15px',
              borderTopRightRadius: '15px'
            }}>
              <h5 className="modal-title fw-bold" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4">
            <form>
                <div className="mb-3">
                    <label htmlFor="editTitle" className="form-label fw-semibold text-secondary">Title</label>
                    <input type="text" className="form-control bg-light" value={note.editTitle} id="editTitle" name="editTitle" aria-describedby="emailHelp" onChange={onChange} style={{padding: '12px 15px', borderRadius: '8px'}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label fw-semibold text-secondary">Description</label>
                    <textarea className="form-control bg-light" value={note.editDescription} id="editDescription" name="editDescription" onChange={onChange} rows="3" style={{padding: '12px 15px', borderRadius: '8px'}}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="editTag" className="form-label fw-semibold text-secondary">Tag</label>
                    <input type="text" className="form-control bg-light" value={note.editTag} id="editTag" name="editTag" onChange={onChange} style={{padding: '12px 15px', borderRadius: '8px'}} />
                </div>
            </form>
            </div>
            <div className="modal-footer border-0">
              <button ref={ref} type="button" className="btn" data-bs-dismiss="modal" style={{
                background: 'rgba(0, 0, 0, 0.1)',
                color: '#333',
                borderRadius: '50px',
                padding: '8px 20px',
                fontWeight: '500'
              }}>Cancel</button>
              <button type="button" className="btn" onClick={handleClick} style={{
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                color: 'white',
                borderRadius: '50px',
                padding: '8px 20px',
                fontWeight: '500',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="container mx-2">
            {notes.length === 0 && 
              <div className="text-center py-5 my-4">
                <div style={{fontSize: '4rem', opacity: '0.2'}}>📝</div>
                <h3 className="text-secondary">No notes to display</h3>
                <p className="text-muted">Add your first note to get started!</p>
              </div>
            }
          </div>
          {notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
