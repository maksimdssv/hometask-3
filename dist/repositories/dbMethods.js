"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.deleteNote = exports.updateNote = exports.addNote = exports.getNoteById = exports.getNotes = void 0;
const dummy_notes_1 = require("../helpers/dummy-notes");
const validate_obj_1 = require("../services/validate-obj");
const helpers_1 = require("../helpers/helpers");
let notesArr = dummy_notes_1.default;
const PATCH_KEYS = { name: "", category: "", content: "", isArchived: false };
const ADD_KEYS = Object.assign({ id: "" }, PATCH_KEYS);
const CATEGORIES = ['Idea', "Random Thought", "Quote", "Task"];
function findIndex(id, isAdding = false) {
    const foundIndex = notesArr.findIndex((note) => note.id === id);
    if (foundIndex === -1 && !isAdding) {
        throw new Error(`Note with id '${id}' wasn't found !`);
    }
    return foundIndex;
}
const getNotes = () => {
    return [...notesArr];
};
exports.getNotes = getNotes;
const getNoteById = (id) => {
    const index = findIndex(id);
    return notesArr[index];
};
exports.getNoteById = getNoteById;
const addNote = (note) => {
    try {
        (0, validate_obj_1.default)(note, ADD_KEYS);
        if (findIndex(note.id, true) !== -1)
            throw new Error(`note with this ID already exists!`);
        if (!CATEGORIES.includes(note.category))
            throw new Error(`Category must be one of the followed: ${CATEGORIES.join(", ")}`);
        const newNote = Object.assign(Object.assign({}, note), { creationDate: (0, helpers_1.getCurrDate)() });
        notesArr.push(newNote);
        return newNote;
    }
    catch (err) {
        throw new Error("Something wrong with provided obj: " + err.message);
    }
};
exports.addNote = addNote;
const updateNote = (id, newData) => {
    try {
        const index = findIndex(id);
        (0, validate_obj_1.default)(newData, PATCH_KEYS, true);
        if (newData.category !== undefined && !CATEGORIES.includes(newData.category))
            throw new Error(`Category must be one of the followed: ${CATEGORIES.join(", ")}`);
        for (const key in newData) {
            notesArr[index][key] = newData[key];
        }
        return notesArr[index];
    }
    catch (err) {
        throw new Error("Something wrong with provided obj: " + err.message);
    }
};
exports.updateNote = updateNote;
const deleteNote = (id) => {
    const index = findIndex(id);
    notesArr.splice(index, 1);
    return "Successfully deleted";
};
exports.deleteNote = deleteNote;
const getStats = () => {
    const result = {};
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
    return result;
};
exports.getStats = getStats;
//# sourceMappingURL=dbMethods.js.map