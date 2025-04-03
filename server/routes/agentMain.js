import express from "express";
const router = express.Router();
import { verifyAgent, verifyToken } from "../middlewares/authMiddleware.js";
import { approveRequest, editDetails, getAllAssignedRequests, getDetails, getOngoingRequests, getPendingRequests } from "../controllers/agentMainControllers.js";

router.get("/pendingRequests" , verifyToken, verifyAgent, getPendingRequests);

router.post("/approveRequest/:reqId" , verifyToken, verifyAgent , approveRequest);

router.get("/onGoingRequests" , verifyToken, verifyAgent, getOngoingRequests);

router.get("/allAssignedRequests", verifyToken, verifyAgent,getAllAssignedRequests);

router.get("/getDetails" , verifyToken, verifyAgent, getDetails);

router.put("/updateDetails", verifyToken, verifyAgent, editDetails);
export default router;