import { render } from '@/presentation/utils/test-utils'

import Login from '.'

describe('#Login', () => {
  it('should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />)
    const errorWrapper = getByTestId('error-wrapper')

    expect(errorWrapper.childElementCount).toBe(0)
  })
})
