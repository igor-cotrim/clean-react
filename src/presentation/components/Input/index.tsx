import { InputHTMLAttributes } from 'react'

import * as S from './styles'

type InputProps = {
  state: any
} & InputHTMLAttributes<HTMLInputElement>

const Input = ({ state, ...props }: InputProps) => (
  <S.InputWrapper>
    <S.Input {...props} />
    <S.InputStatus data-testid={`${props.name}-status`} title={state}>
      🔴
    </S.InputStatus>
  </S.InputWrapper>
)

export default Input
