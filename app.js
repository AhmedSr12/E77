const Joi = require('joi');//return class
const express = require('express');     // return a function
const bodyParser = require('body-parser');
const app = express();  // return an object of type express
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/');

//enable parsing of JSON objects 
app.use(express.json()); //express.json() returns a piece of middleware to be used

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/'/* path or url '/' represrnts root of the website*/, (req, res) => { /* callback function (route handler) will be called when we have get http request */
    // This req object has a bunch of useful propereties gives us info about incoming request u can refrence documentation for more info
    res.send('Hello E7');
});


app.get('/web/courses/create', (req, res) => {
    res.render("courses_form.html");
});
app.get('/web/students/create', (req, res) => {
    res.render("students_form.html");
});
app.post('/web/students/create', (req, res) => {
    // validate request

    const { error } = validateStudent(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    /*
     //Manual validation 
     if (!req.body.name || req.body.name.length < 3)   //if name does not exist
     {
        // 400 bad request
        res.status(400).send('Name is required and should be minimum 3 characters.');
        return;
     }*/


    // create a new student object
    const student = {
        id: students.length + 1, // in future id is assigned by data base
        //before enable parsing json object
        name: req.body.name, // assuming that request body there's a name property
        code: req.body.code,
    };
    students.push(student);
    res.send(student);// return this object in the body of the response so the client can know the id 

    //console.log("Trying to create a new user...")
    //console.log("how to get data from form?")
    //console.log(req.body)

    //res.end()
});

app.post('/web/courses/create', (req, res) => {
    // validate request
    if (req.body.description === '') {
        delete req.body.description
        console.log(req.body)
    }
    //console.log(req.body)
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }



    /*
     //Manual validation 
     if (!req.body.name || req.body.name.length < 3)   //if name does not exist
     {
        // 400 bad request
        res.status(400).send('Name is required and should be minimum 3 characters.');
        return;
     }*/


    // create a new course object
    const course = {
        id: courses.length + 1, // in future id is assigned by data base
        //before enable parsing json object
        name: req.body.name, // assuming that request body there's a name property
        code: req.body.code,
        description: req.body.description
    };
    courses.push(course);
    res.send(course);// return this object in the body of the response so the client can know the id 

    //console.log("Trying to create a new user...")
    //console.log("how to get data from form?")
    //console.log(req.body)

    //res.end()

    //console.log("Trying to create a new user...")
    //console.log("how to get data from form?")
    //console.log(req.body)

    //res.end()
});
const courses = [
    { name: 'course1', code: 'ccc111', id: 1, description: 'has 100 students' },
    { name: 'course2', code: 'ccc222', id: 2 },
    { name: 'course3', code: 'ccc333', id: 3, description: 'has 150 students' }

];
const students = [
    { name: 'Ahmed', code: 'aaaa111', id: 1 },
    { name: 'Ali\'s', code: 'aaaa222', id: 2 },
    { name: 'Abdel-Rahim', code: 'aaaaaab', id: 3 }

];

app.get('/api/courses'/* path or url '/' represrnts root of the website*/, (req, res) => { /* callback function (route handler) will be called when we have get http request */
    // This req object has a bunch of useful propereties gives us info about incoming request u can refrence documentation for more info
    res.send(courses); //send array course objects 
});
app.get('/api/students'/* path or url '/' represrnts root of the website*/, (req, res) => { /* callback function (route handler) will be called when we have get http request */
    // This req object has a bunch of useful propereties gives us info about incoming request u can refrence documentation for more info
    res.send(students); //send array student objects 
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)); //get course object
    if (!course) res.status(404).send('course with given id not found')
    //if we don't find a course for the given ID by convention we should return a response with the HTTP status code of 404
    res.send(course);
    //goto: http://localhost:3000/api/courses/1
    //o/p:{"id":1,"name":"course1"} json object
    //goto: http://localhost:3000/api/courses/10
    //o/p:coursr with given id not found
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id)); //get course object
    if (!student) res.status(404).send('student with given id not found')
    //if we don't find a course for the given ID by convention we should return a response with the HTTP status code of 404
    res.send(student);
    //goto: http://localhost:3000/api/courses/1
    //o/p:{"id":1,"name":"course1"} json object
    //goto: http://localhost:3000/api/courses/10
    //o/p:coursr with given id not found
});

