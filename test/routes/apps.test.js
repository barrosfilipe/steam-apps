const request = require('supertest'),
app = require('../../src/app')

beforeAll((done) => {
  app.on('ready', () => {
    done()
  })
})

test('It should return all games', async () => {
  const response = await request(app).get('/api/apps')
  expect(response.statusCode).toBe(200)
  response.body.games.forEach((game) => {
    expect(game).toHaveProperty('steam_appid', expect.any(Number))
  })
})

test('It should return a game', async () => {
  const response = await request(app)
  .get(`/api/apps/${Math.floor(Math.random() * 3) + 1}`)
  expect(response.statusCode).toBe(200)
  expect(response.body.game.length).toBe(1)
})

test('It should return status 404', async () => {
  const response = await request(app).get(`/api/404`)
  expect(response.statusCode).toBe(404)
})