
require('dotenv').load();

const express = require('express'),
  { google } = require('googleapis'),
  port = process.env.PORT || 3000,
  apikey = process.env.APIKEY,
  app = express(),
  customsearch = google.customsearch('v1');

// const { google } = require('googleapis');
// const customsearch = google.customsearch('v1');
// const options = { cx: '008245539995824095644:3f27vg6irlc', q: 'lolcats funny', apiKey: apikey };
// console.log(options.cx);
// Ex: node customsearch.js
//      "Google Node.js"
//      "API KEY"
//      "CUSTOM ENGINE ID"

async function runSample(options) {
  // console.log(options);
  const res = await customsearch.cse.list({
    cx: options.cx,
    q: options.q,
    auth: options.apiKey
  });
  // console.log(res.data);
  return res.data;
}

async function searchResults(req, res) {
  // if (module === require.main) {
    // const options = {
    //   q: req.params.search,
    //   apiKey: apikey,
    //   cx: '008245539995824095644:3f27vg6irlc'
    // };
    // let results = await runSample(options)
    const results = await customsearch.cse.list({
      cx: '008245539995824095644:3f27vg6irlc',
      q: req.params.search,
      auth: apikey,
      searchType: 'image',
    });
    let items = results.data.items,
    itemList = [];

    for (let i = 0; i < items.length; i++) {
      itemList.push(items[i]);
    }
  let image = itemList[0].image
    let displayResults = {
      url: itemList[0].link,
      snippet: itemList[0].snippet,
      thumbnail: image.thumbnailLink,
      context: image.contextLink,
    }
    console.log(displayResults);

    res.send(displayResults);

    // .catch(console.error);
  // }
}

app.get('/imagesearch/:search', (req, res) => {
searchResults(req, res)

});



// module.exports = {
//   runSample
// };

app.listen(port, () => {
  console.log("Server is listening on port:", port);
})