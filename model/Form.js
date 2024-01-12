const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  fields: [
    {
      type: {
        type: String,
        enum: ["email", "text", "password", "number", "date"],
      },
      title: {
        type: String,
      },
      placeholder: {
        type: String,
      },
    },
  ],
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
