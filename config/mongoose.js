const mongoose = require('mongoose');


// mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_database');

// const db = mongoose.connection;

// db.on('error', console.error.bind(console,'error connecting to db'));

// db.once('open',()=>{
//   console.log('succefully connected');
// })

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_database');
}