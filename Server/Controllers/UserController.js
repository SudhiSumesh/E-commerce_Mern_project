const userModel = require("../Models/userModel");


//get all users
exports.getAllUserctController = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      .limit(15)
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