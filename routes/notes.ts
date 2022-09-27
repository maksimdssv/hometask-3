import express, {NextFunction, Request, Response} from "express";
import {addNote, getNotes, getNoteById, updateNote, deleteNote, getStats} from "../repositories/dbMethods";

const router = express.Router()


router.route("/")
    .get((req, res) => {
        res.send(getNotes());
    })
    .post((req, res) => {
        const note = req.body;
        try {
            const newNote = addNote(note);
            res.send(newNote);
        } catch (err: any) {
            throw new Error(err.message);
        }
    })

router.get('/stats', (req, res) => {
    res.send(getStats());
});

router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        try {
            const note = getNoteById(id);
            res.send(note);
        } catch (err: any) {
            throw new Error(err.message);
        }
    })
    .patch((req, res) => {
        const newData = req.body;
        const id = req.params.id;
        try {
            const note = updateNote(id, newData);
            res.send(note);
        } catch (err: any) {
            throw new Error(err.message);
        }
    })
    .delete((req, res) => {
        const id = req.params.id;
        res.send(deleteNote(id))
    })

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    res.send(`${err.name}: ${err.message}`);
})


module.exports = router