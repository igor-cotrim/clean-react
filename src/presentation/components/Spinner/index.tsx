import * as S from './styles'

type SpinnerProps = {
  colors?: '#880e4f' | '#fff'
}

const Spinner = ({ colors = '#880e4f' }: SpinnerProps) => (
  <S.Spinner SpinnerColor={colors} data-testid="spinner">
    <div />
    <div />
    <div />
    <div />
  </S.Spinner>
)

export default Spinner
