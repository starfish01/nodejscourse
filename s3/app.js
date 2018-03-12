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

        //inserting data
    // db.collection('mammals').insertOne({
    //     name: 'horse' 

    // }, (err, result)=>{
    //     if(err){ return console.log(err)};
    //     console.log('INSERTED');
    // });


    // reading data
//   db.collection('mammals').find().toArray(function (err, result) {
//     if (err) throw err

//     console.log(result)
//   })


    //updating

    // db.collection('mammals').findOneAndUpdate({
    //     _id: new ObjectId('5aa4c75f9f30c4407e95f2c5')},{
    //         $set: {name: 'updated'}

    //     }).then(result =>{
    //         consol.log(result);
    //     }).catch(err => {
    //         consol.log(err)
    //     });

    // Deleting

    // db.collection('mammals').deleteMany( {name: 'Edwin'});

    // db.collection('mammals').findOneAndDelete({
    //     _id: new ObjectId('5aa4c75f9f30c4407e95f2c5')
    // }).then(result => {
    //     console.log(result)
    // });


})