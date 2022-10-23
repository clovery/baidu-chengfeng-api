import axios from 'axios'
import { baseUrl } from '../env'
import { getSign } from '../core/sign'
import { fetchAccessToken } from '../token'

type VerifyInput = {
  pageNo: number
  pageSize: number
}

export async function verify(input: VerifyInput): Promise<any> {
  const access_token = await fetchAccessToken()
  const url = `${baseUrl}/log/verify/pageable`

  const payload = await getSign(input)
  const response = await axios(url, {
    method: 'GET',
    params: {
      access_token,
      ...payload
    }
  })

  return response.data
}
