import express from "express";
import { verifyToken ,verifyUser } from "../middlewares/authMiddleware.js";
import { allOrders, getActiveOrders, getPendingOrders, getDetails, latestUnpaidOrder, updateDetails,trackOrder, cancelOrder, getPackages, updatePackage } from "../controllers/customerMain.js";
const router = express.Router();

router.get("/activeOrders" , verifyToken , verifyUser , getActiveOrders);

router.get("/pendingOrders" , verifyToken, verifyUser, getPendingOrders);

router.get("/latestUnpaidOrder", verifyToken, verifyUser, latestUnpaidOrder);

router.get("/allOrders" , verifyToken , verifyUser , allOrders);

router.get("/getDetails" , verifyToken, verifyUser, getDetails);

router.put("/updateDetails", verifyToken, verifyUser , updateDetails);

router.get("/trackOrder/:reqId",verifyToken, verifyUser,trackOrder);

router.post("/cancelOrder/:reqId",verifyToken, verifyUser,cancelOrder)

router.get("/getPackages/:reqID",verifyToken, verifyUser,getPackages)

router.post("/updatePackages/:reqID",verifyToken, verifyUser,updatePackage)
export default router;