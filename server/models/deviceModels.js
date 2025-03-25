import mongoose from "mongoose";

const deviceModelSchema = new mongoose.Schema({
  name: String,
  img : String,
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true }
});

const DeviceModel = mongoose.model("DeviceModel", deviceModelSchema);

export default DeviceModel;