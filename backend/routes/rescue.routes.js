import express from "express";
import { upload } from "../config/multer.js";
import { 
  acceptRescueRequest, 
  createRescueRequest, 
  getAllRequestsOfUser,
  getActiveRequest,
  getCompletedRequest
} from "../controllers/rescue.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/create", isAuth, upload.single("image"), createRescueRequest);
router.put("/accept", isAuth, acceptRescueRequest);
router.get("/all-requests-user/:userId", isAuth, getAllRequestsOfUser);
router.get("/active-requests-user/:userId", isAuth, getActiveRequest);
router.get("/completed-requests-user/:userId", isAuth, getCompletedRequest);

export const rescueRouter = router;