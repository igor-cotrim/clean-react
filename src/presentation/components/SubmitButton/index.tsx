import * as S from './styles'

type SubmitButtonProps = {
  text: string
}

const SubmitButton = ({ text }: SubmitButtonProps) => (
  <S.SubmitButton data-testid="submit" type="submit">
    {text}
  </S.SubmitButton>
)

export default SubmitButton
