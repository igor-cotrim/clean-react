import { faker } from '@faker-js/faker'

import { RequiredFieldError } from '@/validation/errors'

import { RequiredFieldValidation } from '.'

describe('#RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate(faker.random.word())

    expect(error).toBeFalsy()
  })
})
