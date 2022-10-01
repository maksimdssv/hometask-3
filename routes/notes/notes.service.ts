import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Note} from "../../helpers/dummy-notes";
import {addNote, deleteNote, getNoteById, getNotes, getStats, updateNote} from "../../repositories/dbMethods";

@Injectable()
export class NotesService {

  getNotes(): Note[] {
    return getNotes();
  }

  getNotesStatistics() {
    return getStats();
  }

  getNoteById(id: string): Note {
    try {
      return getNoteById(id);
    } catch (err) {
      throw new NotFoundException(err.message)
    }
  }

  addNewNote(note: Note) {
    try {
      return addNote(note);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  updateNote(note: Note, id: string) {
    try {
      return updateNote(id, note);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  deleteNote(id: string) {
    try {
      return deleteNote(id);
    } catch (err) {
      throw new NotFoundException(err.message)
    }
  }
}
