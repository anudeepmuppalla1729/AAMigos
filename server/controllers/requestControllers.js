import User from "../models/users.js";
import Request from "../models/requests.js";
import Device from "../models/devices.js";
import DeviceModel from "../models/deviceModels.js";
import Company from "../models/companies.js";
import DeviceCategory from "../models/deviceCategories.js";
import ServiceCenter from "../models/serviceCenters.js";

export const getCompanies = async (req, res) => {
    try {
        const { category } = req.params;
        const reqiredCategory = await DeviceCategory.findOne({ name: category });
        const categoryId = reqiredCategory._id;
        const companies = await Company.find({ categories: categoryId });
        res.status(201).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getModels = async (req, res) => {
    const { category , company } = req.params;
    try {
        const reqiredCategory = await DeviceCategory.findOne({ name: category });
        const categoryId = reqiredCategory._id;
        const reqiredCompany = await Company.findOne({ name: company });
        const companyId = reqiredCompany._id;
        const deviceModels = await DeviceModel.find({ company: companyId , category: categoryId });
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
        console.log(req.body)
        const {modelname , warranty , imeiNumber ,issue} = req.body;
        console.log(modelname);
        if(!modelname || !warranty || !imeiNumber || !issue || !req.file){
            return res.status(400).json({message : "All fields are required"});
        }
        const model =  await DeviceModel.findOne({name : modelname});
        console.log(model._id);
        let warrantyStatus = false;
        if(warranty === "Yes"){
            warrantyStatus = true;
        }
        const newDevice = await Device.create({
            imeiNumber,
            model : model._id,
            owner : req.userDetails.id,
            warranty : warrantyStatus,
            issue,
            invoicePdfUrl : req.file.path,
        });

        console.log(newDevice);
    
        const company = await Company.findById(model.company);
        const serviceCenter = await ServiceCenter.findOne({companies : company._id});
        const newRequest = await Request.create({
            user : req.userDetails.id,
            device : newDevice._id,
            status : "Pending",
            selectedServiceCenter : serviceCenter._id,
        });
        console.log(newRequest);
        res.status(201).json(newRequest);
    }
    catch(error){
        console.log(error.message  );
        res.status(500).json({ error: error.message });
    }
}