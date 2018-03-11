// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/animals');
// mongoose.connection
// .once('open', ()=>console.log('connected'))
// .on('error', (err)=> {
//     console.log(`Could not connect`, err)
// })





var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
  if (err) throw err

  console.log('CONNECTED');

  const db = client.db('animals');

    db.collection('mammals').insertOne({
        name: 'horse' 
        
        

    }, (err, result)=>{
        if(err){ return console.log(err)};
        console.log('INSERTED');
    });



  db.collection('mammals').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})