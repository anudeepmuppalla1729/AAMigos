import express from "express";
import { verifyToken ,verifyUser } from "../middlewares/authMiddleware.js";
import { allOrders, getActiveOrders, getPendingOrders, getDetails, latestUnpaidOrder, updateDetails } from "../controllers/customerMain.js";
const router = express.Router();

router.get("/activeOrders" , verifyToken , verifyUser , getActiveOrders);

router.get("/pendingOrders" , verifyToken, verifyUser, getPendingOrders);

router.get("/latestUnpaidOrder", verifyToken, verifyUser, latestUnpaidOrder);

router.get("/allOrders" , verifyToken , verifyUser , allOrders);

router.get("/getDetails" , verifyToken, verifyUser, getDetails);

router.put("/updateDetails", verifyToken, verifyUser , updateDetails);

export default router;