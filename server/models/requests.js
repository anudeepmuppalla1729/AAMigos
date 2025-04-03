import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  device: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true },
  issueDescription: String,
  status: { 
    type: String, 
    enum: ["Pending", "Approved", "PickedUp", "FreeApproval", "InRepair", "Delivering", "Paid", "Completed", "Cancelled"],
    default: "Pending" 
  },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  selectedServiceCenter: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceCenter" },
  affordable: { type: Map, of: Number},
  goodToHave : { type: Map, of: Number},
  niceToHave: { type: Map, of: Number},
  userPackage: { 
    type: String,
    enum: ["affordable", "goodToHave", "niceToHave","Pending"],
    default: "Pending"
   },
  amountDue: { type: Number, default: 300 },
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Request = mongoose.model("Request", requestSchema);
export default Request;