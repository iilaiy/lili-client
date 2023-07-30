export interface ILoginParams {
  mail: string
  password: string | number
}

export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>
}
