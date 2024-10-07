import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  register,
  signin,
  updateUser,
} from "../controllers/userController.js";
import {
  authentication,
  authorize,
} from "../../Notes/middlewares/noteMiddlewares.js";

const userRoute = Router();
userRoute
  .route("/")
  .post(register)
  .get(authentication, authorize("ADMIN"), getAllUser);
userRoute
  .route("/:id")
  .put(authentication, authorize("ADMIN"), updateUser)
  .delete(authentication, authorize("ADMIN"), deleteUser);
userRoute.route("/signin").post(signin);

export default userRoute;
