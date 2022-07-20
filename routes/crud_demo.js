const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const courseSchema = new mongoose.Schema({
    _id : String,
    name : String,
    author : String,
    tags : [String],
    date : Date,
    isPublished : Boolean,
    price : Number
});
const Course = mongoose.model('Courses', courseSchema);

    router.post('/create', async (req, res) =>{
        const { error } = validatecourse(req.body);// destructor
        if(error){
         res.status(400).send(error.details[0].message);
         return;
     }
        const course = new Course({
            name: req.body.name,
            tags: req.body.tags,
            author :req.body.author,
            isPublished: req.body.isPublished,
            price: req.body.price,
            _id: new mongoose.Types.ObjectId()
        });
        course.save();
        res.send("course created" );
        // res.send(course);
    });

 function getprice(){
 price = 20;
return price;
}
        router.get('/courses', async (req, res) => { 
            const courses = await Course
            .find({isPublished: true, price: getprice()})
            // .and([
            //     {price : { $lte :10} },
            //      {name : /.*by*./i}
            // ])
            .select({name : 1, author : 1, price : 1});
            
            if(!courses.length){ console.log("no course was found as specified");return;}
            else {console.log(courses);}
        });

    router.put('/courses/update/:id', async(req, res)=> {
        const course = await Course
        .findById(req.params.id, function (err, course) {
         if (err){
             console.log(err);
         }
         else{
             console.log("found course : ", course);
         }
     }).clone().catch(function(err){ console.log(err)})
     //    await course.clone(); // Can `clone()` the query to allow executing the query again
         if( !course ) res.status(404).send('course was not found');
         const { error } = validatecourse(req.body);// destructor
         if(error){
          res.status(400).send(error.details[0].message);
          return;
      }
        course.set({
            name:req.body.name,
            price: req.body.price,
            author : req.body.author,
        });
    const result = course.save();
    console.log("updated  course : ", result);
    });

router.delete('/courses/delete/:id', async (req, res) => {
  //delete
  const course = await Course
  .findById(req.params.id, function (course) {
  }).clone().catch(function(err){ console.log(err)});
  if(!course) {console.log('course was not found'); return;}
  else{
      const result = await Course.deleteOne({_id:req.params.id}); 
      console.log("succesfully Deleted : ", result);
  }
});  
   module.exports = router;
   function validatecourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        author: Joi.string().min(3).required(),
        price: Joi.number().min(3).required()
        });
return schema.validate(course);
}