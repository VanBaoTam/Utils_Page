import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TNote } from "@/types";

const initialState: TNote[] = [];

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    createNote: (state, action: PayloadAction<TNote>) => {
      if (action.payload !== null) state.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<TNote>) => {
      const updatedNote = action.payload;
      const index = state.findIndex((note) => note.id === updatedNote.id);
      if (index !== -1) {
        state[index] = updatedNote;
      }
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      const noteIdToDelete = action.payload;
      const index = state.findIndex((note) => note.id === noteIdToDelete);

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    loadNoteContents: (state, action: PayloadAction<TNote[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { createNote, updateNote, deleteNote, loadNoteContents } =
  noteSlice.actions;
export default noteSlice.reducer;
