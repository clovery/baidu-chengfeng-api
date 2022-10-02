import { Env } from '../env'
import { createUser } from './createUser'

describe('createUser', () => {
  test('createUser', async () => {
    Env.setup({
      apiKey: process.env.apiKey,
      secretKey: process.env.secretKey,
      signKey: process.env.signKey
    })

    const response = await createUser({
      name: 'DuMu'
    })

    expect(response.result.id).not.toBe('')
  })
})
