import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'

import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('#LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should call localStorage with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value: any = faker.helpers.objectValue({
      accessToken: 'teste',
      name: 'teste'
    })

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    )
  })
})
