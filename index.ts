import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import router from "./routes/patients";

const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
    console.log("pinged");
    res.send("pong");
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
