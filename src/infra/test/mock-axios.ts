import { faker } from '@faker-js/faker'
import axios from 'axios'

export const mockHttpResponse = () => ({
  data: faker.datatype.json(),
  status: faker.datatype.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse())

  return mockedAxios
}
