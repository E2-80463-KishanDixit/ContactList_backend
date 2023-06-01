const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT||7000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.urlencoded({extended:false})); // Middleware to read encoded form data
app.use(express.static('./assets'));

// //Middleware 1 
// app.use((req,res,next)=>{
//     req.body.name= 'hari';
//     console.log('middleware 2 called');
//     next();
// })

// //Middleware 2
// app.use((req,res,next)=>{
//     console.log(req.myname);
//     next();
// })

var contactList = [
    {
        name:'Kishan',
        phone:'3456789876'
    },
    {
        name:'Raghav',
        phone:'3459758397'
    },
    {
        name:'Raju',
        phone:'2339375839'
    }
]

// find contact form DB

app.get('/',async (req,res)=>{

    try{
       var contactsData = await Contact.find({});
    }catch(err){ 
        console.log("Error in finging  the contact");
    }

   return res.render('home',
   {
    title:"Contact List",
    contact_list:contactsData
   }
);
});

app.get('/practice',function(req,res){
    return res.render('practice',{title:"Its for practice"});
 });

 // route and  handler
 app.post('/create-contact',async (req,res)=>{
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // contactList.push(req.body);
    // console.log(req.body);

    try{
        await Contact.create({
            name:req.body.name,
            phone:req.body.phone
        });
    }catch(err){
        console.log("Contact not created")
    }
    return res.redirect('back');    // Sortcut TO comeback to the same page
});

 // TO DELETE CONTACT 
 app.get('/delete-contact',async (req,res)=>{

    let id = req.query.id;

    //  find the data in the database and delete it 
    try{
        await Contact.findByIdAndDelete(id);
    }catch(err){
        console.log('Error in deleting the contact');
    }
    


    // find the phone using query params

    // let phone = req.query.phone;
    // // Detect the index of the array 
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // // Remove the object of the array
    // if(contactIndex != -1 ){
    //     contactList.splice(contactIndex,1);
    // }

    //retur back to the same page
    return res.redirect('back');
 });

app.listen(port,(err)=>{
    if(err){
        console.log("There is an Error: ",err);
        return;
    }
    console.log("Express is listening our server at port: ",port);
});