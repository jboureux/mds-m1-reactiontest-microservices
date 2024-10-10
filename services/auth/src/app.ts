import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

const port = 1235;

app.listen(port, async () => {
    console.log(`Auth Service running on port ${port}`);
});
