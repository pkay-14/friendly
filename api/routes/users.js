const User = require("../models/User");
const router = require("express").Router();

router.get("/", async(req, res, next)=>{
    try {
        const users = await User.find()
        let userList = []
        users.map((user)=>{
            const { _id, username, profilePicture } = user;
            userList.push({ _id, username, profilePicture });
        })
        res.status(200).json(userList)
    } catch (error) {
        next(error)
    }
    
})

router.delete("/", async(req, res, next)=>{
    try {
        if (process.env.NODE_ENV == 'test'){
            await User.deleteMany({}).then(()=>{
                res.status(200).send("Users cleared succesfully")
            })
        }else{
            res.status(403).send("Users can only be cleared in Test Instance")
        }
    } catch (error) {
        next(error)
    }

})

module.exports = router;