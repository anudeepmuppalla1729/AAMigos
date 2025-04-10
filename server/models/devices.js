import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  imeiNumber: { type: String, unique: true, required: true },
  invoicePdfUrl: String,
  model: { type: mongoose.Schema.Types.ObjectId, ref: "DeviceModel", required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  warranty: { type: Boolean, required: true },
  issue : {type : String, required : true}
});
const Device = mongoose.model("Device", deviceSchema);
export default Device;