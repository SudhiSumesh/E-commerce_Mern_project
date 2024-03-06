const userModel = require("../Models/userModel");

//get all users
exports.getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      totalUser: users.length,
      message: "successfully getted All Users ",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting Users",
      error: error.message,
    });
  }
};

//req for delete account
exports.requestForDeleteController = async (req, res) => {
  try {
    const { reason } = req.body;
    // Save delete request in user document
    const user = await userModel.findByIdAndUpdate(req.user._id, {
      deleteRequest: { reason, status: "pending" },
    });
    if(!user){
      return res.status(401).json({message:"user not found",success:false})
    }
    res.status(200)
      .json({ success: true, message: "Delete request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Admin Fetches Delete Requests

exports.getDeleteRequestController = async (req, res) => {
  try {
    // Fetch all user delete requests
    const deleteRequests = await userModel.find(
      { "deleteRequest.status": "pending" },
      { name: 1, email: 1, "deleteRequest.reason": 1, _id: 1 }
    );
    res.status(200).json({ success: true, deleteRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Admin Approves Delete Request

exports.approveDeleteRequestController = async (req, res) => {
  try {
    // Update user's delete request status
    // await userModel.findByIdAndUpdate(requestId, {
    //   "deleteRequest.status": "approved",
    // });
    if (!req.params.id) {
      return res
        .status(401)
        .json({ success: false, message: "req id required" });
    }
    // Find user by deleteRequest._id and delete it
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Delete request approved and user account deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Admin Rejects Delete Request
exports.rejectDeleteRequestController = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(401)
        .json({ success: false, message: "req id required" });
    }
    // Update user's delete request status based on deleteRequest._id
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
      "deleteRequest.status": "rejected",
    });

    // If no user is found with the provided ID, return 404 error
    if (!updatedUser) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    res.status(201).json({ success: true, message: "Delete request rejected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get delete status
exports.getDeleteStatusController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const deletionStatus = user?.deleteRequest
      ? user.deleteRequest.status
      : "not requested";
    res.status(200).json({ success: true, status: deletionStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
