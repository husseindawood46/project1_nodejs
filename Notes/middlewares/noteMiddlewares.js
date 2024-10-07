import noteModel from "../model/noteModle.js";
import jwt from "jsonwebtoken";
export const authentication = async (req, res, next) => {
  const token = req.header("token");
  //   console.log(token);
  if (!token) return res.status(401).json({ message: "unauthorize" });

  const verified = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (error, decodedToken) => {
      if (error) return res.status(498).json({ message: "Invalid token" });
      //   send the decoded token to the authorize
      req.user = decodedToken;
      next();
    }
  );
};
// return middleware    
export const authorize = (role) => {
  return (req, res, next) => {
    const { role: userRole } = req.user;
    if (role !== userRole)
      return res.status(403).json({ message: "Invalid role" });
    next();
  };
};
