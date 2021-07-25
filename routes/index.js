var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.render('index', { title: 'Express' });
});
router.post('/first',(req,res,next)=>{
    res.json({name:'aaa',pwd:'123'});
})
module.exports = router;
