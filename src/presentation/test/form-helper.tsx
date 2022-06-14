import { faker } from '@faker-js/faker'

import { fireEvent, screen } from '@/presentation/utils/test-utils'

export const testStatusForField = (
  fieldName: string,
  validationError = ''
): void => {
  const wrapper = screen.getByTestId(`${fieldName}-wrapper`)
  const field = screen.getByTestId(fieldName)
  const label = screen.getByTestId(`${fieldName}-label`)

  expect(wrapper.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid'
  )
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const testChildCount = (fieldName: string, count: number): void => {
  const el = screen.getByTestId(fieldName)

  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = screen.getByTestId(fieldName)

  fireEvent.input(input, {
    target: { value }
  })
}

export const testElementExists = (fieldName: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el).toBeTruthy()
}
