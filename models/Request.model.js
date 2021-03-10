const { Schema, model } = require("mongoose");

// 1. Define your schema
let RequestSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId, ref: "User"
    },
    seller: {
      type: Schema.Types.ObjectId, ref: "User"
    },
    plant: Object,
      //{type: Schema.Types.ObjectId, ref: "plant},"
    message: String
  }
);

//define model
let RequestModel = model("request", RequestSchema);

//export model
module.exports = RequestModel;