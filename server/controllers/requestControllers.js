import User from "../models/users.js";
import Request from "../models/requests.js";
import Device from "../models/devices.js";
import DeviceModel from "../models/deviceModels.js";
import Company from "../models/companies.js";
import DeviceCategory from "../models/deviceCategories.js";
import ServiceCenter from "../models/serviceCenters.js";

export const getCatogaries = async (req, res) => {
    try {
        const deviceCategories = await DeviceCategory.find().populate("companies");
        res.status(201).json(deviceCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCompanies = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const companies = await Company.find({ category: categoryId });
        res.status(201).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getModels = async (req, res) => {
    const { companyId } = req.params;
    try {
        const deviceModels = await DeviceModel.find({ company: companyId });
        res.status(201).json(deviceModels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getRequests = async (req, res) => {
    try {
        const requests = await Request.find({user : req.userDetails.id}).populate("device").populate("user");
        res.status(201).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const postRequest = async(req,res) => {
    try{
        const {modelname , warranty , imeiNumber ,issue} = req.body;
        if(!modelname || !warranty || !imeiNumber || !issue || !req.file){
            return res.status(400).json({message : "All fields are required"});
        }
        const model =  await DeviceModel.find({name : modelname});
        const newDevice = await Device.create({
            imeiNumber,
            model : model[0]._id,
            owner : req.userDetails.id,
            warranty,
            issue,
            invoicePdfUrl : req.file.path,
        });

        const company = await Company.findById(model[0].company);
        const serviceCenter = await ServiceCenter.findOne({company : company._id});
        const newRequest = await Request.create({
            user : req.userDetails.id,
            device : newDevice._id,
            status : "Pending",
            selectedServiceCenter : serviceCenter._id,
        }).populate("device").populate("user");

        res.status(201).json(newRequest);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}