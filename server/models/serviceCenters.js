import mongoose from "mongoose";

const serviceCenterSchema = new mongoose.Schema({
  name: String,
  city: String,
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  contactNumber: String
});
const ServiceCenter = mongoose.model("ServiceCenter", serviceCenterSchema);

export default ServiceCenter;