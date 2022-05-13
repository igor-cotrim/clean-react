import { AccountModel } from 'domain/models/account-model'

type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth({ email, password }: AuthenticationParams): Promise<AccountModel>
}
