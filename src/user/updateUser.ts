import axios from 'axios'
import { getSign } from '../core/sign'
import { baseUrl } from '../env'
import { fetchAccessToken } from '../token'

type UpdateUserInput = {
  name: string
  personType?: number
} & any

/**
 *
 * https://ai.baidu.com/ai-doc/FACE/vkd717i4g#14-%E4%BF%AE%E6%94%B9%E4%BA%BA%E5%91%98
 * @param id string string
 * @param input UpdateUserInput
 * @returns
 */
export async function updateUser(
  id: string,
  input: UpdateUserInput
): Promise<any> {
  const access_token = await fetchAccessToken()
  const url = `${baseUrl}/person/update?access_token=${access_token}&id=${id}`

	input.idType = input.idType || 1
  input.personType = input.personType || 1

  const payload = await getSign({ id, ...input })
  const response = await axios(url, {
    method: 'POST',
    data: {
      ...input,
      ...payload
    }
  })

  return response.data
}
