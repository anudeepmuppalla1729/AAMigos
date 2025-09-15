import User from "../models/users.js";
import Request from "../models/requests.js";

export const getActiveOrders = async(req,res) =>{
    try{
        const userId = req.userDetails.id;
        const activeOrders = await Request.find({
            user:userId, 
            status:{ $nin: ["Pending", "Completed", "Cancelled","Paid"] },
        }).populate({
                    path: "device",
                    populate: {
                    path: "model",
                    select: "name img",
                    },
                })
        if(!activeOrders){
            return res.status(200).json({message: "No active orders found"});
        }
        res.status(200).json(activeOrders);
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}

export const getPendingOrders = async(req,res) =>{
    try{
        const userId = req.userDetails.id; 
        const pendingOrders = await Request.find({
            user:userId,
            status:"Pending", 
        }).populate({
            path: "device",
            populate: {
            path: "model",
            select: "name img",
            },
        })
        if(!pendingOrders){
            return res.status(200).json({message: "No pending orders found"}); 
        }
        res.status(200).json(pendingOrders);
    }catch(error){
        res.status(500).json({message: "Internal server error"}); 
    }
}

export const latestUnpaidOrder = async(userId) =>{
    try{
    const unpaidOrders = await Request.findOne({
            user:userId,
            status:{ $nin: ["Pending","Approved","Paid","PickedUp","Completed","Cancelled"] },  
        }).sort({createdAt: -1})
        .populate({
            path: "device",
            populate: {
            path: "model",
            select: "name",
            },
        }) 
        if(!unpaidOrders){
            res.status(200).json({message: "No unpaid orders found"});
        }
        res.status(200).json(unpaidOrders);
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}

export const allOrders = async(req,res) =>{
    try{
        const userId = req.userDetails.id;
        const allOrders = await Request.find({user:userId})
        .populate({
            path: "device",
            populate: {
            path: "model",
            select: "name img",
            },
        }) 
        if(!allOrders){
            return res.status(200).json({message: "No orders found"});
        }
        res.status(200).json(allOrders); 
    }catch(error){
        res.status(500).json({message: "Internal server error"}); 
    }
}

export const getDetails = async(req,res) =>{
    try{
        const userId = req.userDetails.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } 
    catch(error){
        res.status(500).json({message: "Internal server error"}); 
    }
}

export const updateDetails = async(req,res) =>{
    try{
        const userId = req.userDetails.id;
        const user = await User.findById(userId);
        const {name, phone, email,  dno, street, city, pincode} = req.body;
        if(!user){
            return res.status(404).json({message: "User not found"}); 
        }
        if(name){
            user.name = name;
        }
        if(phone){
            user.phone = phone;
       
        }
        if(email){
            user.email = email;
        }
        if(dno){
            user.address.dno = dno;
        }
        if(street){
            user.address.street = street;
        }
        if(city){
            user.address.city = city;
        }
        if(pincode){
            user.address.pincode = pincode;
        }
        await user.save();
        res.status(200).json({message: "User details updated successfully"});
    } 
    catch(error){
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
        .populate("assignedAgent", "name profilePicture phone");
        if(!request){
            return res.status(404).json({message: "Request not found"}); 
        }
        res.status(200).json(request);
    } 
    catch(error){
        res.status(500).json({message:error.message});
    }
}

export const cancelOrder= async (req,res) =>{
    try{
        const requestId = req.params.reqId;
        const request = await Request.findById(requestId);
        if(!request){
            return res.status(404).json({message: "Request not found"});
       
        }
        request.status = "Cancelled";
        await request.save();
        return res.status(200).json({message: "Request cancelled successfully"}); 
    } 
    catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}

export const getPackages = async(req,res) =>{
    try{
       const requestId = req.params.reqId;
       console.log(requestId);
       const request = await Request.findById(requestId)
      .populate({
        path: "device",
        populate: {
          path: "model",
          select: "name img"
        }
      });
       if(!request){
        return res.status(404).json({message: "Request not found"});
        }
    const { affordable, goodToHave, niceToHave, device } = request;

    const formatPackage = (pkgMap) => {
      const entries = Object.fromEntries(pkgMap);
      return Object.entries(entries).map(([label, price]) => ({
        label,
        price,
      }));
    };

    const packages = {
      affordable: formatPackage(affordable),
      goodToHave: formatPackage(goodToHave),
      niceToHave: formatPackage(niceToHave)
    };

    return res.status(200).json({
      device: {
        modelName: device.model.name,
        modelImage: device.model.img,
      },
      packages
    });
    } 
    catch(error){
        res.status(500).json({message: "Internal server error"}); 
    }
}

 export const updatePackage=async (req,res) =>{
    try{
        const { reqId , name} = req.params;
        const request = await Request.findById(reqId); 
        request.userPackage = name;
        await request.save();
        return res.status(200).json({message: "Package updated successfully"});
    } 
    catch(error){
        res.status(500).json({message: "Internal server error"}); 
    }
}

export const requestById = async(req,res) =>{
    try{
        const requestId = req.params.reqId;
        const request = await Request.findById(requestId);
        if(!request){
            return res.status(404).json({message: "Request not found"});
        }
        return res.status(200).json(request); 
    } 
    catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}