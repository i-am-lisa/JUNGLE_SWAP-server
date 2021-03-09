const express = require("express");
const router = express.Router();
const uploader = require("../config/cloudinary.config.js");
const PlantModel = require("../models/Plant.model");

// NOTE: All your API routes will start from /api 

// will handle all GET requests to http:localhost:5005/api/plants
router.get(
  "/plants",
  (req, res) => {
    PlantModel.find()
      .then(
        (plants) => {
          res.status(200).json(plants);
        }
      )
      .catch(
        (err) => {
          res.status(500).json(
            {
              error: "Find plant failed",
              message: err
            }
          );
        }
      );
  }
);

router.get(
  "/plants/search",
  (req, res) => {
    let name = req.query.q
    PlantModel.find(
      {
        name: {
          $regex: `^${name}`, $options: "i"
        }
      }
    )
      .then(
        (plants) => {
          res.status(200).json(plants);
        }
      )
      .catch(
        (err) => {
          res.status(500).json(
            {
              error: "Search plant failed",
              message: err
            }
          );
        }
      );
  }
);

// will handle all POST requests to http:localhost:5005/api/create
router.post(
  "/plants/create",
  (req, res) => {
    const { name, description, location, image, size, price } = req.body;
    const newPlant = {
      name: name,
      description: description,
      size: size,
      image: image,
      location: location,
      price: price,
      creator: req.session.loggedInUser._id
    };
    PlantModel.create(newPlant)
      .then(
        (response) => {
          res.status(200).json(response);
        }
      )
      .catch(
        (err) => {
          res.status(500).json(
            {
              error: "Create plant failed",
              message: err
            }
          );
        }
      );
  }
);

// will handle all GET requests to http:localhost:5005/api/plants/:plantId
//PS: Don"t type :plantId , it"s something dynamic, 
router.get(
  "/plants/:plantId",
  (req, res) => {
    PlantModel.findById(req.params.plantId)
      .then(
        (response) => {
          res.status(200).json(response);
        }
      )
      .catch(
        (err) => {
          res.status(500).json(
            {
              error: "Edit plant failed",
              message: err
            }
          );
        }
      );
  }
);

// will handle all DELETE requests to http:localhost:5005/api/plants/:id
router.delete(
  "/plants/:id",
  (req, res) => {
    PlantModel.findByIdAndDelete(req.params.id)
      .then(
        (response) => {
          res.status(200).json(response);
        }
      )
      .catch(
        (err) => {
          res.status(500).json(
            {
              error: "Delete plant failed",
              message: err
            }
          );
        }
      );
  }
);

// will handle all PATCH requests to http:localhost:5005/api/plants/:id
router.patch(
  "/plants/:id",
  (req, res) => {
    let id = req.params.id;
    const { name, description, size, location, image, price } = req.body;
    const updatedPlant = {
      name: name,
      description: description,
      size: size,
      image: image,
      location: location,
      price: price
    };
    PlantModel.findByIdAndUpdate(id, { $set: updatedPlant }, { new: true })
      .then(
        (response) => {
          res.status(200).json(response);
        }
      )
      .catch(
        (err) => {
          res.status(500).json(
            {
              error: "Update plant failed",
              message: err
            }
          );
        }
      );
  }
);

module.exports = router;