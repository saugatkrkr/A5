const express = require('express');
const path = require('path');
const Datastore = require('nedb-promises');

//initialize the Express app
const app = express();
const port = 3000;

const db = Datastore.create({ filename: 'hits.db', autoload: true }); //create the log click in hits.db(generated after the first click)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/hits/:pageID', async (req, res) => {
  const pageID = req.params.pageID;

  try {
    let page = await db.findOne({ pageID });

    if (!page) {
      page = { pageID, hits: 1 };
      await db.insert(page);
    } else {
      page.hits += 1;
      await db.update({ pageID }, { $set: { hits: page.hits } });
    }

    res.json({ pageID, hits: page.hits });
  } catch (error) {
    console.error('Error /hits/:pageID:', error);
    res.status(500).json({ error: 'Error 500' });
  }
});
app.listen(port, () => {
  console.log(`Local host link: http://localhost:${port}`);
});