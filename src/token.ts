import axios from 'axios'
import { Env } from './env'

/**
 * 获取 access token
 * @returns string
 */
export const fetchAccessToken = async function () {
  const apiKey = Env.get('apiKey')
  const secretKey = Env.get('secretKey')
  const url = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`

  const res = await axios.get(url)

  Env.set('access_token', res.data.access_token)
  return res.data && res.data.access_token
}
