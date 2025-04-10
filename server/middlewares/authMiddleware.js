import jwt from "jsonwebtoken";
import User from "../models/users.js";
import Agent from "../models/agents.js";

export const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied, token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export const verifyAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findById(req.user.agentId);
    if (!agent) return res.status(403).json({ message: "Access denied, agent only" });
    req.agent = agent; 
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(403).json({ message: "Access denied, user only" });
    req.userDetails = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
