let UserDb = require('../model/model')

//create and save user
exports.create = (req, res) =>{
  if(!req.body){
      res.status(400).send({message: "Content cannot be empty."});
      return;
  }

  //new user
  let user = new UserDb({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      status: req.body.status
  })

  user
  .save(user)
  .then(data =>{
      //res.send(data)
      res.redirect('/add-user') //redirect the user to the add user page i.e back to the form again.
  })
  .catch(err =>{
      res.status(500).send({
          message: err.message || "Some error occured while creating the user."
      })
  })

}

//retrieve and  return all users
exports.find = (req, res) =>{
    //get a single user if id is specified 
    if(req.query.id){
       const id = req.query.id;
       UserDb.findById(id)
       .then(data =>{
           if(!data){
               res.status(404).send({message:`User with id ${id} is not found.`})
           }else{
               res.send(data)
           }
       })
       .catch(err =>{
           res.status(500).send({massage: "Error reyrieving user with id" + id})
       })
    }else{ //find all users
        UserDb.find()
    .then(user =>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message: err.message || "An error occured."})
    })

    }
    
}
//to test the above query, use something like: http://localhost:3000/api/users?id=610bb2807f403b223c67a9bd

//update identified user by user id
exports.update = (req, res) =>{
  if(!req.body){
      return res.status(400)
      .send({message: "Data to update cannot be empty."})
  }
  const id = req.params.id;
  UserDb.findByIdAndUpdate(id, req.body, { useFindAndModify:false })
  .then(data =>{
      if(!data){
          res.status(400).send({message: `Cannot update user with ${id}. Maybe user not found.`})
      }else{
          res.send(data)
      }
  })
  .catch(err =>{
      res.status(500).send({message:err.message || "Error updating user information."})
  })
}

//delete a user with specified id
exports.delete = (req, res) =>{
    const id = req.params.id;
    UserDb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({message: `Cannot delete user with id: ${id}, maybe id is wrong.`})
        }else{
            res.send("User was deleted successfully.")
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || `Could not delete user with id ${id}.`
        })
    })
    
}