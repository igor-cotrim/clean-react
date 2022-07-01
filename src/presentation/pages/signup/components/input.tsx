import { useRecoilState } from 'recoil'

import { InputBase } from '@/presentation/components'

import { signUpState } from './atoms'

type InputProps = {
  type: string
  name: string
  placeholder: string
}

const Input = ({ type, name, placeholder }: InputProps) => {
  const [state, setState] = useRecoilState(signUpState)

  return (
    <InputBase
      type={type}
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  )
}

export default Input
