import express, {NextFunction, Request, Response} from "express";
import {addNote, getNotes, getNoteById, getStats, updateNote, deleteNote} from "../repositories/dbMethods";

const router = express.Router()


router.route("/")
    .get(async (req, res) => {
        res.send(await getNotes());
    })
    .post(async (req, res, next) => {
        const note = req.body;
        try {
            const newNote = await addNote(note);
            res.send(newNote);
        } catch (err: any) {
            next(err.message);
        }
    })

router.get('/stats', async (req, res) => {
    res.send(await getStats());
});

router.route('/:id')
    .get(async (req, res, next) => {
        const id = req.params.id;
        try {
            const note = await getNoteById(id);
            res.send(note);
        } catch (err: any) {
            next(err.message);
        }
    })
    .patch(async (req, res, next) => {
        const newData = req.body;
        const id = req.params.id;
        try {
            const note = await updateNote(id, newData);
            res.send(note);
        } catch (err: any) {
            next(err.message);
        }
    })
    .delete(async (req, res, next) => {
        const id = req.params.id;
        try {
            res.send(await deleteNote(id))
        } catch (err: any) {
            next(err.message)
        }
    })

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400);
    res.send(`Error: ${err}`);
})


module.exports = router