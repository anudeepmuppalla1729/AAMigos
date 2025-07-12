import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes/index.js';
dotenv.config();

const app = express();
let a = "anudeep";
app.use(express.json());
app.use(cors());

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB : ${process.env.MONGO_URI}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectDb();

app.use('/api' , routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
