import path from 'path'
import axios from 'axios'
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
export async function uploadAvatar(fileUrl: string): Promise<UploadAvatarResponse> {
  const accessToken = await fetchAccessToken()

  const form = new FormData()
  const response = await axios.get(fileUrl, { responseType: 'stream' })
  const file = response.data
  const filename = path.basename(fileUrl)
  // 一定要填写文件名字，否则会"验签失败"
  form.append('file', file, filename)

  const signParams = await getSign({ file: '' })

  form.append('nonce', signParams.nonce)
  form.append('businessSign', signParams.businessSign)
  form.append('businessTimestamp', signParams.businessTimestamp)

  const res = await axios(
    `${baseUrl}/person/file/image/avatar?access_token=${accessToken}`,
    {
      method: 'POST',
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  return res.data
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
