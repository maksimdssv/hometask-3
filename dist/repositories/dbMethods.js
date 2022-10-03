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
exports.getStats = exports.deleteNote = exports.updateNote = exports.addNote = exports.getNoteById = exports.getNotes = exports.connectToDB = void 0;
const dummy_notes_1 = __importDefault(require("../helpers/dummy-notes"));
const validate_obj_1 = __importDefault(require("../services/validate-obj"));
const helpers_1 = require("../helpers/helpers");
const sequelize_1 = require("sequelize");
const sequalize = new sequelize_1.Sequelize("postgres://postgres:mysecretpassword@localhost:5432/postgres");
const Note = sequalize.define("Note", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    creationDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.STRING
    },
    isArchived: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    }
});
Note.sync().then(() => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield Note.findAll()).length === 0)
        dummy_notes_1.default.forEach((note) => Note.create(Object.assign({}, note)));
}));
const PATCH_KEYS = { name: "", category: "", content: "", isArchived: false };
const ADD_KEYS = Object.assign({ id: "" }, PATCH_KEYS);
const CATEGORIES = ['Idea', "Random Thought", "Quote", "Task"];
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequalize.authenticate();
        return Promise.resolve("Done");
    }
    catch (err) {
        return Promise.reject("Cant connect: " + err);
    }
});
exports.connectToDB = connectToDB;
function findByIndex(id, isAdding = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundNote = yield Note.findOne({ attributes: { exclude: ["createdAt", 'updatedAt'] }, where: { id: id } });
        if (foundNote === null && !isAdding) {
            throw new Error(`Note with id "${id}" wasn't found !`);
        }
        return foundNote;
    });
}
const getNotes = () => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield Note.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, order: [['id', 'ASC']] });
    return notes.map(note => note.toJSON());
});
exports.getNotes = getNotes;
const getNoteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield findByIndex(id);
    return note === null || note === void 0 ? void 0 : note.toJSON();
});
exports.getNoteById = getNoteById;
const addNote = (note) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, validate_obj_1.default)(note, ADD_KEYS);
        if (yield findByIndex(note.id, true))
            throw new Error(`note with this ID already exists!`);
        if (!CATEGORIES.includes(note.category))
            throw new Error(`Category must be one of the followed: ${CATEGORIES.join(", ")}`);
        const newNote = Object.assign(Object.assign({}, note), { creationDate: (0, helpers_1.getCurrDate)() });
        yield Note.create(Object.assign({}, newNote));
        return newNote;
    }
    catch (err) {
        throw new Error("Something wrong with provided obj: " + err.message);
    }
});
exports.addNote = addNote;
const updateNote = (id, newData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield findByIndex(id);
        (0, validate_obj_1.default)(newData, PATCH_KEYS, true);
        if (newData.category !== undefined && !CATEGORIES.includes(newData.category))
            throw new Error(`Category must be one of the followed: ${CATEGORIES.join(", ")}`);
        note === null || note === void 0 ? void 0 : note.set(newData);
        yield (note === null || note === void 0 ? void 0 : note.save());
        return note === null || note === void 0 ? void 0 : note.toJSON();
    }
    catch (err) {
        throw new Error("Something wrong with provided obj: " + err.message);
    }
});
exports.updateNote = updateNote;
const deleteNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield findByIndex(id);
    note === null || note === void 0 ? void 0 : note.destroy();
    return "Successfully deleted";
});
exports.deleteNote = deleteNote;
const getStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield Note.findAll();
    const formattedNotes = notes.map(note => note.toJSON());
    const result = {};
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
});
exports.getStats = getStats;
