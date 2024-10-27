import cors from "cors";
import express from "express";
import mongoose from 'mongoose';
import timerRoutes from './routes/timer.routes';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/timer', timerRoutes);


const port = 8003;

const mongoUrl = 'mongodb://user-database:27017/test';

mongoose.connect(mongoUrl, {
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Database connection error:', err));

app.listen(port, async () => {
    console.log(`timerService running on port ${port}`);
});


