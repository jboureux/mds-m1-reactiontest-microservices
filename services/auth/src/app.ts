import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

const port = 8001;

app.listen(port, async () => {
    console.log(`Auth Service running on port ${port}`);
});

app.get("/health", (req, res) => {
    console.log("health test");
    res.status(200).send("Auth Service Healthy");
});
