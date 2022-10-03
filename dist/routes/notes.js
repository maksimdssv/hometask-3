"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbMethods_1 = require("../repositories/dbMethods");
const router = express_1.default.Router();
router.route("/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, dbMethods_1.getNotes)());
}))
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const note = req.body;
    try {
        const newNote = yield (0, dbMethods_1.addNote)(note);
        res.send(newNote);
    }
    catch (err) {
        next(err.message);
    }
}));
router.get('/stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, dbMethods_1.getStats)());
}));
router.route('/:id')
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const note = yield (0, dbMethods_1.getNoteById)(id);
        res.send(note);
    }
    catch (err) {
        next(err.message);
    }
}))
    .patch((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = req.body;
    const id = req.params.id;
    try {
        const note = yield (0, dbMethods_1.updateNote)(id, newData);
        res.send(note);
    }
    catch (err) {
        next(err.message);
    }
}))
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        res.send(yield (0, dbMethods_1.deleteNote)(id));
    }
    catch (err) {
        next(err.message);
    }
}));
router.use((err, req, res, next) => {
    res.status(400);
    res.send(`Error: ${err}`);
});
module.exports = router;
