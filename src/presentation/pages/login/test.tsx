import { render } from '@/presentation/utils/test-utils'

import Login from '.'

describe('#Login', () => {
  it('should start with initial state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrapper = getByTestId('error-wrapper')
    const submitButton = getByTestId('submit') as HTMLButtonElement

    expect(errorWrapper.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
  })
})
