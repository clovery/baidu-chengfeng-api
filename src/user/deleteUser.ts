import axios from 'axios'
import { getSign } from '../core/sign'
import { baseUrl } from '../env'
import { fetchAccessToken } from '../token'

type DeleteUserInput = {
  idList?: string[]
  personType: number
  idType: number
}

type DeleteUserResponse = {
  success: boolean

  result: {
    successIdList: string[]
    failIdList: string[]
  }

  error_code: number

  error_msg: string
}

const defaultDeleteUserInput: DeleteUserInput = {
  idList: [],
  idType: 1,
  personType: 1
}
/**
 *
 * @param id string string
 * @param input UpdateUserInput
 * @returns
 */
export const deleteUser = async (
  id: string | string[],
  input = defaultDeleteUserInput
): Promise<DeleteUserResponse> => {
  const access_token = await fetchAccessToken()
  const url = `${baseUrl}/person/delete?access_token=${access_token}`

  const idList: string[] = []

  if (typeof id === 'string') {
    idList.push(id)
  }

  input.idList = idList
  input.idType = input.idType || 1
  input.personType = input.personType || 1

  const payload = await getSign(input)
  const response = await axios(url, {
    method: 'POST',
    data: {
      ...input,
      ...payload
    }
  })

  return response.data
}
