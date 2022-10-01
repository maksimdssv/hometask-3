import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {NotesService} from './notes.service';
import {Note} from "../../helpers/dummy-notes";

@Controller("notes")
export class NotesController {
    constructor(private readonly noteService: NotesService) {
    }

    @Get()
    getNotes() {
        return this.noteService.getNotes();
    }

    @Get('stats')
    getStatistics() {
        return this.noteService.getNotesStatistics();
    }

    @Get(':id')
    getNoteById(@Param('id') noteId: string) {
        return this.noteService.getNoteById(noteId);
    }

    @Post()
    addNewNote(@Body() note: Note) {
        return this.noteService.addNewNote(note);
    }

    @Patch(':id')
    updateNote(@Body() note: Note, @Param('id') noteId: string) {
        return this.noteService.updateNote(note, noteId);
    }

    @Delete(':id')
    deleteNote(@Param('id') noteId: string) {
        return this.noteService.deleteNote(noteId);
    }
}
