const express = require('express');
const fs = require('fs');
const { execSync } = require('child_process');
const app = new express();
const PORT = 3000;

const fetchWebsite = (url) => {
  execSync(`wget -q -O - ${url} > site.html`,
    (error, stdout, stderr) => {
      if (error !== null) {
        return false;
      }
  });
}


app.get('/api/viewer', async (req, res, next) => {
  try {
      const { url } = req.query
      fs.writeFileSync('site.html', '', () => console.log('Created site.html'));
      fs.createReadStream('site.html').pipe(res);
      fetchWebsite(url);
  } catch (err) {
      next(err);
  }
});

app.use((err, req, res, next) => {
  // Handle the error and send a response to the client
  res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(PORT, () => {console.log("Listening at port: ", PORT)} )