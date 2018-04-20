
require('dotenv').load();

const express = require('express'),
  { google } = require('googleapis'),
  port = process.env.PORT || 3000,
  apikey = process.env.APIKEY,
  app = express(),
  customsearch = google.customsearch('v1');

const displayResults = (data, count) => {
  const list = [],
    displayList = [];

  for (let i = 0; i < data.length; i++) {
    list.push(data[i]);
  }

  for (let i = 0; i < count; i++) {
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
  }),
    items = results.data.items,
    resultCount = 10;

  console.log(displayResults(items, resultCount));
  res.send(displayResults(items, resultCount)).catch(console.error);
}

app.get('/imagesearch/:search', (req, res) => {
  runSearch(req, res).catch(console.error);
});

app.listen(port, () => {
  console.log("Server is listening on port:", port);
})