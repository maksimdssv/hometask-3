import DUMMY_NOTES, {Note} from "../helpers/dummy-notes";
import isNote from "../services/validate-obj";
import {getCurrDate} from "../helpers/helpers";
import {DataTypes, Sequelize} from "sequelize";

const {DB_HOST} = process.env;


const sequalize = new Sequelize(`postgres://postgres:mysecretpassword@${DB_HOST ?? "localhost"}:5432/postgres`);

const Note = sequalize.define("Note", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creationDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING
    },
    isArchived: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

Note.sync().then(async () => {
    if ((await Note.findAll()).length === 0) DUMMY_NOTES.forEach((note) => Note.create({...note}))
})

const PATCH_KEYS = {name: "", category: "", content: "", isArchived: false};
const ADD_KEYS = {id: "", ...PATCH_KEYS};
const CATEGORIES = ['Idea', "Random Thought", "Quote", "Task"];

export const connectToDB = async () => {
    try {
        await sequalize.authenticate()
        return Promise.resolve("Done")
    } catch (err) {
        return Promise.reject("Cant connect: " + err)
    }
}

async function findByIndex(id: string, isAdding = false) {
    const foundNote = await Note.findOne({attributes: {exclude: ["createdAt", 'updatedAt']}, where: {id: id}});
    if (foundNote === null && !isAdding) {
        throw new Error(`Note with id "${id}" wasn't found !`)
    }
    return foundNote;
}

export const getNotes = async () => {
    const notes = await Note.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}, order: [['id', 'ASC']]});
    return notes.map(note => note.toJSON());
}

export const getNoteById = async (id: string) => {
    const note = await findByIndex(id);
    return note?.toJSON();
}


export const addNote = async (note: Note) => {
    try {
        isNote(note, ADD_KEYS)
        if (await findByIndex(note.id, true)) throw new Error(`note with this ID already exists!`);
        if (!CATEGORIES.includes(note.category)) throw new Error(`Category must be one of the followed: ${CATEGORIES.join(", ")}`);
        const newNote = {...note, creationDate: getCurrDate()}
        await Note.create({...newNote})
        return newNote;
    } catch (err: any) {
        throw new Error("Something wrong with provided obj: " + err.message);
    }
}

export const updateNote = async (id: string, newData: Note) => {
    try {
        const note = await findByIndex(id);
        isNote(newData, PATCH_KEYS, true);
        if (newData.category !== undefined && !CATEGORIES.includes(newData.category)) throw new Error(`Category must be one of the followed: ${CATEGORIES.join(", ")}`);
        note?.set(newData);
        await note?.save();
        return note?.toJSON();
    } catch (err: any) {
        throw new Error("Something wrong with provided obj: " + err.message);
    }
}

export const deleteNote = async (id: string) => {
    const note = await findByIndex(id);
    note?.destroy();
    return "Successfully deleted";
}

export const getStats = async () => {
    const notes = await Note.findAll();
    const formattedNotes: Note[] = notes.map(note => note.toJSON());
    const result: { [key: string]: { active: number, archived: number } } = {};
    formattedNotes.forEach((note) => {
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

