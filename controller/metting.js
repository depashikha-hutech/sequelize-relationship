const express = require('express');
const { crtmeet} = require('../utility/metting');
const route = express.Router();

const { authorizeUser } = require("../utility/auth");

route.post("/", authorizeUser, async(req, res) => {
    try {
        const createmeet = await crtmeet({...req?.body, orgId:req?.user?.orgId});
        console.log(createmeet);
        res.status(createmeet?.statusCode).json(createmeet);
    } catch (error) {
    console.log(error);
    res.status(500).json({sucess: false, message:"internal server error", error: error.message});
}
});
module.exports = route;
