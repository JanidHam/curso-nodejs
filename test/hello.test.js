const Server = require('../src/server')
const { httpInstace } = require('./config')

const server = new Server()

beforeAll(() => server.initServer())

afterAll(() => server.stopServer())

test('Hello world', async () => {
  const { data } = await httpInstace.get('/api/hello')
  expect(data).toMatchObject({ message: 'Hello world!' })
})
