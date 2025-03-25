import User from "../models/users.js";
import Request from "../models/requests.js";
import Device from "../models/devices.js";
import DeviceModel from "../models/deviceModels.js";
import Company from "../models/companies.js";
import DeviceCategory from "../models/deviceCategories.js";

export const getPendingRequests = async(req,res) =>{
    try{
        const pendingRequests = await Request.find({status:"Pending"})
        .populate("user", "name email phone") // Populating user details
        // .populate({
        //     path: "device",
        //     populate: {
        //     path: "model",
        //     populate: { path: "company", select: "name" }, // Populating company inside model
        //     },
        // })
        // .populate("selectedServiceCenter", "name city address contactNumber"); // Populating service center
        if(!pendingRequests){
            return res.status(200).json({message:"No pending requests found"});
        }
        res.status(200).json(pendingRequests);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

export const approveRequest = async (req,res) =>{
    try{
        const requestId = req.params.reqId; 
        const request = await Request.findById(requestId);
        if(!request){
            return res.status(404).json({message:"Request not found"});
        }
        request.status = "Approved";
        request.assignedAgent = req.agent.id;
        await request.save();
        res.status(200).json({message:"Request approved successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}