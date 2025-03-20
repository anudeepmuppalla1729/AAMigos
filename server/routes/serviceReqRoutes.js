import express from "express";
const router = express.Router();
import User from "../models/users.js";
import Request from "../models/requests.js";
import Device from "../models/devices.js";
import DeviceModel from "../models/deviceModels.js";
import Company from "../models/companies";
import DeviceCategory from "../models/deviceCategories";
import multer from 'multer';
import {storage} from '../cloudConfig.js';
const upload = multer({storage});

router.get("/catagories" , async (req, res) => {
    try {
        const deviceCategories = await DeviceCategory.find().populate("companies");
        res.status(201).json(deviceCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/company/:catagoryId", async (req, res) => {
    const { categoryId } = req.params;
    try {
        const companies = await Company.find({ category: categoryId });
        res.status(201).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/model/:companyId", async (req, res) => {
    const { companyId } = req.params;
    try {
        const deviceModels = await DeviceModel.find({ company: companyId });
        res.status(201).json(deviceModels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



