const router =  require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { response } = require("express");

router.post("/register", async(req, res, next)=>{
    try {
        const hashedPassword = await bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(req.body.password, salt)
        })
        .then(hash => {
            return hash
        })

        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }); 
        const user = await newUser.save();
        const {_id, username, profilePicture} = user
        res.status(200).json({_id, username, profilePicture});

    } catch (error) {
        next(error) 
    }
    
});

router.post("/login", async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json(`user with ${req.body.email} not found`);
    
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")
        const {_id, username, profilePicture} = user
        res.status(200).json({_id, username, profilePicture})
    } catch (error) {
        next(error)
    }
  });

module.exports = router;