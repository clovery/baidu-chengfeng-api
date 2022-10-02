import axios from 'axios'
import { baseUrl } from '../env'
import { getSign } from '../core/sign'
import { fetchAccessToken } from '../token'

type NewUserInput = {
  name: string
  personType?: number
} & any

export async function createUser(input: NewUserInput): Promise<CreateUserResponse> {
  const access_token = await fetchAccessToken()
  const url = `${baseUrl}/person/add?access_token=${access_token}`

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

type CreateUserResponse = {
  success: boolean
  result: Result
  error_code: number
  error_msg: string
}

export interface Result {
  id: string
  name: string
  identityCard: any
  weChat: any
  personType: number
  groupList: any
  memberDetail: MemberDetail
  guestDetail: any
  phoneNum: any
  email: any
  backUp: any
  hint: any
  avatar: any
  showAvatar: any
  avatarPath: any
  showAvatarPath: any
  appId: string
  createTime: any
  customPersonId: any
  customExtends: any
  healthStatus: any
}

export interface MemberDetail {
  sex: any
  internalNum: any
  cardId: any
  passWord: any
  age: any
  entryDate: any
  birthDate: any
  company: any
  position: any
}

