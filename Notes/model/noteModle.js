import mongoose from "mongoose";
const tasks = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 
  }
});

const noteModel = mongoose.model("Task", tasks);
export default noteModel;
