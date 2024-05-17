import { getDB, saveDB, insertDB } from "./db.js";

export {
  insertNewNote,
  getAllNotes,
  getMatchingNotes,
  removeNote,
  removeAllNotes,
};

const insertNewNote = async (noteContent, tags = []) => {
  const note = {
    id: Date.now(),
    content: noteContent,
    tags,
  };

  await insertDB(note);
};

const getAllNotes = async () => {
  const db = await getDB();
  return db.notes;
};

const getMatchingNotes = async noteStr => {
  const notes = await getAllNotes();
  const matchingNotes = notes.filter(note =>
    note.content.toLowerCase().includes(noteStr.toLowerCase())
  );

  return matchingNotes;
};

const removeNote = async id => {
  const allNotes = await getAllNotes();
  const newNotes = allNotes.filter(note => note.id !== id);

  await saveDB({ notes: newNotes });
};

const removeAllNotes = async () => {
  await saveDB({ notes: [] });
};
