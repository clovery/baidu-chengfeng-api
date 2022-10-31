import path from 'path'
import axios from 'axios'
import isBase64 from 'is-base64'
import FormData from 'form-data'

import { getSign } from '../core/sign'
import { baseUrl } from '../env'
import { fetchAccessToken } from '../token'

const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

/**
 * 上传头像
 * @param fileUrl string
 * @param accessToken string
 * @returns
 */
export async function uploadAvatar(fileUrl: string | File, filename: string = 'avatar'): Promise<UploadAvatarResponse> {
  const accessToken = await fetchAccessToken()

  const form = new FormData()
  let file: File | null = null

  if (typeof fileUrl === 'string') {
    if (isBase64(fileUrl)) {
      file = dataURLtoFile(fileUrl, filename)
    } {
      const response = await axios.get(fileUrl, { responseType: 'stream' })
      file = response.data
      filename = path.basename(fileUrl)
    }
  } else if (fileUrl instanceof File) {
    file = fileUrl
  }

  if (file) {
    // 一定要填写文件名字，否则会"验签失败"
    form.append('file', file, filename)
  }

  const signParams = await getSign({ file: '' })

  form.append('nonce', signParams.nonce)
  form.append('businessSign', signParams.businessSign)
  form.append('businessTimestamp', signParams.businessTimestamp)

  const res = await axios(`${baseUrl}/person/file/image/avatar?access_token=${accessToken}`,
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

/**
 * base64 转 file 对象
 * https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
 */
function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime })
}
