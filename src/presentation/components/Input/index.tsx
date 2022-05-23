import React, { InputHTMLAttributes } from 'react'

import * as S from './styles'

type InputProps = {
  state: any
  setState: any
  error: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = ({ state, setState, error, ...props }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  return (
    <S.InputWrapper>
      <S.Input data-testid={props.name} onChange={handleChange} {...props} />
      <S.InputStatus
        data-testid={`${props.name}-status`}
        title={error ? error : 'Tudo certo!'}
      >
        {error ? '🔴' : '🟢'}
      </S.InputStatus>
    </S.InputWrapper>
  )
}

export default Input
