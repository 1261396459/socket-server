var express = require('express');
var router = express.Router();
var users = require("../storage/users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res,next){
    console.log(req.body)
    let userName = req.body.name;
    let userId= req.body.id;
    
    if(users.isInclude(userName)){
        res.writeHead(401, 'This name is already used', {'content-type' : 'text/plain'});
    }
    else{
        users.insertUser(userId,userName);
        res.writeHead(200, 'Accept', {'content-type' : 'text/plain'});
    }
    res.end('Reply to login');
});

module.exports = router;