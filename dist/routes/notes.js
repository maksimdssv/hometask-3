"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dbMethods_1 = require("../repositories/dbMethods");
const router = express_1.default.Router();
router.route("/")
    .get((req, res) => {
    res.send((0, dbMethods_1.getNotes)());
})
    .post((req, res) => {
    const note = req.body;
    try {
        const newNote = (0, dbMethods_1.addNote)(note);
        res.send(newNote);
    }
    catch (err) {
        throw new Error(err.message);
    }
});
router.get('/stats', (req, res) => {
    res.send((0, dbMethods_1.getStats)());
});
router.route('/:id')
    .get((req, res) => {
    const id = req.params.id;
    try {
        const note = (0, dbMethods_1.getNoteById)(id);
        res.send(note);
    }
    catch (err) {
        throw new Error(err.message);
    }
})
    .patch((req, res) => {
    const newData = req.body;
    const id = req.params.id;
    try {
        const note = (0, dbMethods_1.updateNote)(id, newData);
        res.send(note);
    }
    catch (err) {
        throw new Error(err.message);
    }
})
    .delete((req, res) => {
    const id = req.params.id;
    res.send((0, dbMethods_1.deleteNote)(id));
});
router.use((err, req, res, next) => {
    res.status(500);
    res.send(`${err.name}: ${err.message}`);
});
module.exports = router;
//# sourceMappingURL=notes.js.map