const { Schema, model } = require("mongoose");

// 1. Define your schema
let PlantSchema = new Schema(
  {
    name: String,
    description: String,
    size: Number,
    image: {
      type: String,
      default: "https://i.pinimg.com/originals/b7/21/26/b721265eb826b20e6f91d6643b95c122.jpg"
    },
    location: {
      type: String,
      enum: ["Select location", "sun", "shade", "sun and shade"]
    },
    price: Number,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }
);

// 2. Define your model
let PlantModel = model("plant", PlantSchema);

// 3. Export your Model with "module.exports"
module.exports = PlantModel;