import { InputHTMLAttributes } from 'react'

import * as S from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = ({ ...props }: InputProps) => (
  <S.InputWrapper>
    <S.Input {...props} />
    <S.InputStatus>🔴</S.InputStatus>
  </S.InputWrapper>
)

export default Input
