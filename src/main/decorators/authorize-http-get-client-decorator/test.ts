import { GetStorageSpy, mockGetRequest } from '@/data/test'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'

describe('#AuthorizeHttpGetClientDecorator', () => {
  it('should call GetStorage with correct value', () => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)

    sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('account')
  })
})
