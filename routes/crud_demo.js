const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
mongoose.connect('mongodb://localhost:27017/mongo-exercises')
.then(()=> console.log('connected to mongoDB ... '))
.catch(err => {console.log('couldnt connect omongodb', err)});

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

async function createCourse(){//create

    const course = new Course({
        name: 'IBM data science',
        tags: ['developer','frontend'],
        author :'ahmet bale',
        isPublished: true,
        price: 20,
        _id: new mongoose.Types.ObjectId()
    });

    const result = await course.save(); 
    console.log(result);
}
// createCourse();
 function getprice(){
 price = 20;
return price;
}

async function getCourses(price){//read

const courses = await Course
    .find({isPublished: true, price: getprice()})
    // .and([
    //     {price : { $lte :10} },
    //      {name : /.*by*./i}
    // ])
    .select({name : 1, author : 1, price : 1});
    return courses;
}

async function run(){
    const courses = await getCourses();
    if(!courses.length){ console.log("no course was found as specified");return;}
    else {console.log(courses);}
}
run();
async function updateCourse(id){//update

    const course = await Course
    .findById(id, function (err, course) {
     if (err){
         console.log(err);
     }
     else{
         console.log("Result : ", course);
     }
 }).clone().catch(function(err){ console.log(err)})
 //    await course.clone(); // Can `clone()` the query to allow executing the query again
     if( !course ) {console.log('course was not found'); return;}
    course.set({
        isPublished: true,
        author : 'another name',
    });
const result = await course.save();
console.log(result);
}
// updateCourse('1');

async function removeCourse(id){    //delete
    const course = await Course
    .findById(id, function (course) {
    }).clone().catch(function(err){ console.log(err)});

    if(!course) {console.log('course was not found'); return;}
    else{
        const result = await Course.deleteOne({_id:id}); 

        console.log("succesfully Deleted : ", result);
    }
}
//    removeCourse('5a68fdf95db93f6477053ddd');
   module.exports = router;