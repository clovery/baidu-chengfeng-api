import fs from 'fs'
import path from 'path'
import mime from 'mime'
import { uploadAvatar } from './uploadAvatar'
import { Env } from '../env'

describe('upload avatar', () => {
  Env.setup({
    apiKey: process.env.apiKey,
    secretKey: process.env.secretKey,
    signKey: process.env.signKey
  })

  test('upload url resource avatar', async () => {
    const response = await uploadAvatar('https://static.legoit.com/steve-jobs.jpg')

    expect(response.result.filePath).not.toBe('')
  })

  test('upload base64 image', async () => {
    const filepath = path.resolve(__dirname, 'steve-jobs.jpg')
    const data = fs.readFileSync(filepath, {encoding: 'base64'});
    const filemime = mime.getType(filepath);
    const mimeContent = `data:${filemime};base64,${data}`
    const response = await uploadAvatar(mimeContent)
    expect(response.result.filePath).not.toBe('')
  })
})
