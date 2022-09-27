"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const notes = require("./routes/notes");
app.use('/notes', notes);
app.get('/', (req, res) => {
    res.send("Try notes/ endpoints");
});
app.listen(port || 3000, () => {
    console.log(`Listening on port ${port || 3000}`);
});
