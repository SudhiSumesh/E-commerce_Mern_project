const express =require("express");
const { requireSignIn, isAdmin } = require("../Middleware/authMiddleware");
const { getAllUserctController, requestForDeleteController, getDeleteRequestController, approveDeleteRequestController, rejectDeleteRequestController, getDeleteStatusController } = require("../Controllers/UserController");
const router = express.Router();


//get userList ||get method
router.get("/get-all-user", requireSignIn, isAdmin, getAllUserctController);

//request for delete account ||post method
router.post("/delete-request", requireSignIn, requestForDeleteController);

//get all request for delete account ||get method ||admin
router.get(
  "/delete-requests",
  requireSignIn,
  isAdmin,
  getDeleteRequestController
);

//Approve request for delete account ||post method ||admin
router.delete(
  "/approve-delete-request/:id",
  requireSignIn,
  isAdmin,
  approveDeleteRequestController
);

//Approve request for delete account ||get method ||admin
router.put(
  "/reject-delete-request/:id",
  requireSignIn,
  isAdmin,
  rejectDeleteRequestController
);
//get Delete status|| get method
router.get("/delete-status",requireSignIn,getDeleteStatusController)
module.exports = router;