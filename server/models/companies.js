import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "DeviceCategory", required: true }],
  models: [{ type: mongoose.Schema.Types.ObjectId, ref: "DeviceModel" }],
  serviceCenters: [{ type: mongoose.Schema.Types.ObjectId, ref: "ServiceCenter" }]
});

const Company = mongoose.model("Company", companySchema);

export default Company;