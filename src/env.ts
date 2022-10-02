type IConfig = {
  /**
   * 获取环境变量key
   * 点击 智能应用平台 (右上角，验签密钥) 获取
   */
  signKey: string

  // 访问 https://console.bce.baidu.com/ai/#/ai/face/chengfeng/overview 获取 API Key 和 Secret Key
  apiKey: string

  secretKey: string

  access_token: string
}

const Config: IConfig = {
  signKey: '',

  /**
   * 访问 https://console.bce.baidu.com/ai/#/ai/face/chengfeng/overview 获取 API Key 和 Secret Key
   */
  apiKey: '',
  secretKey: '',

  access_token: ''
}

export const Env = {
  get(k: keyof IConfig) {
    return Config[k]
  },

  set(k: keyof IConfig, value: any) {
    Config[k] = value
  },

  setup(c: Omit<IConfig, 'access_token'>) {
    return Object.assign(Config, c)
  }
}

export const baseUrl = 'https://aip.baidubce.com/rest/2.0/chengfeng/openapi/v1'
