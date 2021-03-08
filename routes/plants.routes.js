const express = require('express')
const router = express.Router()
const uploader = require('../config/cloudinary.config.js');



let PlantModel = require('../models/Plant.model')

// NOTE: All your API routes will start from /api 

// will handle all GET requests to http:localhost:5005/api/plants
router.get('/plants', (req, res) => {
     PlantModel.find()
          .then((plants) => {
               res.status(200).json(plants)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })         
})

router.get('/plants/search', (req, res) => {
     let name = req.query.q

     PlantModel.find({name: {$regex:`^${name}`,$options:"i"}})
          .then((plants) => {
               console.log(plants)
               res.status(200).json(plants)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })         
})

// will handle all POST requests to http:localhost:5005/api/create

router.post('/plants/create', (req, res) => {  
    const {name, description, location, image, size} = req.body;
    console.log(req.body)
    const newPlant = {
         name: name,
         description: description,
         size: size,
         location: location,
         image: image,
         creator:req.session.loggedInUser._id,
    }

    PlantModel.create(newPlant)
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})

// will handle all GET requests to http:localhost:5005/api/plants/:plantId
//PS: Don't type :plantId , it's something dynamic, 
router.get('/plants/:plantId', (req, res) => {
    PlantModel.findById(req.params.plantId)
     .then((response) => {
          res.status(200).json(response)
     })
     .catch((err) => {
          res.status(500).json({
               error: 'Something went wrong',
               message: err
          })
     }) 
})

// will handle all DELETE requests to http:localhost:5005/api/plants/:id
router.delete('/plants/:id', (req, res) => {
    PlantModel.findByIdAndDelete(req.params.id)
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})

// will handle all PATCH requests to http:localhost:5005/api/plants/:id
router.patch('/plants/:id', (req, res) => {
    let id = req.params.id
    const {name, description, size, location, image} = req.body;
    const updatedPlant = {
      name: name, 
      description: description, 
      size: size, 
      location: location, 
      image: image
    }
    PlantModel.findByIdAndUpdate(id, {$set: updatedPlant}, {new: true})
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               console.log(err)
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          }) 
})

module.exports = router;