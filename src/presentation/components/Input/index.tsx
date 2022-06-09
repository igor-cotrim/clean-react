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
    <S.InputWrapper
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${props.name}-wrapper`}
    >
      <S.Input
        data-testid={props.name}
        ref={inputRef}
        title={error}
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
        data-testid={`${props.name}-label`}
        onClick={() => {
          inputRef.current.focus()
        }}
        title={error}
      >
        {props.placeholder}
      </S.Label>
    </S.InputWrapper>
  )
}

export default Input
