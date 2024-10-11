import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

const port = 8000;

app.listen(port, async () => {
    console.log(`API-Gateway running on port ${port}`);
});
