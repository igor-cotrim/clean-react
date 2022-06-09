import { InputHTMLAttributes, useRef } from 'react'

import * as S from './styles'

type InputProps = {
  state: any
  setState: any
  error: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = ({ state, setState, error, ...props }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>()

  return (
    <S.InputWrapper>
      <S.Input
        data-testid={props.name}
        ref={inputRef}
        onChange={(e) => {
          setState({
            ...state,
            [e.target.name]: e.target.value
          })
        }}
        {...props}
        placeholder=" "
      />
      <S.Label
        onClick={() => {
          inputRef.current.focus()
        }}
      >
        {props.placeholder}
      </S.Label>
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
