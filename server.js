/* Express Framework */
const express = require('express'), app = express()

/* MongoDB Atlas Read Only */
const MongoClient = require('mongodb')
const url = 'mongodb+srv://public:steam@cluster0-oaw75.mongodb.net/steamapps'

/* App Files Location */
app.use('/', express.static(__dirname + '/app'))

/* API GET Route to Games JSON */
app.get('/api/apps', async (req, res) => {
  const data = await global.db.collection('games').find().toArray()
  res.json({games: data})
})

/* API GET Route to Games JSON */
app.get('/api/apps/:id', async (req, res) => {
  const data = await global.db.collection('games').find({steam_appid: parseInt(req.params.id)}).toArray()
  res.json({game: data})
})

/* Start Server on port 3000 if MongoClient is connected */
MongoClient.connect(url, (err, client) => {
  if (err)
    throw err
  global.db = client.db('steamapps')

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log('ready on port', port)
  })
})

module.exports = app