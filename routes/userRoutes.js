const express = require('express');
const blogController = require('../controllers/userController');
const router = express.Router();

//Add a User
router.put('/', blogController.add_user_put);

//Edit a User's Attributes
router.patch('/:id', blogController.edit_user_patch);

//Delete a User With ID
router.delete('/:id', blogController.delete_user);

//Find a User With ID
router.get('/:id', blogController.find_user_get);

//Get All Users
router.get('/', blogController.all_user_get);

//exporting router
module.exports = router;