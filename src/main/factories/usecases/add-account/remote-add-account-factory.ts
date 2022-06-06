import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { AddAccount } from '@/domain/usecases'

export const makeRemoteAddAccount = (): AddAccount =>
  new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
