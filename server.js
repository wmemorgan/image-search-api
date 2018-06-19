
require('dotenv').load();

const express = require('express'),
  { google } = require('googleapis'),
  mongodb = require('mongodb'),
  MongoClient = mongodb.MongoClient,
  dbURI = process.env.DBCONNECT,
  // dbURI = 'mongodb://localhost:27017/searchdb',
  port = process.env.PORT || 3000,
  apikey = process.env.APIKEY,
  app = express(),
  customsearch = google.customsearch('v1');

const insertSearchRecord = (doc) => {
  MongoClient.connect(dbURI, (err, conn) => {
    if (err) {
      console.log("Unable to connect to database server", dbURI, "Error", err);
    } else {
      console.log('Connection established to', dbURI);
      const data = conn.db("searchdb");
      data.collection("searches").insertOne(doc, (err, res) => {
        if (err) throw err;
        console.log("1 document inserted");
        conn.close();
      });
    }
  })
}

const getLatestSearch = (res) => {
  MongoClient.connect(dbURI, (err, conn) => {
    if (err) {
      console.log("Unable to connect to database server", dbURI, "Error", err);
    } else {
      console.log('Connection established to', dbURI);
      const data = conn.db("searchdb");

      data.collection("searches").find().sort({ timestamp: -1 })
      .toArray( (err, results) => {
      var displayList = [];
        for (let i = 0; i < results.length; i++) {
          let itemDict = {
            term: results[i].search,
            when: results[i].timestamp,
          }
          displayList.push(itemDict);
        }
        
        console.log(displayList);
        res.send(displayList);
      })
      
      conn.close();
    }
  })
}

const displayResults = (data) => {
  const list = [],
    displayList = [];

  for (let i = 0; i < data.length; i++) {
    list.push(data[i]);
  }

  for (let i = 0; i < list.length; i++) {
    let itemDict = {
      url: list[i].link,
      snippet: list[i].snippet,
      thumbnail: list[i].image.thumbnailLink,
      context: list[i].image.contextLink,
    }
    displayList.push(itemDict);
  }
  
  return displayList;
}

const runSearch = async (search, offset, res) => {
  const results = await customsearch.cse.list({
    cx: '008245539995824095644:3f27vg6irlc',
    q: search,
    auth: apikey,
    searchType: 'image',
    start: offset,
  }),
    items = results.data.items;

  console.log(displayResults(items));
  res.send(displayResults(items));
}

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd()  + '/views/index.html');
})

app.get('/api/imagesearch/:search*', (req, res) => {
  var { search, offset } = req.query
  let record = {
    search: search,
    offset: offset,
    timestamp: new Date(),
  }
  insertSearchRecord(record);
  runSearch(search, offset, res).catch(console.error);
  console.log(search, offset)
});

app.get('/api/latest/imagesearch', (req, res) => {
  getLatestSearch(res);
})

app.listen(port, () => {
  console.log("Server is listening on port:", port);
})