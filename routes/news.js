const router=require('express').Router();
const News= require('../model/news');
const { route } = require('./auth');

router.post('/post-news', async(req,res)=>{
    const news=new News({
    title: req.body.title,
    newsDescription:req.body.newsdescription,
    });
    try{
        const savedNews= await news.save();
        res.send(savedNews);
    }
    catch(err){
        res.statusCode('400').send(err);
    }
});
router.get('/get-news', (req,res) =>{
    News.find({},function(err,allNews){
        if(err){
            console.log(err);
        }else{
            res.send({news: allNews});
        }
    });

});
router.delete('/delete-news/:id',function(req,res){
    
    News.findByIdAndDelete(req.params.id,function(err){
        console.log(req.params.id)
        if(err){
            console.log(err)
        }else{
            res.json('updated');
        }
    });
});

router.put('/update-news/:id', function(req, res){
    News.update({_id: req.params.id},
        {
         title: req.body.title,
         newsDescription: req.body.newsdescription
       }, function(err, docs){
     if(err){ 
         res.json(err);
     }
    else {
        res.json('updated');
        }
     });
    });
    //update
module.exports= router;