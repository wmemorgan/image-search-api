
require('dotenv').load();

const express = require('express'),
  port = process.env.PORT || 3000,
  apikey = process.env.APIKEY,
  app = express();

app.listen(port, () => {
  console.log("Server is listening on port:", port);
})