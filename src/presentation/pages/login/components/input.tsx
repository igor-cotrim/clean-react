import { useRecoilState } from 'recoil'

import { InputBase } from '@/presentation/components'

import { loginState } from './atoms'

type InputProps = {
  type: string
  name: string
  placeholder: string
}

const Input = ({ type, name, placeholder }: InputProps) => {
  const [state, setState] = useRecoilState(loginState)

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
