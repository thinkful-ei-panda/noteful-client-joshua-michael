import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import config from './config';

class NoteViewMain extends React.Component {
    static contextType = NotefulContext;

    deleteNoteRequest = (noteId) => {
        fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
            'method': 'DELETE',
            'headers': {
                'Authorization': `Bearer ${config.API_TOKEN}`,
            }
        })
            .then(response => response.json())
            .then(response => this.context.deleteNoteFromUI(noteId))
            .then(this.props.history.push('/'))
    };
    
    render = () => {
        const currentNote = this.context.STORE.notes.find(note => note.id === Number(this.props.match.params.noteId));
        if (currentNote) {
            const dateNoteModifiedObj = new Date(currentNote.modified);
            const dateNoteModified = dateNoteModifiedObj.toDateString();
            return (
                <section className="border group-column item-double">
                    <section>
                        <div className="border group-column note-margin width">
                            <h2>{currentNote.note_name}</h2>
                            <div className="group-row note-group-row">
                                <p>Date modified on: {dateNoteModified}</p>
                                <button onClick={() => this.deleteNoteRequest(currentNote.id, this.context.deleteNoteFromUI)}>Delete Note</button>
                            </div>
                        </div>
                        <p className="note-margin width">{currentNote.note_content}</p>
                    </section>
                </section>
            );
        };
        return (
            <section className="border group-column item-double">
                <section>
                    <div className="border group-column note-margin width">
                       You've reached a secret place :o
                    </div>
                </section>
            </section>
        );
    };
};

NoteViewMain.propTypes = {
    history: propTypes.object,
    match: propTypes.object
};

export default withRouter(NoteViewMain);