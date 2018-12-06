const uuid = require('uuid')

const Server = require('../src/server')
const { httpInstace, DB } = require('./config')

const server = new Server()

beforeAll(() =>
  DB.initDB().then(dbConnected => {
    if (!dbConnected) return process.exit(1)

    return server.initServer()
  }).catch(err => process.exit(1))
)

afterAll(() =>
  DB.closeDB().then(dbClosed => {
  return server.stopServer()
  })
)

describe('Create, Update, Delete users', () => {
  let newUser = {}

  test('Create user', async () => {
    const email = `${uuid.v1()}@gmail`
    const body = { email, name: 'Test', lastname: '2', password: 'test' }
    const { status, data: { user } } = await httpInstace.post('/api/user', body)

    newUser = user

    expect(status).toBe(201)
  })

  test('Get user by id', async () => {
    const { status, data: { user } } = await httpInstace.get(`/api/user/${newUser._id}`)

    expect(status).toBe(200)
    expect(user._id).toBe(newUser._id)
  })

  test('Get users', async () => {
    const { status } = await httpInstace.get('/api/user')

    expect(status).toBe(200)
  })

  test('Update user', async () => {
    const body = { name: 'Test-Patch' }
    const { status, data: { user } } = await httpInstace.patch(`/api/user/${newUser._id}`, body)

    expect(status).toBe(200)
    expect(user.name).toBe('Test-Patch')
  })

  test('Server error to cast ObjectId', async () => {
    try {
      await httpInstace.get('/api/user/not-found123123')
    } catch (error) {
      const { response: { status } } = error
      expect(status).toBe(500)
    }
  })
})

