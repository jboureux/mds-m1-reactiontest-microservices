import cors from "cors";
import express from "express";
import authRoutes from './routes/auth.routes';


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', authRoutes);

const port = 8001;

app.listen(port, async () => {
    console.log(`Auth Service running on port ${port}`);
});

app.get('/auth-route', (req, res) => {
    res.json({ message: 'Hello from auth service!' });
  });

app.get("/health", (req, res) => {
    console.log("health test");
    res.status(200).send("Auth Service Healthy");
});
