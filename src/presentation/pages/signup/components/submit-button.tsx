import { ButtonHTMLAttributes } from 'react'
import { useRecoilValue } from 'recoil'

import { SubmitButtonBase } from '@/presentation/components'

import { signUpState } from './atoms'

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>

type SubmitButtonProps = ButtonTypes

const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const { isFormInvalid } = useRecoilValue(signUpState)
  return (
    <SubmitButtonBase disabled={isFormInvalid} {...props}>
      {children}
    </SubmitButtonBase>
  )
}

export default SubmitButton
