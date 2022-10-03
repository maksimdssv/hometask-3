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
const dbMethods_1 = require("./repositories/dbMethods");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const notes = require("./routes/notes");
app.use('/notes', notes);
app.get('/', (req, res) => {
    res.send("Try notes/ endpoints");
});
const waitForConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield (0, dbMethods_1.connectToDB)();
        console.log(ans);
    }
    catch (e) {
        console.log(e);
        return Promise.reject("");
    }
});
waitForConnect().then(() => {
    app.listen(port || 3000, () => {
        console.log(`Listening on port ${port || 3000}`);
    });
});
