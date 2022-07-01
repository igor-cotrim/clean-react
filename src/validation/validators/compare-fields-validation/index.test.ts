import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators'

const makeSut = (
  field: string,
  fieldToCompare: string
): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('#CompareFieldsValidation', () => {
  it('should return error if compare is invalid', () => {
    const field = 'any_value'
    const fieldToCompare = 'other_value'
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value'
    })

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if compare is valid', () => {
    const field = 'any_value'
    const fieldToCompare = 'other_value'
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })

    expect(error).toBeFalsy()
  })
})
