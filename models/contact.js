const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{                        //   WE CAN VALIDATE THE DATA HERE USIG OTHERS CHECKS ALSO
        type:String,  
        required:true
    },
    phone:{
        type:String,
        required:true
    }
})

const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;