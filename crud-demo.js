const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises');


const courseSchema = new mongoose.Schema({
    _id: String,
    name : String,
    author : String,
    tags : [String],
    date : Date,
    isPublished : Boolean,
    price : Number
},
{ typeKey: '$type' });


const Course = mongoose.model('Courses', courseSchema);


async function createCourse(){//create

    const course = new Course({
       
        name: 'IBM data science',
        tags: ['developer','frontend'],
        author :'gareth bale',
        isPublished: true,
        price: 20
    });
    
    const result = await course.save(); 
    console.log(result);

}
createCourse();



async function getCourses(){//read

// const courses = await Course
//     .find()
//     .and({isPublished : true}, {tags : 'backend'},{ tags:'frontend'})
//     .sort({price : -1})
//     .select({name : 1, author : 1, price : 1});
// return courses;
// }


const courses = await Course
    .find({isPublished: true})
    .or([
        {price : { $gte :15} },
         {name : /.*by*./i}
    ])
    .select({name : 1, author : 1, price : 1});
return courses;
}


async function run(){
    const courses = await getCourses();
    console.log(courses);
}
// run();



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
 console.log(id);
 console.log(course);
    console.log('connected');
     if( !course ) return;
    console.log('connected');
    course.isPublished = true;
    course.author = 'another AUTHOR';
    // course.set({
    //     isPublished: true,
    //     author : 'another name',
    // });
const result = await course.save();
console.log(result);
}
// updateCourse('5a68fdf95db93f6477053ddd');


async function removeCourse(id){    //delete
   const result = Course.deleteOne({_id:id}); 

            console.log("Deleted : ", result);
        
   
}
//    removeCourse('62ce7c19b0792c02ac7bd959');


 