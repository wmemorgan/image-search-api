
require('dotenv').load();

const express = require('express'),
  { google } = require('googleapis'),
  mongodb = require('mongodb'),
  MongoClient = mongodb.MongoClient,
  dbURL = 'mongodb://localhost:27017/searchdb',
  port = process.env.PORT || 3000,
  apikey = process.env.APIKEY,
  app = express(),
  customsearch = google.customsearch('v1');

const insertSearchRecord = (doc) => {
  MongoClient.connect(dbURL, (err, conn) => {
    if (err) {
      console.log("Unable to connect to database server", dbURL, "Error", err);
    } else {
      console.log('Connection established to', dbURL);
      const data = conn.db("searchdb");
      data.collection("searches").insertOne(doc, (err, res) => {
        if (err) throw err;
        console.log("1 document inserted");
        conn.close();
      });
    }
  })
}

const displayResults = (data, count) => {
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

const runSearch = async (req, res) => {
  const results = await customsearch.cse.list({
    cx: '008245539995824095644:3f27vg6irlc',
    q: req.params.search,
    auth: apikey,
    searchType: 'image',
    start: req.query.offset,
  }),
    items = results.data.items;

  console.log(displayResults(items));
  res.send(displayResults(items));
}

app.get('/api/imagesearch/:search*', (req, res) => {
  let record = {
    search: req.params.search,
    offset: req.query.offset
  }
  insertSearchRecord(record);
  // runSearch(req, res).catch(console.error);
});

app.listen(port, () => {
  console.log("Server is listening on port:", port);
})