import express from "express";
import { connectDB } from "./config/connection_Db.js";
import "dotenv/config";
import userRoute from "./USER/routers/userRouter.js";
import noteRouter from "./Notes/routers/noteRouter.js";
const app = express();
app.use(express.json());
connectDB();
app.use("/users", userRoute);
app.use("/notes", noteRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
