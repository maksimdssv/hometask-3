import express, {NextFunction, Request, Response} from "express";
import DUMMY_NOTES from "../helpers/dummy-notes";
import {getCurrDate} from "../helpers/helpers";
import isNote from "../services/validate-obj";

let notesArr = DUMMY_NOTES;
const ADD_KEYS = {name: "", category: "", content: ""};
const PATCH_KEYS = {name: "", category: "", content: "", isArchived: false};
const CATEGORIES = ['Idea', "Random Thought", "Quote", "Task"];
let newId = 7;

const router = express.Router()


router.route("/")
    .get((req, res) => {
        res.send(notesArr);
    })
    .post((req, res) => {
        const note = req.body;
        try {
            isNote(note, ADD_KEYS)
            if (!CATEGORIES.includes(note.category)) throw new Error(`Category must be one of the followed: ${CATEGORIES.join(", ")}`)
            const newNote = {id: "q" + ++newId, creationDate: getCurrDate(), ...note}
            notesArr.push(newNote);
            res.send(newNote);
        } catch (err: any) {
            throw new Error("Something wrong with provided obj: " + err.message);
        }
    })

router.get('/stats', (req, res) => {
    const result: { [key: string]: { active: number, archived: number } } = {};
    notesArr.forEach((note) => {
        const category = note.category;
        if (result[category] === undefined) {
            result[category] = {
                active: 0,
                archived: 0
            };
        }
        const currState = note.isArchived ? "archived" : "active";
        result[category][currState] += 1;
    });
    res.send(result);
});

router.use("/:id", (req, res, next) => {
    const id = req.params.id;
    const foundIndex = notesArr.findIndex((note) => note.id === id);
    if (foundIndex === -1) {
        throw new Error(`Note with id "${id}" wasn't found !`)
    }
    next();
})

router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        const note = notesArr.filter((note) => note.id === id)[0];
        res.send(note);
    })
    .patch((req, res) => {
        const note = req.body;
        const id = req.params.id;
        const foundIndex = notesArr.findIndex((note) => note.id === id);
        try {
            isNote(note, PATCH_KEYS)
            if (!CATEGORIES.includes(note.category)) throw new Error(`Category must be one of the followed: ${CATEGORIES.join(", ")}`)
            notesArr[foundIndex] = {...notesArr[foundIndex], ...note};
            res.send(note);
        } catch (err: any) {
            throw new Error("Something wrong with provided obj: " + err.message);
        }
    })
    .delete((req, res) => {
        const id = req.params.id;
        notesArr = notesArr.filter((note) => note.id !== id);
        res.send("Successfully deleted");
    })


router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    res.send(`${err.name}: ${err.message}`);
})


module.exports = router