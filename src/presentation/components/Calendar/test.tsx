import { render, screen } from '@/presentation/utils/test-utils'
import { Calendar } from '@/presentation/components'

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('#Calendar', () => {
  it('should render with correct values', () => {
    makeSut(new Date('2022-06-15T00:00:00'))

    expect(screen.getByTestId('day')).toHaveTextContent('15')
    expect(screen.getByTestId('month')).toHaveTextContent('jun')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })

  it('should render with correct icon and day', () => {
    makeSut(new Date('2021-05-03T00:00:00'))

    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })
})
