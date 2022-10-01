import DUMMY_NOTES, {Note} from "../helpers/dummy-notes";
import isNote from "../services/validate-obj";
import {getCurrDate} from "../helpers/helpers";

let notesArr = DUMMY_NOTES;
const PATCH_KEYS = {name: "", category: "", content: "", isArchived: false};
const ADD_KEYS = {id: "", ...PATCH_KEYS};
const CATEGORIES = ['Idea', "Random Thought", "Quote", "Task"];

function findIndex(id: string, isAdding = false) {
    const foundIndex = notesArr.findIndex((note) => note.id === id);
    if (foundIndex === -1 && !isAdding) {
        throw new Error(`Note with id '${id}' wasn't found !`)
    }
    return foundIndex;
}

export const getNotes = () => {
    return [...notesArr];
}

export const getNoteById = (id: string) => {
    const index = findIndex(id);
    return notesArr[index];
}


export const addNote = (note: Note) => {
    try {
        isNote(note, ADD_KEYS)
        if (findIndex(note.id, true) !== -1) throw new Error(`note with this ID already exists!`);
        if (!CATEGORIES.includes(note.category)) throw new Error(`Category must be one of the followed: ${CATEGORIES.join(", ")}`);
        const newNote = {...note, creationDate: getCurrDate()}
        notesArr.push(newNote);
        return newNote;
    } catch (err: any) {
        throw new Error("Something wrong with provided obj: " + err.message);
    }
}

export const updateNote = (id: string, newData: Note) => {
    try {
        const index = findIndex(id);
        isNote(newData, PATCH_KEYS, true);
        if (newData.category !== undefined && !CATEGORIES.includes(newData.category)) throw new Error(`Category must be one of the followed: ${CATEGORIES.join(", ")}`);
        for (const key in newData) {
            notesArr[index][key as keyof {}] = newData[key as keyof {}];
        }
        return notesArr[index];
    } catch (err: any) {
        throw new Error("Something wrong with provided obj: " + err.message);
    }
}

export const deleteNote = (id: string) => {
    const index = findIndex(id);
    notesArr.splice(index, 1);
    return "Successfully deleted";
}

export const getStats = () => {
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
    return result;
}

