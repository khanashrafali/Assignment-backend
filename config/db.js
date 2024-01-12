const mongoose = require("mongoose");

const URL = "mongodb+srv://ashraf_assignment:Khan1234@cluster0.vckulg5.mongodb.net/assignment?retryWrites=true&w=majority";

const MongoServer = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = MongoServer;
