import User from "../models/users.js";
import Request from "../models/requests.js";
import Device from "../models/devices.js";
import DeviceModel from "../models/deviceModels.js";
import Company from "../models/companies.js";
import DeviceCategory from "../models/deviceCategories.js";
import Agent from "../models/agents.js";

export const getPendingRequests = async(req,res) =>{
    try{
        const pendingRequests = await Request.find({status:"Pending"})
        .populate("user", "name profilePicture") // Populating user details
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

export const getOngoingRequests = async (req,res) =>{
    try{
        let agentId = req.agent.id;
        const ongoingRequests = await Request.find({
            status:{ $nin: ["Pending", "Completed", "Cancelled"] },
            assignedAgent: agentId
        }).populate({
                    path: "device",
                    populate: {
                    path: "model",
                    select: "name img",
                    },
                })  
        if(!ongoingRequests){
            return res.status(200).json({message:"No ongoing requests found"}); 
        }     
        res.status(200).json(ongoingRequests);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

export const getAllAssignedRequests = async (req,res) =>{
    try{
        console.log("getAllAssignedRequests");
        let agentId = req.agent.id;
        const assignedRequests = await Request.find({assignedAgent: agentId})
        .populate({
            path: "device",
            populate: {
            path: "model",
            select: "name img",
            },
        });

        console.log(assignedRequests);
        if(!assignedRequests){
            return res.status(200).json({message:"No assigned requests found"});
        }
        res.status(200).json(assignedRequests);
    }catch(error){
        res.status(500).json({message:error.message}); 
    } 
}

export const getDetails = async (req,res) =>{
    try{
        const agentId = req.agent.id;
        const agent = await Agent.findById(agentId);
        if(!agent){
            return res.status(404).json({message:"Agent not found"});
        }
        res.status(200).json(agent); 
    }catch(error){
        res.status(500).json({message:error.message}); 
    }
}

export const editDetails = async (req,res) =>{
    try{
     const {name, phone, email,  dno, street, city, pincode , panCard , adhaarNumber} = req.body;
        const agentId = req.agent.id;
        const agent = await Agent.findById(agentId);
        if(!agent){
            return res.status(404).json({message: "Agent not found"});
        }
        if(name){
            agent.name = name;
        }
        if(phone){
            agent.phone = phone;
        }
        if(email){
            agent.email = email;
       
        }
        if(dno){
            agent.address.dno = dno;
        }
        if(street){
            agent.address.street = street;
        }
        if(city){
            agent.address.city = city;
        }
        if(pincode){
            agent.address.pincode = pincode;
        }
        if(panCard){
            agent.panCard = panCard;
        }
        if(adhaarNumber){
            agent.aadharNumber = adhaarNumber; 
        }
        if(req.file){
            agent.profilePicture = req.file.path;
        }
        await agent.save();
        res.status(201).json({message: "Agent updated successfully"});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}

export const trackOrder= async (req,res) =>{
    try{
        const requestId = req.params.reqId;
        const request = await Request.findById(requestId)  
        .populate({
            path: "device",
            populate: {
            path: "model",
            select: "name img",
            },
        })
        .populate("user", "name profilePicture phone address");
    } 
    catch(error){
        res.status(500).json({message:error.message});
    }
}

export const updateStatus = async (req,res) =>{
    try{
        const {requestId ,status} =  req.params;
        const request = await Request.findById(requestId); 
        request.status = status;
        await request.save();
        res.status(200).json({message:"Status updated successfully"});
    } 
    catch(error){
        res.status(500).json({message:error.message});
    }
}
export const packages = async (req,res) =>{
    try{
        const {affordable,goodToHave,niceToHave}= req.body;
        const {requestId} = req.params;
        const request = await Request.findById(requestId);
        request.affordable = affordable;
        request.goodToHave = goodToHave;
        request.niceToHave = niceToHave
        await request.save();
        res.status(200).json({message:"Packages updated successfully"});
    } 
    catch(error){
        res.status(500).json({message:error.message});
    }
}

export const getPackage = async (req,res) =>{
    try{
        const {requestId} = req.params;
        const {userPackage}=req.body;
        const request = await Request.findById(requestId)  
        .populate({
            path: "device",
            populate: {
            path: "model",
            select: "name img",
            },
        })
        res.status(200).json(request);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}