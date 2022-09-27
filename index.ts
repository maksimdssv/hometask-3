import express, {Express} from "express";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const notes = require("./routes/notes")

app.use('/notes', notes);

app.get('/', (req, res) => {
    res.send("Try notes/ endpoints");
})

app.listen(port || 3000, () => {
    console.log(`Listening on port ${port || 3000}`);
})