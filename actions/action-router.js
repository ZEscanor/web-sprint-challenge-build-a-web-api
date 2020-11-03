const express = require('express');
 const action = require("../data/helpers/actionModel")

 const router = express.Router();

 router.post("/actions",(req,res)=>{
     console.log(req.body)
   action.insert(req.body)
    .then(data=>{
        res.status(200).json({successmessage:`success you got ${data}`})
    })
    .catch(error=>{
        res.status(400).json({errormessage:"id not founrd"})
    })
    })
    //Our put function it will validate data and then change it based on what is given in the request
    router.put("/actions/:id",[validatePost],(req,res)=>{
        console.log(req.params,req.body)
        action.update(req.params.id,req.body)
       
        .then(
            res.status(200).json({message:"success"})
          )
          .catch(error=>{
            res.status(400).json({errorMessage:"not found"})
          })
    })
    //Our delete function it will delete a specific id that is specified
    router.delete("/actions/:id", (req,res)=>{
        action.remove(req.params.id)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(error=>{
         res.status(500).json({errormessage:"Id doesnt exist"})
        })
        
    })
    //get a specific index, currently it only implemented to get one at a time but would like to know how to return all
    router.get("/actions/:id",(req,res)=>{
        console.log(req.params)
        action.get(req.params.id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(error=>{
            res.status(400).json({errormessage:"id not found"})
        })
    })
    
    





    function validateProject(req, res, next) {
        if(!req.body){
          res.status(401).json({message:"You have no body"})
      }
      else if(!req.body.name){
        res.status(401).json({message:"Missing some key elements name"})
      }
      else if(!req.body.description){
        res.status(401).json({message:"Missing some key elements description"})
    
      }
      else{
        next();
      }
      }
    
    function validatePost(req, res, next) {
        // do your magic!
        if(!req.body){
          res.status(401).json({message:"Missing some key elements NAME"})
      }
      else if(!req.body.project_id){
        res.status(401).json({message:"Missing some key elements proj id"})
      }
      else if(!req.body.description || !req.body.notes){
        res.status(401).json({message:"Missing some key elements desc or notes"})
    
      }
      else{
        next();
      }
      }
module.exports = router;   