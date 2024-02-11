const mongoose = require("mongoose");

const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log(`db connected`);
  } catch (err) {
    console.log(err);
  }
};
module.exports = DbConnection;
