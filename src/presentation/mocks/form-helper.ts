import { faker } from '@faker-js/faker'

import { fireEvent, screen } from '@/presentation/utils/test-utils'

export const testStatusForField = (
  fieldName: string,
  validationError = ''
): void => {
  const wrapper = screen.getByTestId(`${fieldName}-wrapper`)
  const field = screen.getByTestId(fieldName)
  const label = screen.getByTestId(`${fieldName}-label`)

  expect(wrapper).toHaveAttribute(
    'data-status',
    validationError ? 'invalid' : 'valid'
  )
  expect(field).toHaveProperty('title', validationError)
  expect(label).toHaveProperty('title', validationError)
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
