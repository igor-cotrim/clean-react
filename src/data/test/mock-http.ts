import { faker } from '@faker-js/faker'

import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement(['post', 'get', 'put', 'delete']),
  body: faker.datatype.json(),
  headers: faker.datatype.json()
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers

    return this.response
  }
}
