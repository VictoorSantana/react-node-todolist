

var express = require('express');
var router = express.Router();

const { SECRET_KEY, SECRET_KEY_EXPIRES, INITIAL_ID } = require('../properties/setup');
const { WRONG_PASS, SUCCESSFUL_REQ, BAD_REQUEST } = require('../properties/messages');

const { validateBody } = require('../filters/validation');
const { loginSchema } = require('../validation_schemas/schema');

const jwt = require('jsonwebtoken');

const { Credential } = require('../services/services');

router.post('/', validateBody(loginSchema), async function(req, res) {

    const result = await Credential.check(req.body.username, req.body.password);

    if(result.valid) {
        jwt.sign({ _id: INITIAL_ID + result.id }, SECRET_KEY, {expiresIn: SECRET_KEY_EXPIRES}, (err, token) => {                                
            res.json({fail: false, message: SUCCESSFUL_REQ, data: token});
        });  
    } else {
        res.json({fail: true, message: WRONG_PASS, data: {}});
    }        

});


module.exports = router;