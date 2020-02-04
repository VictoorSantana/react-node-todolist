
var express = require('express');
var router = express.Router();

const { SUCCESSFUL_REQ, BAD_REQUEST, SQL_ERROR, DATA_CREATED } = require('../properties/messages');

const { validateToken, validateTokenAlso, validateTokenGetUser, validateTokenAlsoGetUser } = require('../filters/validation');
const { todolistSchema } = require('../validation_schemas/schema');

const { IN_QUEUE } = require('../properties/status_todo');

const { ToDoList } = require('../services/services');

router.get('/all', validateTokenGetUser(), async (req, res) => {
    try {
        const decoded = req.decoded;
        console.log('decodeedd: -> ' + decoded);
        const data = await ToDoList.getAll(decoded);        
        res.json({fail: false, message: SUCCESSFUL_REQ, data: data});
    } catch(e) {
        res.json({fail: true, message: BAD_REQUEST, data: e});
    }    
});


router.get('/status/:status', validateTokenGetUser(), async(req,res) => {
    try {
        const decoded = req.decoded;
        const data = await ToDoList.get(decoded, req.params.status);
        res.json({fail: false, message: SUCCESSFUL_REQ, data: data});
    }catch(e) {
        res.json({fail: true, message: BAD_REQUEST, data: e});  
    }
}); 

router.post('/', validateTokenAlsoGetUser(todolistSchema), async (req, res) => {
    try {
        const request_data = {
            title: req.body.title,
            about: req.body.about,
            guest_user: req.decoded,
            status: IN_QUEUE
        };

        const data = await ToDoList.add(request_data);      

        res.json({fail: false, message: DATA_CREATED, data: data.toJSON()});        

    } catch(e) {
        res.json({fail: true, message: SQL_ERROR, data: e});
    }
});

router.put('/id/:id/status/:status', validateTokenGetUser(), async (req, res) => {

    await ToDoList.update(req.params.id, req.params.status, req.decoded);

    res.json({fail: false, message: SUCCESSFUL_REQ, data: {}});        
});

module.exports = router;
