import { Router } from "express";
import {
  addNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/noteController.js";
import { authentication, authorize } from "../middlewares/noteMiddlewares.js";
const noteRoute = Router();
noteRoute.route("/").get(authentication,authorize("ADMIN"),getAllNotes).post(authentication, authorize("ADMIN"),addNote);
noteRoute.route("/:id").put(authentication, authorize("ADMIN"),updateNote).delete(authentication, authorize("ADMIN"),deleteNote);
export default noteRoute;