// Add course
app.post('/api/courses', (req, res) => {
    // validate request
    console.log(req.body)
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    

    /*
     //Manual validation 
     if (!req.body.name || req.body.name.length < 3)   //if name does not exist
     {
        // 400 bad request
        res.status(400).send('Name is required and should be minimum 3 characters.');
        return;
     }*/


    // create a new course object
    const course = {
        id: courses.length + 1, // in future id is assigned by data base
        //before enable parsing json object
        name: req.body.name, // assuming that request body there's a name property
        code: req.body.code,
        description: req.body.description
    };
    courses.push(course);
    res.send(course);// return this object in the body of the response so the client can know the id 
});

// Add student
app.post('/api/students', (req, res) => {
    // validate request

    const { error } = validateStudent(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    /*
     //Manual validation 
     if (!req.body.name || req.body.name.length < 3)   //if name does not exist
     {
        // 400 bad request
        res.status(400).send('Name is required and should be minimum 3 characters.');
        return;
     }*/


    // create a new student object
    const student = {
        id: students.length + 1, // in future id is assigned by data base
        //before enable parsing json object
        name: req.body.name, // assuming that request body there's a name property
        code: req.body.code,
    };
    students.push(student);
    res.send(student);// return this object in the body of the response so the client can know the id 
});

// Updating resources
app.put('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return; // to stop executing the rest code
    }

    // validate 
    // If not valid, return 400 bad request
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the course 
    // Return the updated course TO THE CLIENT
    course.name = req.body.name;
    course.code = req.body.code;
    course.description = req.body.description;
    res.send(course);
});

// Updating resources
app.put('/api/students/:id', (req, res) => {
    // Look up the student 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return; // to stop executing the rest code
    }

    // validate 
    // If not valid, return 400 bad request
    const { error } = validateStudent(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the course 
    // Return the updated course TO THE CLIENT
    student.name = req.body.name;
    student.code = req.body.code;
    res.send(student);
});

// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

// Deleting a student
app.delete('/api/students/:id', (req, res) => {
    // Look up the student 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // Delete
    const index = students.indexOf(student);
    students.splice(index, 1);

    // Return the same course
    res.send(student);
});


//INSTEAD OF COPY 

function validateCourse(course) {
    const schema = Joi.object({
        //name: string, required, min length of 5 characters
        name: Joi.string().min(5).required(),
        //code: string, required, must match 3 letters followed by 3 numbers         
        code: Joi.string().pattern(new RegExp('^[a-zA-Z][a-zA-Z][a-zA-Z][0-9][0-9][0-9]$')).required(),
        //description: string, optional, max length of 200 characters
        description: Joi.string().max(200).optional()


    });


    return schema.validate(course);
}
//INSTEAD OF COPY 

function validateStudent(student) {
    const schema = Joi.object({
        //name: string, required, only letters in both cases, apostrophe and dashes are allowed.
        name: Joi.string().pattern(new RegExp('^([a-zA-Z]|\'|-)+$')).required(),
        //code: string, required, must match 7 characters         
        code: Joi.string().max(7).min(7).required(),


    });


    return schema.validate(student);
}


const host = '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, function () {
    console.log("Server started.......");
});
//const port = process.env.PORT || 3000 //if env var is set we will use process.env.PORT otherwise 3000
//app.listen(port /*PortNumber*/, () => console.log(`Listeneing on port ${port}......`) /* optionally a function that called when the app starts listening to the given port */);

