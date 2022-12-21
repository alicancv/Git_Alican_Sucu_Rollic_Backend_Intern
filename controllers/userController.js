const User = require('../models/user');

//add user controller
const add_user_put = async (req, res) => {
    const users = await User.find();
    var canSave = true;
    
    for (let i = 0; i < users.length; i++) {
        if(users[i].email === req.body.email){
            res.status(403).json({error: 'User with that email already exists'});
            canSave = false;
            break;
        }
    }
    
    if(!canSave)
        return;
    
    const userdIDs = [];
    users.forEach(user => userdIDs.push(user._id) );
    
    var id = 0;
    
    while(userdIDs.find(x => x == id))
    {
        id++;
    }
    
    const user = new User({
        _id: id.toString(), 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    user.save()
        .then((result)=>{
            res.json({id: parseInt(result._id), name: result.name, email: result.email});
        })
        .catch((err)=>{
            res.send(err);
        });
}

//edit user controller
const edit_user_patch = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            if(result === null){
                res.status(404).json({error: 'User with that id does not exist'});
            }
            else{
                res.json({id: parseInt(result._id), name: result.name, email: result.email});
            }
        })
        .catch((err) => {
            res.send(err);
        });
}

//delete user controller
const delete_user = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((result) => {
            if(result === null){
                res.status(404).json({error: 'User with that id does not exist'});
            }
            else{
                res.json({});
            }
        })
        .catch((err) => {
            res.send(err);
        });
}

//find user controller
const find_user_get = (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            if(result === null){
                res.status(404).json({error: 'User with that id does not exist'});
            }
            else{
                res.json({id: parseInt(result._id), name: result.name, email: result.email});
            }
        })
        .catch((err) => {
            res.send(err);
        });
}

//get all user controller
const all_user_get = (req, res) => {
    User.find().sort({_id : 1})
        .then((result) => {
            if(result.length > 0){
                const users = [];
                for (let i = 0; i < result.length; i++) {
                    users[i] = {id: parseInt(result[i]._id), name: result[i].name, email: result[i].email};
                }
                res.json(users);
            }
            else
            {
                res.status(404).json({error: 'User with that id does not exist'});
            }
        })
        .catch((err) => {
            res.send(err);
        });
}

module.exports = {
    add_user_put,
    edit_user_patch,
    delete_user,
    find_user_get,
    all_user_get
};