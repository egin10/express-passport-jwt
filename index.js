const express = require("express"),
  bodyParser = require("body-parser"),
  app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.json({ status: `It's Work!`});
});

const port = process.env || '8000';
app.listen(port, () => console.log(`It's running on port ${port}`));