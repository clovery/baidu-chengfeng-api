import axios, { AxiosRequestConfig } from 'axios'
import isBase64 from 'is-base64'
import FormData from 'form-data'

import { getSign } from '../core/sign'
import { baseUrl } from '../env'
import { fetchAccessToken } from '../token'

/**
 * 上传头像
 * @param fileUrl string
 * @param accessToken string
 * @returns
 */
export async function uploadAvatar(fileUrl: string, filename: string = 'avatar'): Promise<UploadAvatarResponse> {
  if (isBase64(fileUrl, { allowMime: true })) {
    return uploadBase64Avatar(fileUrl)
  } else if (fileUrl.slice(0, 4) === 'http') {
    return uploadUrlAvatar(fileUrl)
  }

  return Promise.reject('只支持 base64 和 url 形式的图片')
}

type UploadAvatarResponse = {
  success: boolean
  result: {
    key: string
    filePath: string
  }
  error_code: number
  error_msg: string
}


async function uploadBase64Avatar(fileUrl: string) {
  const accessToken = await fetchAccessToken()
  const config: AxiosRequestConfig = {
    method: 'POST',
    headers: {}
  }


  const payload = {
    needVerify: true,
    image: fileUrl.includes('data:image') ? fileUrl.split(',')[1] : fileUrl
  }
  const signParams = await getSign({ needVerify: true })
  config.data = {
    ...signParams,
    ...payload
  }
  const res = await axios(`${baseUrl}/person/base64/image/avatar?access_token=${accessToken}`, config)
  return res.data
}

async function uploadUrlAvatar(fileUrl: string, filename: string = 'avatar') {
  const accessToken = await fetchAccessToken()

  const config: AxiosRequestConfig = {
    method: 'POST',
    headers: {}
  }

  const response = await axios.get(fileUrl, { responseType: 'stream' })
  const form = new FormData()
  const file = response.data
  form.append('file', file, filename)
  const signParams = await getSign({ file: '' })

  form.append('nonce', signParams.nonce)
  form.append('businessSign', signParams.businessSign)
  form.append('businessTimestamp', signParams.businessTimestamp)
  config.headers['Content-Type'] = 'multipart/form-data'
  config.data = form

  const res = await axios(`${baseUrl}/person/file/image/avatar?access_token=${accessToken}`, config)
  return res.data
}
