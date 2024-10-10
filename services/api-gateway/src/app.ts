import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

const port = 1234;

const test = 1;

app.listen(port, async () => {
    console.log(`API-Gateway running on port ${port}`);
});
