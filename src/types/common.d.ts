import { QueryForm } from '@/interface'

export {} // 必须保留
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $utils: any
    $t: any
  }
}

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}
