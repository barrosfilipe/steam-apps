/* Express Framework */
const express = require('express'),
createError = require('http-errors'),
app = express()

/* MongoDB Atlas Read Only */
const MongoClient = require('mongodb')
const url = 'mongodb+srv://public:steam@cluster0-oaw75.mongodb.net/steamapps'

/* App Files Location */
app.use('/', express.static(__dirname + '/public'))

/* API GET Route to Games JSON */
app.get('/api/apps', async (req, res) => {
  const data = await global.db.collection('games')
  .find().toArray()
  res.json({games: data})
})

/* API GET Route to Games JSON by Id */
app.get('/api/apps/:id', async (req, res) => {
  const data = await global.db.collection('games')
  .find({steam_appid: parseInt(req.params.id)}).toArray()
  res.json({game: data})
})

/* Catch 404 and forward to error handler */
app.use((req, res, next) => {
  next(createError(404))
})

/* Error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({error: 'No results found'})
})

/* Start Server on port 3000 if MongoClient is connected */
MongoClient.connect(url, (err, client) => {
  if (err)
    throw err
  global.db = client.db('steamapps')

  const port = process.env.PORT || 3000
  app.listen(port, '0.0.0.0', () => {
    console.log(`localhost:${port}`)
    app.emit('ready')
  })
})

module.exports = app