import { ButtonHTMLAttributes } from 'react'
import * as S from './styles'

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>

type SubmitButtonProps = ButtonTypes

const SubmitButton = ({ children, ...props }: SubmitButtonProps) => (
  <S.SubmitButton data-testid="submit" {...props}>
    {children}
  </S.SubmitButton>
)

export default SubmitButton
