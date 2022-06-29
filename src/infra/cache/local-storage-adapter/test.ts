import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'

import { LocalStorageAdapter } from '@/infra/cache'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('#LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should call localStorage.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value: any = faker.datatype.json()

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    )
  })

  it('should call localStorage.removeItem with value is null', () => {
    const sut = makeSut()
    const key = faker.database.column()

    sut.set(key, undefined)

    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })

  it('should call localStorage.getItem with correct value', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value: any = faker.datatype.json()

    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)

    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
