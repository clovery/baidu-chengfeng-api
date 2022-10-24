import axios from 'axios'
import { baseUrl } from '../env'
import { getSign } from '../core/sign'
import { fetchAccessToken } from '../token'

type VerifyInput = {
  pageNo: number
  pageSize: number
  userInfo: string
}

export async function verify(input: VerifyInput): Promise<VerifyResponse> {
  const access_token = await fetchAccessToken()
  const url = `${baseUrl}/log/verify/pageable`

  const payload = await getSign(input)
  const response = await axios(url, {
    method: 'GET',
    params: {
      access_token,
      ...input,
      ...payload
    }
  })

  return response.data
}

export interface VerifyResponse {
  success: boolean
  page: Page
  error_code: number
  error_msg: string
}

export interface Page {
  pageNo: number
  pageSize: number
  totalCount: number
  hasMore: boolean
  result: Result[]
}

export interface Result {
  logId: string
  userId: string
  internalNum: any
  name?: string
  cardId: any
  identityType: string
  avatarKey?: string
  avatarPath?: string
  groupName?: string
  snapshotKey: string
  snapshotPath: string
  checkTimeDate: string
  checkType: string
  passStatus: string
  noPassReason?: string
  deviceId: string
  deviceName: string
  deviceType: string
  deviceCategory: string
  temperature: any
  temperatureStatus: any
  maskStatus: any
  healthStatus: any
  routeInfo: any
  customPersonId: any
  customExtends: any
  similarityScore: number
  channelId: any
  channelName: any
  messageId: string
  age: number
  gender: string
  deviceLocation: string
  natInfo: string
  antInfo: string
  vacInfo: string
}
