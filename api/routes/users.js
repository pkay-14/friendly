const User = require("../models/User");
const router = require("express").Router();

router.get("/", async(req, res, next)=>{
    const users = await User.find()
    let userList = []
    users.map((user)=>{
        const { _id, username, profilePicture } = user;
        userList.push({ _id, username, profilePicture });
    })
    res.status(200).json(userList)
})

module.exports = router;