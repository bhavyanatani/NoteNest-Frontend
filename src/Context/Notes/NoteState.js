import notecontext from "./notecontext";
import { useState } from "react";
import { API_BASE_URL } from "../../config";

const NoteState = (props) => {
    const host = API_BASE_URL;
    const noteInitial = []
    const [notes, setNotes] = useState(noteInitial)

    //Get all Notes
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/getNotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            })
            const json = await response.json();
            console.log(json);
            setNotes(json)
            // Ensure notes is always an array
        } catch (error) {
            console.error("Error fetching notes:", error);
            setNotes([]);
        }
    }
    //Add a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addNotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = await response.json();
        setNotes(notes.concat(note))
    }
    //Delete a Note
    const deleteNote = async (_id) => {
        const response = await fetch(`${host}/api/notes/deleteNotes/${_id}`, {
            method: "DELETE",
            headers: {
                "auth-token": localStorage.getItem('token')
            },
        })
        const json = await response.json();
        console.log(json);
        setNotes(notes.filter((note) => { return note._id !== _id }))
    }
    //Edit a Note
    const editNote = async (_id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updateNotes/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();
        console.log(json);
        //Logic to edit a Note
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i]._id === _id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }
    return (
        <notecontext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </notecontext.Provider>

    )
}
export default NoteState;