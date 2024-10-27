import cors from "cors";
import express from "express";
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes';


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/user', userRoutes)

const port = 8002;
const mongoUrl = 'mongodb://user-database:27017/test';

mongoose.connect(mongoUrl, {
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Database connection error:', err));

app.listen(port, async () => {
    console.log(`User Service running on port ${port}`);
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});



app.get("/health", (req, res) => {
    res.status(200).send("user Service Healthy");
});