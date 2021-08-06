//how to render data to the frontend
const axios = require('axios')

exports.homeRoutes = (req, res) =>{
    //Make a GET request to the api/users
    axios.get('https://my-user-management.herokuapp.com/api/users')
    .then(function(response){
        res.render('index', {users: response.data}) //data is a key in the response object
    })
    .catch(err =>{
        res.send(err)
    })
    
}

exports.add_user = (req, res) =>{
    res.render('add-user')
}

exports.update_user = (req, res) =>{
    axios.get('https://my-user-management.herokuapp.com/api/users',{params:{id: req.query.id}})
    .then(function(userdata){
        res.render('update-user', {user: userdata.data})
    })
    .catch(err =>{
        res.send(err)
    })
   
}