const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const MongoClient = require('mongodb').MongoClient;

// Initialize express server
const app = express();
const port = process.env.PORT || 5000;
// Mongodb connection uri
const uri = "mongodb+srv://botol:eliftechtask@eliftask-0wpdd.mongodb.net/test?retryWrites=true";
// Set up multer storage configuration
const storage = multer.diskStorage({
  dest: 'files/', // Save file to 'files' directory
  filename(req, file, cb) {
    cb(null, `${file.originalname}`) // Ex: 'file.csv'
  }
});
const upload = multer({
  storage
});

// Listen to root path
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Listen for orders query
app.get('/api/purchases', async (req, res) => {
  // Connect to database
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true
  });
  // Select the collection from database
  const collection = client.db('task_db').collection('records');

  // Query for all documents in collection
  collection.find({}).toArray((err, result) => {
    if (err) {
      res.status(400).send('Something wrong happened, try again later.');
    }
    else {
      // Send documents to the client
      res.status(200).json(result);
    }
  })
  // Documents were sent successfully, disconnect from database
  client.close();
});

app.post('/file', upload.single('file'), async (req, res) => {
  if (req.file.filename.substr(-3) !== 'csv') {
    return res.status(400).send({error: 'Incorrect file type. Please, provide us with a csv file.'});
  }
  // Connect to database
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true
  });
  // Select the collection from database
  const collection = client.db('task_db').collection('records');
  // Clean the collection out before uploading new documents
  collection.deleteMany({});
  // Initialize stream with uploaded csv file
  fs.createReadStream(req.file.path)
    .pipe(csv({ignoreEmpty: true})) 
    .validate(data => data.every(item => item.trim())) // Check if any item is empty in the document 
    .on("data", data => {
      // insert purchase to the collection
      collection.insertOne({
        "user_name": data[0],
        "order_name": data[1],
        "date": data[2]
      }, err => {
        if(err) res.status(500).send(err)
      })
    })
    .on("end", () => {
      // send all documents from collection to the client
      collection.find({}).toArray((err, result) => {
        if (err) {
          res.status(400).send('Something wrong happened, try again later.');
        } else {
          // Send documents to the client
          res.status(200).json(result);
        }
      });
      // Documents were sent successfully, disconnect from database
      client.close();
      // Delete local csv file
      fs.unlink(req.file.path, () => console.log('File was successfully deleted.'));
    })
});

app.listen(port, () => `Server running on port ${port}`);