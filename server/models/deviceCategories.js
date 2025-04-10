import mongoose from "mongoose";

const deviceCategorySchema = new mongoose.Schema({
  name: { type: String, enum: ["Smartphones", "Tablets", "Laptops"], required: true },
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }] // Now stores companies
});

const DeviceCategory = mongoose.model("DeviceCategory", deviceCategorySchema);

export default DeviceCategory;