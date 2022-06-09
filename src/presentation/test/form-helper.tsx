import { faker } from '@faker-js/faker'

import { fireEvent, RenderResult } from '@/presentation/utils/test-utils'

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError = ''
): void => {
  const wrapper = sut.getByTestId(`${fieldName}-wrapper`)
  const field = sut.getByTestId(fieldName)
  const label = sut.getByTestId(`${fieldName}-label`)

  expect(wrapper.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid'
  )
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const el = sut.getByTestId(fieldName)

  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = sut.getByTestId(fieldName)

  fireEvent.input(input, {
    target: { value }
  })
}

export const testElementExists = (
  sut: RenderResult,
  fieldName: string
): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}
