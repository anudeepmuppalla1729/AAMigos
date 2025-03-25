import express from "express";
const router = express.Router();
import { verifyAgent, verifyToken } from "../middlewares/authMiddleware.js";
import { approveRequest, getPendingRequests } from "../controllers/agentReqControllers.js";

router.get("/pendingRequests" , verifyToken, verifyAgent, getPendingRequests);

router.post("/approveRequest/:reqId" , verifyToken, verifyAgent , approveRequest);
export default router;