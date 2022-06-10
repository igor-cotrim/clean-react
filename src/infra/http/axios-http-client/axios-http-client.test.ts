import axios from 'axios'

import { mockPostRequest } from '@/data/test'
import { mockAxios, mockHttpResponse } from '@/infra/test'

import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('#AxiosHttpClient', () => {
  describe('#post', () => {
    it('should call axios.post with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()

      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    it('should return correct response on axios.post', () => {
      const { sut, mockedAxios } = makeSut()
      const promise = sut.post(mockPostRequest())

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })

    it('should return correct error on axios.post', () => {
      const { sut, mockedAxios } = makeSut()
      const promise = sut.post(mockPostRequest())

      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
})
