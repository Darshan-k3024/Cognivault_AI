import express from 'express';
import dotenv from 'dotenv';
import connextDB from './utils/connectDB.js';
import authRouter from "./routes/authROute.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import notesRouter from './routes/genrateRoute.js';
import pdfRouter from './routes/pdfDowonloadROute.js';
import creditRouter from './routes/creditsRoute.js';
import { stripeWebhook } from './controllers/creditController.js';

dotenv.config();

const app = express();

app.post("api/credits/webhook",express.raw({type:"application/json"}),stripeWebhook)

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET","POST","PUT","DELETE"]
}));

app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is working!');
});

app.get('/data', (req, res) => {
    res.send("<h1>Darshan</h1>");
});

app.use("/api/auth", authRouter);
app.use("/api/user",userRouter)
app.use("/api/notes",notesRouter)
app.use("/api/pdf",pdfRouter)
app.use("/api/credit",creditRouter)


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    console.log(`Server is running on port ${PORT}`);
    connextDB();
});
