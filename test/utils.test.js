const { cryptoUtils } = require('../src/utils')

test('Crypt params not to be null', async () => {
  cryptoUtils.cryptText()
    .catch(err => expect(err).toEqual(new Error('Params not to be null')))
})

test('Crypt text', async () => {
  const crypted = await cryptoUtils.cryptText('test')

  expect(typeof crypted).toBe('string')
})

test('Compare crypted text', async () => {
  const pass = 'Test123'
  const crypted = await cryptoUtils.cryptText(pass)
  const match = await cryptoUtils.compareText(pass, crypted)

  expect(match).toEqual(true)
})
