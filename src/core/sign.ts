import CryptoJS from 'crypto-js'
import { Env } from '../env'

// 获取环境变量key
// 点击 智能应用平台 (右上角，验签密钥) 获取

export const getSign = async (data) => {
  const signKey = Env.get('signKey')

  // 获取时间戳
  var businessTimestamp = new Date().getTime()

  // 获取随机值
  var nonce = generateUUID()

  var businessSign =
    signJsonObject(
      Object.assign(
        {
          nonce: nonce,
          businessTimestamp: businessTimestamp
        },
        data || {}
      ),
      signKey,
      1
    ) + ''

  return {
    nonce,
    businessSign,
    businessTimestamp
  }
}

/**
 *生成32位UUID
 **/
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

function generateUUID() {
  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4()
}

/*
 *  obj: 需要加密的字符串
 *  signKey: 加密后的内层
 *  floor: 层数
 */
function signJsonObject(obj, signKey, floor) {
  var keys = new Array()
  var params = new Map()
  for (var entity in obj) {
    var value = ''
    if (
      obj[entity] === '' ||
      obj[entity] == null ||
      obj[entity] === undefined
    ) {
      continue
    } else if (
      Object.prototype.toString.call(obj[entity]) === '[object Object]'
    ) {
      value = signJsonObject(obj[entity], signKey, floor + 1)
    } else if (Array.isArray(obj[entity])) {
      var result = new Array()
      var jsonArray = obj[entity]
      for (var action in jsonArray) {
        if (
          Object.prototype.toString.call(jsonArray[action]) ===
          '[object Object]'
        ) {
          result.push(signJsonObject(jsonArray[action], signKey, floor + 1))
        } else if (Array.isArray(jsonArray[action])) {
          result.push(signJsonObject(jsonArray[action], signKey, floor + 1))
        } else {
          result.push(jsonArray[action])
        }
      }
      if (result.length > 0) {
        var rs = result.sort().join('&')
        var value = CryptoJS.MD5(rs)
        console.log('加密前字符串：' + rs + '\n加密后MD5：' + value)
      }
    } else {
      value = obj[entity]
    }
    keys.push(entity)
    params.set(entity, value)
  }
  // 将key和value按规则拼接
  var sb = new Array()
  params.forEach(function (value, key) {
    sb.push(key + '=' + value)
  })
  var string = sb.sort().join('&')
  if (floor == 1 && signKey != '') {
    string = string + '&key=' + signKey
  }

  var md5 = CryptoJS.MD5(string)

  return md5
}
