import express, {Express} from "express";
import {connectToDB} from "./repositories/dbMethods";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const notes = require("./routes/notes")

app.use('/notes', notes);

app.get('/', (req, res) => {
    res.send("Try notes/ endpoints");
})

const waitForConnect = async () => {
    try {
        const ans = await connectToDB()
        console.log(ans);
    } catch (e) {
        console.log(e);
        return Promise.reject("")
    }

}

waitForConnect().then(() => {
    app.listen(port || 3000, () => {
        console.log(`Listening on port ${port || 3000}`);
    })
});

