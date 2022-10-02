import { Env } from '../env'
import { createUser } from './createUser'
import { deleteUser } from './deleteUser'
import { updateUser } from './updateUser'

describe('User', () => {
  let userId = ''

  beforeAll(() => {
    Env.setup({
      apiKey: process.env.apiKey,
      secretKey: process.env.secretKey,
      signKey: process.env.signKey
    })
  })

  test('createUser', async () => {
    const response = await createUser({
      name: 'DuMu'
    })

    userId = response.result.id

    expect(response.result.id).not.toBe('')
  })

  test('updateUser', async () => {
    const response = await updateUser(userId, {
      name: 'DuMuDuMu'
    })

    expect(response.result.name).toEqual('DuMuDuMu')
  })

  test('deleteUser', async () => {
    const response = await deleteUser(userId)
    expect(response.result.successIdList.includes(userId)).toBeTruthy()
  })
})
