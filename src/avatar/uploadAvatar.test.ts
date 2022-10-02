import { fetchAccessToken } from '../token'
import { uploadAvatar } from './uploadAvatar'
import { Env } from '../env'

describe('upload avatar', () => {
  test('upload url resource avatar', async () => {
    Env.setup({
      apiKey: process.env.apiKey,
      secretKey: process.env.secretKey,
      signKey: process.env.signKey
    })

    const response = await uploadAvatar('https://static.legoit.com/steve-jobs.jpg')

    expect(response.result.filePath).not.toBe('')
  })
})
